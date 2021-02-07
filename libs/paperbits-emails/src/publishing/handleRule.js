"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRule = void 0;
var parseCSS = require("css-rules");
var styleSelector_1 = require("./styleSelector");
var addProps_1 = require("./addProps");
var styleSelector = styleSelector_1.cssSelector("<style attribute>", [1, 0, 0, 0]);
function handleRule(rule, $) {
    var sel = rule[0], style = rule[1], selector = styleSelector_1.cssSelector(sel), editedElements = [];
    $(sel).each(function (index, el) {
        var cssText;
        if (!el.styleProps) {
            el.styleProps = {};
            if ($(el).attr("style")) {
                cssText = "* { " + $(el).attr("style") + " } ";
                addProps_1.addProps(el, parseCSS(cssText)[0][1], styleSelector);
            }
            editedElements.push(el);
        }
        addProps_1.addProps(el, style, selector);
    });
    return editedElements;
}
exports.handleRule = handleRule;
