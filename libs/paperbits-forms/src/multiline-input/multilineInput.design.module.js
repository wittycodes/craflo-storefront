"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultilineInputDesignModule = void 0;
var multilineInputEditor_1 = require("./ko/multilineInputEditor");
var multilineInputHandlers_1 = require("./multilineInputHandlers");
var MultilineInputDesignModule = (function () {
    function MultilineInputDesignModule() {
    }
    MultilineInputDesignModule.prototype.register = function (injector) {
        injector.bind("multilineInputEditor", multilineInputEditor_1.MultilineInputEditor);
        injector.bindToCollection("widgetHandlers", multilineInputHandlers_1.MultilineInputHandlers, "multilineInputHandler");
    };
    return MultilineInputDesignModule;
}());
exports.MultilineInputDesignModule = MultilineInputDesignModule;
