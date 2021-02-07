"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var jssCompiler_1 = require("../../jssCompiler");
ko.bindingHandlers["jss"] = {
    update: function (element, valueAccessor) {
        var styleSheet = ko.unwrap(valueAccessor());
        if (!styleSheet) {
            element.innerHTML = "";
            return;
        }
        var compiler = new jssCompiler_1.JssCompiler();
        var css = compiler.compile(styleSheet);
        element.innerHTML = css;
    }
};
