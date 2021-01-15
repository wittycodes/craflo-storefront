"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowModule = void 0;
var rowViewModel_1 = require("./rowViewModel");
var rowModelBinder_1 = require("../rowModelBinder");
var rowViewModelBinder_1 = require("./rowViewModelBinder");
var RowModule = (function () {
    function RowModule() {
    }
    RowModule.prototype.register = function (injector) {
        injector.bind("emailRow", rowViewModel_1.RowViewModel);
        injector.bindToCollection("modelBinders", rowModelBinder_1.RowModelBinder);
        injector.bindToCollection("viewModelBinders", rowViewModelBinder_1.RowViewModelBinder);
    };
    return RowModule;
}());
exports.RowModule = RowModule;
