"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutModule = void 0;
var layoutViewModel_1 = require("./layoutViewModel");
var layoutModelBinder_1 = require("../layoutModelBinder");
var layoutViewModelBinder_1 = require("./layoutViewModelBinder");
var LayoutModule = (function () {
    function LayoutModule() {
    }
    LayoutModule.prototype.register = function (injector) {
        injector.bind("emailLayoutWidget", layoutViewModel_1.LayoutViewModel);
        injector.bindToCollection("modelBinders", layoutModelBinder_1.LayoutModelBinder, "emailLayoutModelBinder");
        injector.bindToCollection("viewModelBinders", layoutViewModelBinder_1.LayoutViewModelBinder, "emailLayoutViewModelBinder");
    };
    return LayoutModule;
}());
exports.LayoutModule = LayoutModule;
