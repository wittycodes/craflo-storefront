"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var Utils = require("@paperbits/common/utils");
var linearGradientContract_1 = require("./../../contracts/linearGradientContract");
var styles_1 = require("@paperbits/common/styles");
var jssCompiler_1 = require("../../jssCompiler");
ko.bindingHandlers["gradientPreview"] = {
    update: function (element, valueAccessor) {
        var linearGradientContract = ko.unwrap(valueAccessor());
        var key = Utils.camelCaseToKebabCase(linearGradientContract.key).replace("/", "-");
        var gradientStyleRule = new styles_1.StyleRule("background-image", linearGradientContract_1.getLinearGradientString(linearGradientContract));
        var style = new styles_1.Style(key);
        style.addRule(gradientStyleRule);
        var styleSheet = new styles_1.StyleSheet();
        styleSheet.styles.push(style);
        var compiler = new jssCompiler_1.JssCompiler();
        var css = compiler.compile(styleSheet);
        element.innerHTML = css;
    }
};
