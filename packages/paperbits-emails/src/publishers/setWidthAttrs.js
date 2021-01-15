"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setWidthAttrs = void 0;
var widthElements = ["table", "td", "img"];
function setWidthAttrs(el, $) {
    var i, pxWidth;
    if (widthElements.indexOf(el.name) > -1) {
        for (i in el.styleProps) {
            if (el.styleProps[i].prop === "width" && el.styleProps[i].value.match(/px/)) {
                pxWidth = el.styleProps[i].value.replace("px", "");
                $(el).attr("width", pxWidth);
                return;
            }
        }
    }
}
exports.setWidthAttrs = setWidthAttrs;
