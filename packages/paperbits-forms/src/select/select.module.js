"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectInputModule = void 0;
var selectInput_1 = require("./ko/selectInput");
var selectModelBinder_1 = require("./selectModelBinder");
var selectViewModelBinder_1 = require("./ko/selectViewModelBinder");
var SelectInputModule = (function () {
    function SelectInputModule() {
    }
    SelectInputModule.prototype.register = function (injector) {
        injector.bind("selectInput", selectInput_1.SelectInput);
        injector.bindToCollection("modelBinders", selectModelBinder_1.SelectModelBinder);
        injector.bindToCollection("viewModelBinders", selectViewModelBinder_1.SelectViewModelBinder);
    };
    return SelectInputModule;
}());
exports.SelectInputModule = SelectInputModule;
