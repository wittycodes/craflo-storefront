"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitModule = void 0;
var submit_1 = require("./submit");
var submitModelBinder_1 = require("../submitModelBinder");
var submitViewModelBinder_1 = require("./submitViewModelBinder");
var SubmitModule = (function () {
    function SubmitModule() {
    }
    SubmitModule.prototype.register = function (injector) {
        injector.bind("submit", submit_1.Submit);
        injector.bindToCollection("modelBinders", submitModelBinder_1.SubmitModelBinder);
        injector.bindToCollection("viewModelBinders", submitViewModelBinder_1.SubmitViewModelBinder);
    };
    return SubmitModule;
}());
exports.SubmitModule = SubmitModule;
