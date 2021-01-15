"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProseMirrorModule = void 0;
var prosemirrorHtmlEditor_1 = require("./prosemirrorHtmlEditor");
var ProseMirrorModule = (function () {
    function ProseMirrorModule() {
    }
    ProseMirrorModule.prototype.register = function (injector) {
        injector.bind("htmlEditor", prosemirrorHtmlEditor_1.ProseMirrorHtmlEditor);
        var factory = function () {
            return {
                createHtmlEditor: function () {
                    return injector.resolve("htmlEditor");
                }
            };
        };
        injector.bind("htmlEditorFactory", factory);
    };
    return ProseMirrorModule;
}());
exports.ProseMirrorModule = ProseMirrorModule;
