"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormEditorModule = void 0;
var formEditor_1 = require("./formEditor");
var formHandlers_1 = require("../formHandlers");
var FormEditorModule = (function () {
    function FormEditorModule() {
    }
    FormEditorModule.prototype.register = function (injector) {
        injector.bind("formEditor", formEditor_1.FormEditor);
        injector.bindToCollection("widgetHandlers", formHandlers_1.FormHandlers, "formHandler");
    };
    return FormEditorModule;
}());
exports.FormEditorModule = FormEditorModule;
