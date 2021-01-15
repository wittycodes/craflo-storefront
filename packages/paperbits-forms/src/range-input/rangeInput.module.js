"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangeInputModule = void 0;
var rangeInput_1 = require("./ko/rangeInput");
var rangeInputModelBinder_1 = require("./rangeInputModelBinder");
var rangeInputViewModelBinder_1 = require("./ko/rangeInputViewModelBinder");
var RangeInputModule = (function () {
    function RangeInputModule() {
    }
    RangeInputModule.prototype.register = function (injector) {
        injector.bind("rangeInput", rangeInput_1.RangeInput);
        injector.bindToCollection("modelBinders", rangeInputModelBinder_1.RangeInputModelBinder);
        injector.bindToCollection("viewModelBinders", rangeInputViewModelBinder_1.RangeInputViewModelBinder);
    };
    return RangeInputModule;
}());
exports.RangeInputModule = RangeInputModule;
