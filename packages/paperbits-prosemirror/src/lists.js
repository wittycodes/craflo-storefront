"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sinkListItem = exports.liftListItem = exports.splitListItem = exports.wrapInList = void 0;
var prosemirror_transform_1 = require("prosemirror-transform");
var prosemirror_model_1 = require("prosemirror-model");
function wrapInList(listType, attrs) {
    return function (state, dispatch) {
        var _a = state.selection, $from = _a.$from, $to = _a.$to;
        var range = $from.blockRange($to), doJoin = false, outerRange = range;
        if (!range) {
            return false;
        }
        if (range.depth >= 2 && $from.node(range.depth - 1).type.compatibleContent(listType) && range.startIndex === 0) {
            if ($from.index(range.depth - 1) === 0) {
                return false;
            }
            var $insert = state.doc.resolve(range.start - 2);
            outerRange = new prosemirror_model_1.NodeRange($insert, $insert, range.depth);
            if (range.endIndex < range.parent.childCount) {
                range = new prosemirror_model_1.NodeRange($from, state.doc.resolve($to.end(range.depth)), range.depth);
            }
            doJoin = true;
        }
        var wrap = prosemirror_transform_1.findWrapping(outerRange, listType, attrs, range);
        if (!wrap) {
            return false;
        }
        if (dispatch) {
            dispatch(doWrapInList(state.tr, range, wrap, doJoin, listType).scrollIntoView());
        }
        return true;
    };
}
exports.wrapInList = wrapInList;
function doWrapInList(tr, range, wrappers, joinBefore, listType) {
    var content = prosemirror_model_1.Fragment.empty;
    for (var i = wrappers.length - 1; i >= 0; i--) {
        content = prosemirror_model_1.Fragment.from(wrappers[i].type.create(wrappers[i].attrs, content));
    }
    tr.step(new prosemirror_transform_1.ReplaceAroundStep(range.start - (joinBefore ? 2 : 0), range.end, range.start, range.end, new prosemirror_model_1.Slice(content, 0, 0), wrappers.length, true));
    var found = 0;
    for (var i = 0; i < wrappers.length; i++) {
        if (wrappers[i].type === listType) {
            found = i + 1;
        }
    }
    var splitDepth = wrappers.length - found;
    var splitPos = range.start + wrappers.length - (joinBefore ? 2 : 0), parent = range.parent;
    for (var i = range.startIndex, e = range.endIndex, first = true; i < e; i++, first = false) {
        if (!first && prosemirror_transform_1.canSplit(tr.doc, splitPos, splitDepth)) {
            tr.split(splitPos, splitDepth);
            splitPos += 2 * splitDepth;
        }
        splitPos += parent.child(i).nodeSize;
    }
    return tr;
}
function splitListItem(itemType) {
    return function (state, dispatch) {
        var _a = state.selection, $from = _a.$from, $to = _a.$to, node = _a.node;
        if ((node && node.isBlock) || $from.depth < 2 || !$from.sameParent($to)) {
            return false;
        }
        var grandParent = $from.node(-1);
        if (grandParent.type !== itemType) {
            return false;
        }
        if ($from.parent.content.size === 0) {
            if ($from.depth === 2 || $from.node(-3).type !== itemType ||
                $from.index(-2) !== $from.node(-2).childCount - 1) {
                return false;
            }
            if (dispatch) {
                var wrap = prosemirror_model_1.Fragment.empty, keepItem = $from.index(-1) > 0;
                for (var d = $from.depth - (keepItem ? 1 : 2); d >= $from.depth - 3; d--) {
                    wrap = prosemirror_model_1.Fragment.from($from.node(d).copy(wrap));
                }
                wrap = wrap.append(prosemirror_model_1.Fragment.from(itemType.createAndFill()));
                var tr_1 = state.tr.replace($from.before(keepItem ? null : -1), $from.after(-3), new prosemirror_model_1.Slice(wrap, keepItem ? 3 : 2, 2));
                tr_1.setSelection(state.selection.constructor.near(tr_1.doc.resolve($from.pos + (keepItem ? 3 : 2))));
                dispatch(tr_1.scrollIntoView());
            }
            return true;
        }
        var nextType = $to.pos === $from.end() ? grandParent.contentMatchAt($from.indexAfter(-1)).defaultType : null;
        var tr = state.tr.delete($from.pos, $to.pos);
        var types = nextType && [null, { type: nextType }];
        if (!prosemirror_transform_1.canSplit(tr.doc, $from.pos, 2, types)) {
            return false;
        }
        if (dispatch) {
            dispatch(tr.split($from.pos, 2, types).scrollIntoView());
        }
        return true;
    };
}
exports.splitListItem = splitListItem;
function liftListItem(itemType) {
    return function (state, dispatch) {
        var _a = state.selection, $from = _a.$from, $to = _a.$to;
        var range = $from.blockRange($to, function (node) { return node.childCount && node.firstChild.type === itemType; });
        if (!range) {
            return false;
        }
        if (!dispatch) {
            return true;
        }
        if ($from.node(range.depth - 1).type === itemType) {
            return liftToOuterList(state, dispatch, itemType, range);
        }
        else {
            return liftOutOfList(state, dispatch, range);
        }
    };
}
exports.liftListItem = liftListItem;
function liftToOuterList(state, dispatch, itemType, range) {
    var tr = state.tr, end = range.end, endOfList = range.$to.end(range.depth);
    if (end < endOfList) {
        tr.step(new prosemirror_transform_1.ReplaceAroundStep(end - 1, endOfList, end, endOfList, new prosemirror_model_1.Slice(prosemirror_model_1.Fragment.from(itemType.create(null, range.parent.copy())), 1, 0), 1, true));
        range = new prosemirror_model_1.NodeRange(tr.doc.resolve(range.$from.pos), tr.doc.resolve(endOfList), range.depth);
    }
    dispatch(tr.lift(range, prosemirror_transform_1.liftTarget(range)).scrollIntoView());
    return true;
}
function liftOutOfList(state, dispatch, range) {
    var tr = state.tr, list = range.parent;
    for (var pos = range.end, i = range.endIndex - 1, e = range.startIndex; i > e; i--) {
        pos -= list.child(i).nodeSize;
        tr.delete(pos - 1, pos + 1);
    }
    var $start = tr.doc.resolve(range.start), item = $start.nodeAfter;
    var atStart = range.startIndex === 0, atEnd = range.endIndex === list.childCount;
    var parent = $start.node(-1), indexBefore = $start.index(-1);
    if (!parent.canReplace(indexBefore + (atStart ? 0 : 1), indexBefore + 1, item.content.append(atEnd ? prosemirror_model_1.Fragment.empty : prosemirror_model_1.Fragment.from(list)))) {
        return false;
    }
    var start = $start.pos, end = start + item.nodeSize;
    tr.step(new prosemirror_transform_1.ReplaceAroundStep(start - (atStart ? 1 : 0), end + (atEnd ? 1 : 0), start + 1, end - 1, new prosemirror_model_1.Slice((atStart ? prosemirror_model_1.Fragment.empty : prosemirror_model_1.Fragment.from(list.copy(prosemirror_model_1.Fragment.empty)))
        .append(atEnd ? prosemirror_model_1.Fragment.empty : prosemirror_model_1.Fragment.from(list.copy(prosemirror_model_1.Fragment.empty))), atStart ? 0 : 1, atEnd ? 0 : 1), atStart ? 0 : 1));
    dispatch(tr.scrollIntoView());
    return true;
}
function sinkListItem(itemType) {
    return function (state, dispatch) {
        var _a = state.selection, $from = _a.$from, $to = _a.$to;
        var range = $from.blockRange($to, function (node) { return node.childCount && node.firstChild.type === itemType; });
        if (!range) {
            return false;
        }
        var startIndex = range.startIndex;
        if (startIndex === 0) {
            return false;
        }
        var parent = range.parent, nodeBefore = parent.child(startIndex - 1);
        if (nodeBefore.type !== itemType) {
            return false;
        }
        if (dispatch) {
            var nestedBefore = nodeBefore.lastChild && nodeBefore.lastChild.type === parent.type;
            var inner = prosemirror_model_1.Fragment.from(nestedBefore ? itemType.create() : null);
            var slice = new prosemirror_model_1.Slice(prosemirror_model_1.Fragment.from(itemType.create(null, prosemirror_model_1.Fragment.from(parent.copy(inner)))), nestedBefore ? 3 : 1, 0);
            var before_1 = range.start, after_1 = range.end;
            dispatch(state.tr.step(new prosemirror_transform_1.ReplaceAroundStep(before_1 - (nestedBefore ? 3 : 1), after_1, before_1, after_1, slice, 1, true))
                .scrollIntoView());
        }
        return true;
    };
}
exports.sinkListItem = sinkListItem;
