"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProps = void 0;
var styleSelector_1 = require("./styleSelector");
var cssProperty_1 = require("./cssProperty");
var importantSelector = styleSelector_1.cssSelector("<!important>", [2, 0, 0, 0]);
function getProperty(styles, name, selector) {
    var value = styles[name];
    var sel = styles._importants[name] ? importantSelector : selector;
    return cssProperty_1.cssProperty(name, value, sel);
}
function addProps(el, styles, selector) {
    var i, name, prop, existing, winner;
    for (i = 0; i < styles.length; i++) {
        name = styles[i];
        prop = getProperty(styles, name, selector);
        existing = el.styleProps[name];
        if (existing) {
            winner = existing.compare(prop);
            if (winner === prop) {
                el.styleProps[name] = prop;
            }
        }
        else {
            el.styleProps[name] = prop;
        }
    }
}
exports.addProps = addProps;
