"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberInputModule = void 0;
var numberInput_1 = require("./ko/numberInput");
var numberInputModelBinder_1 = require("./numberInputModelBinder");
var numberInputViewModelBinder_1 = require("./ko/numberInputViewModelBinder");
var NumberInputModule = (function () {
    function NumberInputModule() {
    }
    NumberInputModule.prototype.register = function (injector) {
        injector.bind("numberInput", numberInput_1.NumberInput);
        injector.bindToCollection("modelBinders", numberInputModelBinder_1.NumberInputModelBinder);
        injector.bindToCollection("viewModelBinders", numberInputViewModelBinder_1.NumberInputViewModelBinder);
    };
    return NumberInputModule;
}());
exports.NumberInputModule = NumberInputModule;
