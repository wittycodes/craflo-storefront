"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlInputModule = void 0;
var urlInput_1 = require("./ko/urlInput");
var urlInputModelBinder_1 = require("./urlInputModelBinder");
var urlInputViewModelBinder_1 = require("./ko/urlInputViewModelBinder");
var UrlInputModule = (function () {
    function UrlInputModule() {
    }
    UrlInputModule.prototype.register = function (injector) {
        injector.bind("urlInput", urlInput_1.UrlInput);
        injector.bindToCollection("modelBinders", urlInputModelBinder_1.UrlInputModelBinder);
        injector.bindToCollection("viewModelBinders", urlInputViewModelBinder_1.UrlInputViewModelBinder);
    };
    return UrlInputModule;
}());
exports.UrlInputModule = UrlInputModule;
