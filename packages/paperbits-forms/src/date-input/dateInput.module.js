"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateInputModule = void 0;
var dateInput_1 = require("./ko/dateInput");
var dateInputModelBinder_1 = require("./dateInputModelBinder");
var dateInputViewModelBinder_1 = require("./ko/dateInputViewModelBinder");
var DateInputModule = (function () {
    function DateInputModule() {
    }
    DateInputModule.prototype.register = function (injector) {
        injector.bind("dateInput", dateInput_1.DateInput);
        injector.bindToCollection("modelBinders", dateInputModelBinder_1.DateInputModelBinder);
        injector.bindToCollection("viewModelBinders", dateInputViewModelBinder_1.DateInputViewModelBinder);
    };
    return DateInputModule;
}());
exports.DateInputModule = DateInputModule;
