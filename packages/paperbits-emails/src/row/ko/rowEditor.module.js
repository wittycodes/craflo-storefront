"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowEditorModule = void 0;
var rowLayoutSelector_1 = require("./rowLayoutSelector");
var rowHandlers_1 = require("../rowHandlers");
var RowEditorModule = (function () {
    function RowEditorModule() {
    }
    RowEditorModule.prototype.register = function (injector) {
        injector.bind("emailRowLayoutSelector", rowLayoutSelector_1.RowLayoutSelector);
        injector.bindToCollection("widgetHandlers", rowHandlers_1.RowHandlers, "emailRowHandler");
    };
    return RowEditorModule;
}());
exports.RowEditorModule = RowEditorModule;
