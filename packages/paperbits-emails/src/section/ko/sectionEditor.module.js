"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionEditorModule = void 0;
var sectionLayoutSelector_1 = require("./sectionLayoutSelector");
var sectionHandlers_1 = require("../sectionHandlers");
var sectionEditor_1 = require("./sectionEditor");
var SectionEditorModule = (function () {
    function SectionEditorModule() {
    }
    SectionEditorModule.prototype.register = function (injector) {
        injector.bind("emailSectionLayoutSelector", sectionLayoutSelector_1.SectionLayoutSelector);
        injector.bind("emailSectionEditor", sectionEditor_1.SectionEditor);
        injector.bindToCollection("widgetHandlers", sectionHandlers_1.SectionHandlers, "emailSectionHandler");
    };
    return SectionEditorModule;
}());
exports.SectionEditorModule = SectionEditorModule;
