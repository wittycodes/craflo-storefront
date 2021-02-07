"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormModule = void 0;
var formModelBinder_1 = require("../formModelBinder");
var formViewModelBinder_1 = require("./formViewModelBinder");
var FormModule = (function () {
    function FormModule() {
    }
    FormModule.prototype.register = function (injector) {
        injector.bindToCollection("modelBinders", formModelBinder_1.FormModelBinder);
        injector.bindToCollection("viewModelBinders", formViewModelBinder_1.FormViewModelBinder);
    };
    return FormModule;
}());
exports.FormModule = FormModule;
