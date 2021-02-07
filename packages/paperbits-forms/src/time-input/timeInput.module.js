"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeInputModule = void 0;
var timeInput_1 = require("./ko/timeInput");
var timeInputModelBinder_1 = require("./timeInputModelBinder");
var timeInputViewModelBinder_1 = require("./ko/timeInputViewModelBinder");
var TimeInputModule = (function () {
    function TimeInputModule() {
    }
    TimeInputModule.prototype.register = function (injector) {
        injector.bind("timeInput", timeInput_1.TimeInput);
        injector.bindToCollection("modelBinders", timeInputModelBinder_1.TimeInputModelBinder);
        injector.bindToCollection("viewModelBinders", timeInputViewModelBinder_1.TimeInputViewModelBinder);
    };
    return TimeInputModule;
}());
exports.TimeInputModule = TimeInputModule;
