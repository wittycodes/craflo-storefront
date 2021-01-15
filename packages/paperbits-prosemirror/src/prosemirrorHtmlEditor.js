"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProseMirrorHtmlEditor = void 0;
var editing_1 = require("@paperbits/common/editing");
var prosemirror_model_1 = require("prosemirror-model");
var prosemirror_state_1 = require("prosemirror-state");
var prosemirror_view_1 = require("prosemirror-view");
var prosemirror_commands_1 = require("prosemirror-commands");
var prosemirror_schema_list_1 = require("prosemirror-schema-list");
var prosemirror_history_1 = require("prosemirror-history");
var prosemirror_keymap_1 = require("prosemirror-keymap");
var lists_1 = require("./lists");
var keymap_1 = require("./keymap");
var schema_1 = require("./schema");
var builder = new schema_1.SchemaBuilder();
var schema = builder.build();
var ProseMirrorHtmlEditor = (function () {
    function ProseMirrorHtmlEditor(eventManager, styleCompiler) {
        this.eventManager = eventManager;
        this.styleCompiler = styleCompiler;
    }
    ProseMirrorHtmlEditor.prototype.getState = function () {
        var content;
        if (this.editorView) {
            content = this.editorView.state.toJSON()["doc"]["content"];
        }
        else {
            content = this.content.content;
        }
        return this.proseMirrorModelToModel(content);
    };
    ProseMirrorHtmlEditor.prototype.setState = function (content) {
        try {
            var prosemirrorContent = this.modelToProseMirrorModel(content);
            this.content = {
                type: "doc",
                content: prosemirrorContent
            };
            var node = schema.nodeFromJSON(this.content);
            var fragment = prosemirror_model_1.DOMSerializer
                .fromSchema(schema)
                .serializeFragment(node);
            this.element.appendChild(fragment);
        }
        catch (error) {
            console.error(error.stack);
        }
    };
    ProseMirrorHtmlEditor.prototype.modelToProseMirrorModel = function (source) {
        var result = JSON.stringify(source);
        result = result
            .replaceAll("ordered-list", "ordered_list")
            .replaceAll("bulleted-list", "bulleted_list")
            .replaceAll("list-item", "list_item")
            .replaceAll("\"nodes\":", "\"content\":");
        return JSON.parse(result);
    };
    ProseMirrorHtmlEditor.prototype.proseMirrorModelToModel = function (source) {
        var result = JSON.stringify(source);
        result = result
            .replaceAll("ordered_list", "ordered-list")
            .replaceAll("bulleted_list", "bulleted-list")
            .replaceAll("list_item", "list-item")
            .replaceAll("\"content\":", "\"nodes\":");
        return JSON.parse(result);
    };
    ProseMirrorHtmlEditor.prototype.getSelectionState = function () {
        var state = this.editorView.state;
        var from = state.selection.from;
        var to = state.selection.to;
        if (from === to) {
            from -= 1;
        }
        var selectionState = new editing_1.SelectionState();
        var cursor = state.selection.$cursor || state.selection.$from;
        if (cursor) {
            var path = cursor.path.filter(function (x) { return x.type; });
            var currentBlock = path[path.length - 1];
            var blockType = currentBlock.type;
            var typeName = blockType.name;
            selectionState.block = blockType.name;
            selectionState.orderedList = typeName.includes("ordered_list");
            selectionState.bulletedList = typeName.includes("bulleted_list");
            selectionState.italic = state.doc.rangeHasMark(from, to, schema.marks.italic);
            selectionState.bold = state.doc.rangeHasMark(from, to, schema.marks.bold);
            selectionState.underlined = state.doc.rangeHasMark(from, to, schema.marks.underlined);
            selectionState.highlighted = state.doc.rangeHasMark(from, to, schema.marks.highlighted);
            selectionState.striked = state.doc.rangeHasMark(from, to, schema.marks.striked);
            selectionState.code = state.doc.rangeHasMark(from, to, schema.marks.code);
            selectionState.colorKey = this.getColor();
            if (currentBlock.attrs && currentBlock.attrs.styles) {
                if (currentBlock.attrs.styles.alignment) {
                    selectionState.alignment = currentBlock.attrs.styles.alignment;
                }
                if (currentBlock.attrs.styles.appearance) {
                    selectionState.appearance = currentBlock.attrs.styles.appearance;
                }
            }
        }
        return selectionState;
    };
    ProseMirrorHtmlEditor.prototype.clearFormatting = function () {
        throw new Error("Not implemented");
    };
    ProseMirrorHtmlEditor.prototype.insertText = function (text) {
        throw new Error("Not implemented");
    };
    ProseMirrorHtmlEditor.prototype.toggleBold = function () {
        prosemirror_commands_1.toggleMark(schema.marks.bold)(this.editorView.state, this.editorView.dispatch);
        this.editorView.focus();
    };
    ProseMirrorHtmlEditor.prototype.toggleItalic = function () {
        prosemirror_commands_1.toggleMark(schema.marks.italic)(this.editorView.state, this.editorView.dispatch);
        this.editorView.focus();
    };
    ProseMirrorHtmlEditor.prototype.toggleUnderlined = function () {
        prosemirror_commands_1.toggleMark(schema.marks.underlined)(this.editorView.state, this.editorView.dispatch);
        this.editorView.focus();
    };
    ProseMirrorHtmlEditor.prototype.toggleHighlighted = function () {
        prosemirror_commands_1.toggleMark(schema.marks.highlighted)(this.editorView.state, this.editorView.dispatch);
        this.editorView.focus();
    };
    ProseMirrorHtmlEditor.prototype.toggleStriked = function () {
        prosemirror_commands_1.toggleMark(schema.marks.striked)(this.editorView.state, this.editorView.dispatch);
        this.editorView.focus();
    };
    ProseMirrorHtmlEditor.prototype.toggleCode = function () {
        prosemirror_commands_1.toggleMark(schema.marks.code)(this.editorView.state, this.editorView.dispatch);
        this.editorView.focus();
    };
    ProseMirrorHtmlEditor.prototype.toggleOrderedList = function () {
        lists_1.wrapInList(schema.nodes.ordered_list)(this.editorView.state, this.editorView.dispatch);
        this.editorView.focus();
    };
    ProseMirrorHtmlEditor.prototype.toggleUnorderedList = function (styleKey) {
        if (styleKey === void 0) { styleKey = "globals/ul/default"; }
        return __awaiter(this, void 0, void 0, function () {
            var attrs, className;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        attrs = {};
                        if (!styleKey) return [3, 2];
                        return [4, this.styleCompiler.getClassNameByStyleKeyAsync(styleKey)];
                    case 1:
                        className = _a.sent();
                        if (className) {
                            attrs = { className: className, styles: { appearance: styleKey } };
                        }
                        _a.label = 2;
                    case 2:
                        lists_1.wrapInList(schema.nodes.bulleted_list, attrs)(this.editorView.state, this.editorView.dispatch);
                        this.editorView.focus();
                        return [2];
                }
            });
        });
    };
    ProseMirrorHtmlEditor.prototype.toggleParagraph = function () {
        this.setBlockTypeAndNotify(schema.nodes.paragraph);
    };
    ProseMirrorHtmlEditor.prototype.toggleH1 = function () {
        this.setBlockTypeAndNotify(schema.nodes.heading1);
    };
    ProseMirrorHtmlEditor.prototype.toggleH2 = function () {
        this.setBlockTypeAndNotify(schema.nodes.heading2);
    };
    ProseMirrorHtmlEditor.prototype.toggleH3 = function () {
        this.setBlockTypeAndNotify(schema.nodes.heading3);
    };
    ProseMirrorHtmlEditor.prototype.toggleH4 = function () {
        this.setBlockTypeAndNotify(schema.nodes.heading4);
    };
    ProseMirrorHtmlEditor.prototype.toggleH5 = function () {
        this.setBlockTypeAndNotify(schema.nodes.heading5);
    };
    ProseMirrorHtmlEditor.prototype.toggleH6 = function () {
        this.setBlockTypeAndNotify(schema.nodes.heading6);
    };
    ProseMirrorHtmlEditor.prototype.toggleQuote = function () {
        this.setBlockTypeAndNotify(schema.nodes.quote);
    };
    ProseMirrorHtmlEditor.prototype.toggleFormatted = function () {
        this.setBlockTypeAndNotify(schema.nodes.formatted);
    };
    ProseMirrorHtmlEditor.prototype.toggleSize = function () {
    };
    ProseMirrorHtmlEditor.prototype.updateMark = function (markType, markAttrs) {
        if (!markAttrs) {
            return;
        }
        var state = this.editorView.state;
        var tr = state.tr;
        var doc = tr.doc;
        var markLocation = (!state.selection.empty && state.selection) ||
            (state.selection.$cursor && this.getMarkLocation(doc, state.selection.$cursor.pos, markType));
        if (!markLocation) {
            return;
        }
        if (state.selection.empty) {
            if (doc.rangeHasMark(markLocation.from, markLocation.to, markType)) {
                tr.removeMark(markLocation.from, markLocation.to, markType);
            }
            else {
                return;
            }
        }
        var markItem = markType.create(markAttrs);
        this.editorView.dispatch(tr.addMark(markLocation.from, markLocation.to, markItem));
    };
    ProseMirrorHtmlEditor.prototype.removeMark = function (markType) {
        var state = this.editorView.state;
        var markLocation = (!state.selection.empty && state.selection) || this.getMarkLocation(state.tr.doc, state.selection.$cursor.pos, markType);
        if (!markLocation) {
            return;
        }
        this.editorView.dispatch(state.tr.removeMark(markLocation.from, markLocation.to, markType));
    };
    ProseMirrorHtmlEditor.prototype.setColor = function (colorKey) {
        var className = this.styleCompiler.getClassNameByColorKey(colorKey);
        this.updateMark(schema.marks.color, { colorKey: colorKey, colorClass: className });
    };
    ProseMirrorHtmlEditor.prototype.getColor = function () {
        var mark = this.editorView.state.selection.$from.marks().find(function (x) { return x.type.name === "color"; });
        if (!mark) {
            return null;
        }
        return mark.attrs.colorKey;
    };
    ProseMirrorHtmlEditor.prototype.removeColor = function () {
        this.removeMark(schema.marks.color);
    };
    ProseMirrorHtmlEditor.prototype.removeHyperlink = function () {
        this.removeMark(schema.marks.hyperlink);
    };
    ProseMirrorHtmlEditor.prototype.setHyperlink = function (hyperlink) {
        if (!hyperlink.href && !hyperlink.targetKey) {
            return;
        }
        this.updateMark(schema.marks.hyperlink, hyperlink);
    };
    ProseMirrorHtmlEditor.prototype.getMarkLocation = function (doc, pos, markType) {
        var $pos = doc.resolve(pos);
        var start = $pos.parent.childAfter($pos.parentOffset);
        if (!start.node) {
            return null;
        }
        var mark = start.node.marks.find(function (mark) { return mark.type === markType; });
        if (!mark) {
            return null;
        }
        var startIndex = $pos.index();
        var startPos = $pos.start() + start.offset;
        while (startIndex > 0 && mark.isInSet($pos.parent.child(startIndex - 1).marks)) {
            startIndex -= 1;
            startPos -= $pos.parent.child(startIndex).nodeSize;
        }
        var endIndex = $pos.indexAfter();
        var endPos = startPos + start.node.nodeSize;
        while (endIndex < $pos.parent.childCount && mark.isInSet($pos.parent.child(endIndex).marks)) {
            endPos += $pos.parent.child(endIndex).nodeSize;
            endIndex += 1;
        }
        return { from: startPos, to: endPos };
    };
    ProseMirrorHtmlEditor.prototype.getHyperlink = function () {
        var doc = this.editorView.state.tr.doc;
        if (this.editorView.state.selection.$cursor) {
            var $pos = doc.resolve(this.editorView.state.selection.$cursor.pos);
            var start = $pos.parent.childAfter($pos.parentOffset);
            if (!start.node) {
                return null;
            }
            var mark = start.node.marks.find(function (mark) { return mark.type === schema.marks.hyperlink; });
            return mark ? mark.attrs : null;
        }
        else {
            var $pos = doc.resolve(this.editorView.state.selection.$from.pos);
            var start = $pos.parent.childAfter($pos.parentOffset);
            if (!start.node) {
                return null;
            }
            var mark = start.node.marks.find(function (mark) { return mark.type === schema.marks.hyperlink; });
            return mark ? mark.attrs : null;
        }
    };
    ProseMirrorHtmlEditor.prototype.setAnchor = function (hash, anchorKey) {
    };
    ProseMirrorHtmlEditor.prototype.removeAnchor = function () {
    };
    ProseMirrorHtmlEditor.prototype.getSelectionText = function () {
        throw new Error("Not implemented");
    };
    ProseMirrorHtmlEditor.prototype.resetToNormal = function () {
    };
    ProseMirrorHtmlEditor.prototype.increaseIndent = function () {
        prosemirror_schema_list_1.sinkListItem(schema.nodes.list_item);
    };
    ProseMirrorHtmlEditor.prototype.decreaseIndent = function () {
        prosemirror_schema_list_1.liftListItem(schema.nodes.list_item);
    };
    ProseMirrorHtmlEditor.prototype.expandSelection = function (to) {
        throw new Error("Not implemented");
    };
    ProseMirrorHtmlEditor.prototype.setTextStyle = function (textStyleKey, viewport) {
        this.updateTextStyle(textStyleKey, viewport);
    };
    ProseMirrorHtmlEditor.prototype.updateTextStyle = function (textStyleKey, viewport) {
        if (viewport === void 0) { viewport = "xs"; }
        return __awaiter(this, void 0, void 0, function () {
            var cursor, path, currentBlock, blockType, blockStyle, className;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cursor = this.editorView.state.selection.$cursor || this.editorView.state.selection.$from;
                        if (!cursor) {
                            return [2];
                        }
                        path = cursor.path.filter(function (x) { return x.type; });
                        currentBlock = path[path.length - 1];
                        blockType = currentBlock.type;
                        blockStyle = currentBlock.attrs.styles || {};
                        blockStyle.appearance = blockStyle.appearance || {};
                        if (textStyleKey) {
                            blockStyle.appearance = textStyleKey;
                        }
                        else {
                            if (blockStyle.appearance) {
                                delete blockStyle.appearance;
                            }
                        }
                        prosemirror_commands_1.setBlockType(schema.nodes.paragraph)(this.editorView.state, this.editorView.dispatch);
                        if (!(Object.keys(blockStyle).length > 0)) return [3, 2];
                        return [4, this.styleCompiler.getClassNamesForLocalStylesAsync(blockStyle)];
                    case 1:
                        className = _a.sent();
                        prosemirror_commands_1.setBlockType(blockType, { styles: blockStyle, className: className })(this.editorView.state, this.editorView.dispatch);
                        return [3, 3];
                    case 2:
                        prosemirror_commands_1.setBlockType(blockType)(this.editorView.state, this.editorView.dispatch);
                        _a.label = 3;
                    case 3:
                        this.editorView.focus();
                        this.eventManager.dispatchEvent("onSelectionChange", this);
                        return [2];
                }
            });
        });
    };
    ProseMirrorHtmlEditor.prototype.setAlignment = function (styleKey, viewport) {
        if (viewport === void 0) { viewport = "xs"; }
        return __awaiter(this, void 0, void 0, function () {
            var cursor, path, currentBlock, blockType, blockStyle, className;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        cursor = this.editorView.state.selection.$cursor || this.editorView.state.selection.$from;
                        if (!cursor) {
                            return [2];
                        }
                        path = cursor.path.filter(function (x) { return x.type; });
                        currentBlock = path[path.length - 1];
                        blockType = currentBlock.type;
                        blockStyle = currentBlock.attrs.styles || {};
                        blockStyle.alignment = blockStyle.alignment || {};
                        Object.assign(blockStyle.alignment, (_a = {}, _a[viewport] = styleKey, _a));
                        return [4, this.styleCompiler.getClassNamesForLocalStylesAsync(blockStyle)];
                    case 1:
                        className = _b.sent();
                        prosemirror_commands_1.setBlockType(schema.nodes.paragraph)(this.editorView.state, this.editorView.dispatch);
                        prosemirror_commands_1.setBlockType(blockType, { styles: blockStyle, className: className })(this.editorView.state, this.editorView.dispatch);
                        this.editorView.focus();
                        this.eventManager.dispatchEvent("onSelectionChange", this);
                        return [2];
                }
            });
        });
    };
    ProseMirrorHtmlEditor.prototype.alignLeft = function (viewport) {
        if (viewport === void 0) { viewport = "xs"; }
        this.setAlignment(editing_1.alignmentStyleKeys.left, viewport);
    };
    ProseMirrorHtmlEditor.prototype.alignCenter = function (viewport) {
        if (viewport === void 0) { viewport = "xs"; }
        this.setAlignment(editing_1.alignmentStyleKeys.center, viewport);
    };
    ProseMirrorHtmlEditor.prototype.alignRight = function (viewport) {
        if (viewport === void 0) { viewport = "xs"; }
        this.setAlignment(editing_1.alignmentStyleKeys.right, viewport);
    };
    ProseMirrorHtmlEditor.prototype.justify = function (viewport) {
        if (viewport === void 0) { viewport = "xs"; }
        this.setAlignment(editing_1.alignmentStyleKeys.justify, viewport);
    };
    ProseMirrorHtmlEditor.prototype.setCaretAtEndOf = function (node) {
    };
    ProseMirrorHtmlEditor.prototype.setCaretAt = function (clientX, clientY) {
    };
    ProseMirrorHtmlEditor.prototype.setBlockTypeAndNotify = function (blockType, attrs) {
        prosemirror_commands_1.setBlockType(blockType, attrs)(this.editorView.state, this.editorView.dispatch);
        this.eventManager.dispatchEvent("onSelectionChange", this);
    };
    ProseMirrorHtmlEditor.prototype.handleUpdates = function (view, prevState) {
        this.eventManager.dispatchEvent("htmlEditorChanged", this);
        var state = view.state;
        if (this.onStateChange && prevState && !prevState.doc.eq(state.doc)) {
            var newState = this.getState();
            this.onStateChange(newState);
        }
        if (prevState && !prevState.selection.eq(state.selection)) {
            this.eventManager.dispatchEvent("onSelectionChange", this);
        }
    };
    ProseMirrorHtmlEditor.prototype.enable = function () {
        if (this.editorView) {
            this.editorView.dom.contentEditable = true;
            this.eventManager.dispatchEvent(editing_1.HtmlEditorEvents.onSelectionChange);
            return;
        }
        var doc = schema.nodeFromJSON(this.content);
        var handleUpdates = this.handleUpdates.bind(this);
        var detectChangesPlugin = new prosemirror_state_1.Plugin({
            view: function (view) {
                return {
                    update: handleUpdates
                };
            }
        });
        var plugins = [detectChangesPlugin];
        this.editorView = new prosemirror_view_1.EditorView({ mount: this.element }, {
            state: prosemirror_state_1.EditorState.create({
                doc: doc,
                plugins: plugins.concat([
                    prosemirror_keymap_1.keymap(keymap_1.buildKeymap(schema, null)),
                    prosemirror_keymap_1.keymap(prosemirror_commands_1.baseKeymap),
                    prosemirror_history_1.history()
                ])
            })
        });
        this.eventManager.dispatchEvent("htmlEditorChanged", this);
        this.eventManager.dispatchEvent(editing_1.HtmlEditorEvents.onSelectionChange);
    };
    ProseMirrorHtmlEditor.prototype.disable = function () {
        if (!this.editorView) {
            return;
        }
        this.editorView.dom.contentEditable = false;
    };
    ProseMirrorHtmlEditor.prototype.attachToElement = function (element) {
        this.element = element;
    };
    ProseMirrorHtmlEditor.prototype.detachFromElement = function () {
        this.disable();
    };
    return ProseMirrorHtmlEditor;
}());
exports.ProseMirrorHtmlEditor = ProseMirrorHtmlEditor;
