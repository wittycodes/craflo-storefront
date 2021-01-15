"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultilineInputModule = void 0;
var multilineInput_1 = require("./ko/multilineInput");
var multilineInputModelBinder_1 = require("./multilineInputModelBinder");
var multilineInputViewModelBinder_1 = require("./ko/multilineInputViewModelBinder");
var MultilineInputModule = (function () {
    function MultilineInputModule() {
    }
    MultilineInputModule.prototype.register = function (injector) {
        injector.bind("multilineInput", multilineInput_1.MultilineInput);
        injector.bindToCollection("modelBinders", multilineInputModelBinder_1.MultilineInputModelBinder);
        injector.bindToCollection("viewModelBinders", multilineInputViewModelBinder_1.MultilineInputViewModelBinder);
    };
    return MultilineInputModule;
}());
exports.MultilineInputModule = MultilineInputModule;
