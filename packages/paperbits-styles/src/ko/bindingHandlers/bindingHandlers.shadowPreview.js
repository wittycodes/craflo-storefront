"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var Utils = require("@paperbits/common/utils");
var plugins_1 = require("../../plugins");
var styles_1 = require("@paperbits/common/styles");
var jssCompiler_1 = require("../../jssCompiler");
ko.bindingHandlers["shadowPreview"] = {
    update: function (element, valueAccessor) {
        var shadowContract = ko.unwrap(valueAccessor());
        var key = Utils.camelCaseToKebabCase(shadowContract.key).replace("/", "-");
        var shadowStyleRules = plugins_1.ShadowStylePlugin.contractToStyleRules(shadowContract);
        var style = new styles_1.Style(key);
        style.addRules(shadowStyleRules);
        var styleSheet = new styles_1.StyleSheet();
        styleSheet.styles.push(style);
        var compiler = new jssCompiler_1.JssCompiler();
        var css = compiler.compile(styleSheet);
        element.innerHTML = css;
    }
};
