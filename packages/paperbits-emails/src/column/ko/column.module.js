"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnModule = void 0;
var columnViewModel_1 = require("./columnViewModel");
var columnModelBinder_1 = require("../columnModelBinder");
var columnViewModelBinder_1 = require("./columnViewModelBinder");
var ColumnModule = (function () {
    function ColumnModule() {
    }
    ColumnModule.prototype.register = function (injector) {
        injector.bind("column", columnViewModel_1.ColumnViewModel);
        injector.bindToCollection("modelBinders", columnModelBinder_1.ColumnModelBinder);
        injector.bindToCollection("viewModelBinders", columnViewModelBinder_1.ColumnViewModelBinder);
    };
    return ColumnModule;
}());
exports.ColumnModule = ColumnModule;
