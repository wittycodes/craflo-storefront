"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextInputModule = void 0;
var textInput_1 = require("./textInput");
var textInputModelBinder_1 = require("../textInputModelBinder");
var textInputViewModelBinder_1 = require("./textInputViewModelBinder");
var TextInputModule = (function () {
    function TextInputModule() {
    }
    TextInputModule.prototype.register = function (injector) {
        injector.bind("textInput", textInput_1.TextInput);
        injector.bindToCollection("modelBinders", textInputModelBinder_1.TextInputModelBinder);
        injector.bindToCollection("viewModelBinders", textInputViewModelBinder_1.TextInputViewModelBinder);
    };
    return TextInputModule;
}());
exports.TextInputModule = TextInputModule;
