"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaQueryText = void 0;
var cssom = require("cssom");
var os = require("os");
var tmp = require("cssom/lib/CSSFontFaceRule");
var CSSFontFaceRule = tmp.CSSFontFaceRule;
function mediaQueryText(css) {
    var rules = cssom.parse(css).cssRules || [];
    var queries = [];
    var queryString;
    var style;
    var property;
    var value;
    var important;
    var result;
    rules.forEach(function (query) {
        if (query.type === cssom.CSSMediaRule.prototype.type) {
            queryString = [];
            queryString.push(os.EOL + "@media " + query.media[0] + " {");
            query.cssRules.forEach(function (rule) {
                if (rule.type === cssom.CSSStyleRule.prototype.type || rule.type === CSSFontFaceRule.prototype.type) {
                    queryString.push("  " + (rule.type === cssom.CSSStyleRule.prototype.type ? rule.selectorText : "@font-face") + " {");
                    for (style = 0; style < rule.style.length; style++) {
                        property = rule.style[style];
                        value = rule.style[property];
                        important = rule.style._importants[property] ? " !important" : "";
                        queryString.push("    " + property + ": " + value + important + ";");
                    }
                    queryString.push("  }");
                }
            });
            queryString.push("}");
            result = queryString.length ? queryString.join(os.EOL) + os.EOL : "";
            queries.push(result);
        }
    });
    return queries.join(os.EOL);
}
exports.mediaQueryText = mediaQueryText;
