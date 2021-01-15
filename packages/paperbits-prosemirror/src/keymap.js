"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildKeymap = void 0;
var prosemirror_commands_1 = require("prosemirror-commands");
var prosemirror_schema_list_1 = require("prosemirror-schema-list");
var prosemirror_history_1 = require("prosemirror-history");
var prosemirror_inputrules_1 = require("prosemirror-inputrules");
var mac = typeof navigator !== "undefined" ? /Mac/.test(navigator.platform) : false;
function buildKeymap(schema, mapKeys) {
    var keys = {}, type;
    function bind(key, cmd) {
        if (mapKeys) {
            var mapped = mapKeys[key];
            if (mapped === false) {
                return;
            }
            if (mapped) {
                key = mapped;
            }
        }
        keys[key] = cmd;
    }
    bind("Mod-z", prosemirror_history_1.undo);
    bind("Shift-Mod-z", prosemirror_history_1.redo);
    bind("Backspace", prosemirror_inputrules_1.undoInputRule);
    if (!mac) {
        bind("Mod-y", prosemirror_history_1.redo);
    }
    bind("Alt-ArrowUp", prosemirror_commands_1.joinUp);
    bind("Alt-ArrowDown", prosemirror_commands_1.joinDown);
    bind("Mod-BracketLeft", prosemirror_commands_1.lift);
    bind("Escape", prosemirror_commands_1.selectParentNode);
    if (type = schema.marks.bold) {
        bind("Mod-b", prosemirror_commands_1.toggleMark(type));
    }
    if (type = schema.marks.italic) {
        bind("Mod-i", prosemirror_commands_1.toggleMark(type));
    }
    if (type = schema.marks.code) {
        bind("Mod-`", prosemirror_commands_1.toggleMark(type));
    }
    if (type = schema.nodes.bullet_list) {
        bind("Shift-Ctrl-8", prosemirror_schema_list_1.wrapInList(type));
    }
    if (type = schema.nodes.ordered_list) {
        bind("Shift-Ctrl-9", prosemirror_schema_list_1.wrapInList(type));
    }
    if (type = schema.nodes.blockquote) {
        bind("Ctrl->", prosemirror_commands_1.wrapIn(type));
    }
    if (type = schema.nodes.break) {
        var br_1 = type, cmd = prosemirror_commands_1.chainCommands(prosemirror_commands_1.exitCode, function (state, dispatch) {
            var $cursor = state.selection.$cursor;
            if (!$cursor) {
                return;
            }
            if ($cursor.nodeBefore && $cursor.nodeBefore.type.name === "break") {
                dispatch(state.tr.delete($cursor.pos - 1, $cursor.pos)
                    .replaceSelectionWith(schema.nodes.paragraph.create()).scrollIntoView());
            }
            else {
                dispatch(state.tr.replaceSelectionWith(br_1.create()).scrollIntoView());
            }
            return true;
        });
        bind("Mod-Enter", cmd);
        bind("Shift-Enter", cmd);
        bind("Ctrl-Enter", cmd);
    }
    if (type = schema.nodes.list_item) {
        bind("Enter", prosemirror_schema_list_1.splitListItem(type));
        bind("Mod-[", prosemirror_schema_list_1.liftListItem(type));
        bind("Mod-]", prosemirror_schema_list_1.sinkListItem(type));
    }
    if (type = schema.nodes.paragraph) {
        bind("Shift-Ctrl-0", prosemirror_commands_1.setBlockType(type));
    }
    if (type = schema.nodes.code_block) {
        bind("Shift-Ctrl-\\", prosemirror_commands_1.setBlockType(type));
    }
    if (type = schema.nodes.heading) {
        for (var i = 1; i <= 6; i++) {
            bind("Shift-Ctrl-" + i, prosemirror_commands_1.setBlockType(type, { level: i }));
        }
    }
    if (type = schema.nodes.horizontal_rule) {
        var hr_1 = type;
        bind("Mod-_", function (state, dispatch) {
            dispatch(state.tr.replaceSelectionWith(hr_1.create()).scrollIntoView());
            return true;
        });
    }
    return keys;
}
exports.buildKeymap = buildKeymap;
