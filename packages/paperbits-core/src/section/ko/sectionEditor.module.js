"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionEditorModule = void 0;
const sectionLayoutSelector_1 = require("./sectionLayoutSelector");
const sectionEditor_1 = require("./sectionEditor");
const sectionHandlers_1 = require("../sectionHandlers");
class SectionEditorModule {
    register(injector) {
        injector.bind("sectionLayoutSelector", sectionLayoutSelector_1.SectionLayoutSelector);
        injector.bind("sectionEditor", sectionEditor_1.SectionEditor);
        injector.bindToCollection("widgetHandlers", sectionHandlers_1.SectionHandlers, "sectionHandler");
    }
}
exports.SectionEditorModule = SectionEditorModule;
//# sourceMappingURL=sectionEditor.module.js.map