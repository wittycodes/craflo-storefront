"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowEditorModule = void 0;
const rowLayoutSelector_1 = require("./rowLayoutSelector");
const rowHandlers_1 = require("../rowHandlers");
class RowEditorModule {
    register(injector) {
        injector.bind("rowLayoutSelector", rowLayoutSelector_1.RowLayoutSelector);
        injector.bindToCollection("widgetHandlers", rowHandlers_1.RowHandlers, "rowHandler");
    }
}
exports.RowEditorModule = RowEditorModule;
//# sourceMappingURL=rowEditor.module.js.map