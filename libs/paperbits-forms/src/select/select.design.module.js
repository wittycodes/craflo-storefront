"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectInputDesignModule = void 0;
var selectInputEditor_1 = require("./ko/selectInputEditor");
var selectHandlers_1 = require("./selectHandlers");
var SelectInputDesignModule = (function () {
    function SelectInputDesignModule() {
    }
    SelectInputDesignModule.prototype.register = function (injector) {
        injector.bind("selectEditor", selectInputEditor_1.SelectEditor);
        injector.bindToCollection("widgetHandlers", selectHandlers_1.SelectHandlers, "selectHandler");
    };
    return SelectInputDesignModule;
}());
exports.SelectInputDesignModule = SelectInputDesignModule;
