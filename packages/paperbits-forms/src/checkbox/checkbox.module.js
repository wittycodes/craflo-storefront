"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckboxModule = void 0;
var checkbox_1 = require("./ko/checkbox");
var checkboxModelBinder_1 = require("./checkboxModelBinder");
var checkboxViewModelBinder_1 = require("./ko/checkboxViewModelBinder");
var CheckboxModule = (function () {
    function CheckboxModule() {
    }
    CheckboxModule.prototype.register = function (injector) {
        injector.bind("checkbox", checkbox_1.Checkbox);
        injector.bindToCollection("modelBinders", checkboxModelBinder_1.CheckboxModelBinder);
        injector.bindToCollection("viewModelBinders", checkboxViewModelBinder_1.CheckboxViewModelBinder);
    };
    return CheckboxModule;
}());
exports.CheckboxModule = CheckboxModule;
