"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnEditorModule = void 0;
var columnHandlers_1 = require("../columnHandlers");
var columnEditor_1 = require("./columnEditor");
var ColumnEditorModule = (function () {
    function ColumnEditorModule() {
    }
    ColumnEditorModule.prototype.register = function (injector) {
        injector.bind("emailColumnEditor", columnEditor_1.ColumnEditor);
        injector.bindToCollection("widgetHandlers", columnHandlers_1.ColumnHandlers, "emailColumnHandler");
    };
    return ColumnEditorModule;
}());
exports.ColumnEditorModule = ColumnEditorModule;
