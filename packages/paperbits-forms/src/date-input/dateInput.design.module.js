"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateInputDesignModule = void 0;
var dateInputEditor_1 = require("./ko/dateInputEditor");
var dateInputHandlers_1 = require("./dateInputHandlers");
var DateInputDesignModule = (function () {
    function DateInputDesignModule() {
    }
    DateInputDesignModule.prototype.register = function (injector) {
        injector.bind("dateInputEditor", dateInputEditor_1.DateInputEditor);
        injector.bindToCollection("widgetHandlers", dateInputHandlers_1.DateInputHandlers, "dateInputHandler");
    };
    return DateInputDesignModule;
}());
exports.DateInputDesignModule = DateInputDesignModule;
