"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberInputDesignModule = void 0;
var numberInputEditor_1 = require("./ko/numberInputEditor");
var numberInputHandlers_1 = require("./numberInputHandlers");
var NumberInputDesignModule = (function () {
    function NumberInputDesignModule() {
    }
    NumberInputDesignModule.prototype.register = function (injector) {
        injector.bind("numberInputEditor", numberInputEditor_1.NumberInputEditor);
        injector.bindToCollection("widgetHandlers", numberInputHandlers_1.NumberInputHandlers, "numberInputHandler");
    };
    return NumberInputDesignModule;
}());
exports.NumberInputDesignModule = NumberInputDesignModule;
