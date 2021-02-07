"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlInputDesignModule = void 0;
var urlInputEditor_1 = require("./ko/urlInputEditor");
var urlInputHandlers_1 = require("./urlInputHandlers");
var UrlInputDesignModule = (function () {
    function UrlInputDesignModule() {
    }
    UrlInputDesignModule.prototype.register = function (injector) {
        injector.bind("urlInputEditor", urlInputEditor_1.UrlInputEditor);
        injector.bindToCollection("widgetHandlers", urlInputHandlers_1.UrlInputHandlers, "urlInputHandler");
    };
    return UrlInputDesignModule;
}());
exports.UrlInputDesignModule = UrlInputDesignModule;
