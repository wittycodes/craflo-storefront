"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnEditorModule = void 0;
const columnEditor_1 = require("./columnEditor");
const columnHandlers_1 = require("../columnHandlers");
class ColumnEditorModule {
    register(injector) {
        injector.bind("columnEditor", columnEditor_1.ColumnEditor);
        injector.bindToCollection("widgetHandlers", columnHandlers_1.ColumnHandlers, "columnHandler");
    }
}
exports.ColumnEditorModule = ColumnEditorModule;
//# sourceMappingURL=columnEditor.module.js.map