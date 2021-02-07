"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cssProperty = void 0;
function compareSpecificity(a, b) {
    var i;
    for (i = 0; i < 4; i++) {
        if (a[i] === b[i]) {
            continue;
        }
        if (a[i] > b[i]) {
            return a;
        }
        return b;
    }
    return b;
}
function cssProperty(prop, value, selector) {
    var o = {};
    var compare = function (property) {
        var a = selector.specificity();
        var b = property.selector.specificity();
        var winner = compareSpecificity(a, b);
        if (winner === a && a !== b) {
            return o;
        }
        return property;
    };
    o = {
        prop: prop,
        value: value,
        selector: selector,
        compare: compare
    };
    return o;
}
exports.cssProperty = cssProperty;
