"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeInputDesignModule = void 0;
var timeInputEditor_1 = require("./ko/timeInputEditor");
var timeInputHandlers_1 = require("./timeInputHandlers");
var TimeInputDesignModule = (function () {
    function TimeInputDesignModule() {
    }
    TimeInputDesignModule.prototype.register = function (injector) {
        injector.bind("timeInputEditor", timeInputEditor_1.TimeInputEditor);
        injector.bindToCollection("widgetHandlers", timeInputHandlers_1.TimeInputHandlers, "timeInputHandler");
    };
    return TimeInputDesignModule;
}());
exports.TimeInputDesignModule = TimeInputDesignModule;
