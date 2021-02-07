"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextInputEditorModule = void 0;
var textInputEditor_1 = require("./textInputEditor");
var textInputHandlers_1 = require("../textInputHandlers");
var TextInputEditorModule = (function () {
    function TextInputEditorModule() {
    }
    TextInputEditorModule.prototype.register = function (injector) {
        injector.bind("textInputEditor", textInputEditor_1.TextInputEditor);
        injector.bindToCollection("widgetHandlers", textInputHandlers_1.TextInputHandlers, "textInputHandler");
    };
    return TextInputEditorModule;
}());
exports.TextInputEditorModule = TextInputEditorModule;
