"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cssSelector = void 0;
var specificity = require("specificity");
function getSpecificity(text) {
    var spec = specificity.calculate(text);
    return spec[0].specificity.split(",");
}
function cssSelector(text, spec) {
    var _spec = spec;
    return {
        spec: _spec,
        specificity: function () {
            if (!spec) {
                _spec = getSpecificity(text);
            }
            return _spec;
        }
    };
}
exports.cssSelector = cssSelector;
