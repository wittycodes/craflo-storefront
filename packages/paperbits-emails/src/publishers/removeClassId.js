"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeClassId = void 0;
function removeClassId(el, $) {
    var selectors = ["class", "id"];
    selectors.forEach(function (selector) {
        var attribute = $(el).attr(selector);
        if (typeof attribute !== "undefined") {
            $(el).removeAttr(selector);
        }
    });
}
exports.removeClassId = removeClassId;
