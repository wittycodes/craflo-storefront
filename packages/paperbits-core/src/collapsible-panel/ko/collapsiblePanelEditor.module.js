"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollapsiblePanelEditorModule = void 0;
const collapsiblePanelEditor_1 = require("./collapsiblePanelEditor");
const collapsiblePanelHandlers_1 = require("../collapsiblePanelHandlers");
class CollapsiblePanelEditorModule {
    register(injector) {
        injector.bind("collapsiblePanelEditor", collapsiblePanelEditor_1.CollapsiblePanelEditor);
        injector.bindToCollection("widgetHandlers", collapsiblePanelHandlers_1.CollapsiblePanelHandlers, "collapsiblePanelHandler");
    }
}
exports.CollapsiblePanelEditorModule = CollapsiblePanelEditorModule;
//# sourceMappingURL=collapsiblePanelEditor.module.js.map