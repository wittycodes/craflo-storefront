"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitEditorModule = void 0;
var submitEditor_1 = require("./submitEditor");
var submitHandlers_1 = require("../submitHandlers");
var SubmitEditorModule = (function () {
    function SubmitEditorModule() {
    }
    SubmitEditorModule.prototype.register = function (injector) {
        injector.bind("submitEditor", submitEditor_1.SubmitEditor);
        injector.bindToCollection("widgetHandlers", submitHandlers_1.SubmitHandlers, "submitHandler");
    };
    return SubmitEditorModule;
}());
exports.SubmitEditorModule = SubmitEditorModule;
