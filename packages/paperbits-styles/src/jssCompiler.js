"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JssCompiler = void 0;
var jss_1 = require("jss");
var jss_preset_default_1 = require("jss-preset-default");
var Utils = require("@paperbits/common/utils");
var styles_1 = require("@paperbits/common/styles");
var opts = jss_preset_default_1.default();
opts.createGenerateId = function () {
    return function (rule, sheet) {
        return Utils.camelCaseToKebabCase(rule.key);
    };
};
jss_1.default.setup(opts);
var JssCompiler = (function () {
    function JssCompiler() {
    }
    JssCompiler.prototype.flattenMediaQueries = function (styles, globalStyles) {
        var nestedMediaQueries = styles.map(function (x) { return x.nestedMediaQueries; });
        var flattenNestedMediaQueries = nestedMediaQueries.reduce(function (acc, next) { return acc.concat(next); }, []);
        var nestedGlobalMediaQueries = globalStyles.map(function (x) { return x.nestedMediaQueries; });
        var flattenNestedGlobalMediaQueries = nestedGlobalMediaQueries.reduce(function (acc, next) { return acc.concat(next); }, []);
        var groupedMediaQueries = [];
        var _loop_1 = function (breakpointMinWidth) {
            var mediaQuery = new styles_1.StyleMediaQuery(breakpointMinWidth);
            flattenNestedMediaQueries
                .filter(function (x) { return x.minWidth === breakpointMinWidth; })
                .forEach(function (x) {
                var _a;
                return (_a = mediaQuery.styles).push.apply(_a, x.styles);
            });
            flattenNestedGlobalMediaQueries
                .filter(function (x) { return x.minWidth === breakpointMinWidth; })
                .forEach(function (x) {
                var _a;
                return (_a = mediaQuery.globalStyles).push.apply(_a, x.styles);
            });
            groupedMediaQueries.push(mediaQuery);
        };
        for (var _i = 0, _a = Object.values(styles_1.BreakpointValues); _i < _a.length; _i++) {
            var breakpointMinWidth = _a[_i];
            _loop_1(breakpointMinWidth);
        }
        return groupedMediaQueries;
    };
    JssCompiler.prototype.styleSheetToCss = function (styleSheet) {
        var globalStyles = styleSheet.globalStyles.map(function (style) { return style.toJssString(); }).filter(function (x) { return !!x; }).join(",");
        var globalJssString = "{ \"@global\": { " + globalStyles + " } }";
        var globalJssObject = JSON.parse(globalJssString);
        var globalCss = jss_1.default.createStyleSheet(globalJssObject).toString();
        var fontFacesJssString = "\"@font-face\":[" + styleSheet.fontFaces.map(function (x) { return x.toJssString(); }).join(",") + "]";
        var stylesJssString = styleSheet.styles.map(function (style) { return style.toJssString(); }).filter(function (x) { return !!x; }).join(",");
        var mediaQueries = this.flattenMediaQueries(styleSheet.styles, styleSheet.globalStyles);
        var mediaQueriesJssString = mediaQueries.map(function (x) { return x.toJssString(); }).filter(function (x) { return !!x; }).join(",");
        var result = [fontFacesJssString, stylesJssString, mediaQueriesJssString].filter(function (x) { return !!x; }).join(",");
        var jssString = "{" + result + "}";
        var jssObject = JSON.parse(jssString);
        var css = jss_1.default.createStyleSheet(jssObject).toString();
        return globalCss + " " + css;
    };
    JssCompiler.prototype.compile = function () {
        var _this = this;
        var styleSheets = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            styleSheets[_i] = arguments[_i];
        }
        return styleSheets
            .map(function (val) { return _this.styleSheetToCss(val); })
            .join(" ")
            .replace(/\n/g, "")
            .replace(/\s\s+/g, " ");
    };
    return JssCompiler;
}());
exports.JssCompiler = JssCompiler;
