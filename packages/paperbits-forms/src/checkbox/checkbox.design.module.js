"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckboxDesignModule = void 0;
var checkboxEditor_1 = require("./ko/checkboxEditor");
var checkboxHandlers_1 = require("./checkboxHandlers");
var CheckboxDesignModule = (function () {
    function CheckboxDesignModule() {
    }
    CheckboxDesignModule.prototype.register = function (injector) {
        injector.bind("checkboxEditor", checkboxEditor_1.CheckboxEditor);
        injector.bindToCollection("widgetHandlers", checkboxHandlers_1.CheckboxHandlers, "checkboxHandler");
    };
    return CheckboxDesignModule;
}());
exports.CheckboxDesignModule = CheckboxDesignModule;
