"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangeInputDesignModule = void 0;
var rangeInputEditor_1 = require("./ko/rangeInputEditor");
var rangeInputHandlers_1 = require("./rangeInputHandlers");
var RangeInputDesignModule = (function () {
    function RangeInputDesignModule() {
    }
    RangeInputDesignModule.prototype.register = function (injector) {
        injector.bind("rangeInputEditor", rangeInputEditor_1.RangeInputEditor);
        injector.bindToCollection("widgetHandlers", rangeInputHandlers_1.RangeInputHandlers, "rangeInputHandler");
    };
    return RangeInputDesignModule;
}());
exports.RangeInputDesignModule = RangeInputDesignModule;
