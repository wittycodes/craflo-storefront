"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentEditorModule = void 0;
const contentHandlers_1 = require("../contentHandlers");
class ContentEditorModule {
    register(injector) {
        injector.bindToCollection("widgetHandlers", contentHandlers_1.ContentHandlers, "pageHandlers");
    }
}
exports.ContentEditorModule = ContentEditorModule;
//# sourceMappingURL=contentEditor.module.js.map