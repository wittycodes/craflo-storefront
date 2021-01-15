"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridCellEditorModule = void 0;
const gridCellEditor_1 = require("./gridCellEditor");
const gridCellHandlers_1 = require("../gridCellHandlers");
class GridCellEditorModule {
    register(injector) {
        injector.bind("gridCellEditor", gridCellEditor_1.GridCellEditor);
        injector.bindToCollection("widgetHandlers", gridCellHandlers_1.GridCellHandlers, "gridCellHandler");
    }
}
exports.GridCellEditorModule = GridCellEditorModule;
//# sourceMappingURL=gridCellEditor.module.js.map