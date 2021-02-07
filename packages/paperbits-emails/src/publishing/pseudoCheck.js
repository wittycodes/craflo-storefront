"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pseudoCheck = void 0;
var parser = require("slick").parse;
function parse(text) {
    try {
        return parser(text)[0];
    }
    catch (e) {
        return [];
    }
}
function pseudoCheck(rule) {
    var i;
    var j;
    var subSelPseudos;
    var ignoredPseudos = ["hover", "active", "focus", "visited", "link"];
    var parsedSelector = parse(rule[0]);
    for (i = 0; i < parsedSelector.length; ++i) {
        subSelPseudos = parsedSelector[i].pseudos;
        if (subSelPseudos) {
            for (j = 0; j < subSelPseudos.length; ++j) {
                if (ignoredPseudos.indexOf(subSelPseudos[j].name) >= 0) {
                    return true;
                }
            }
        }
        else {
            return false;
        }
    }
}
exports.pseudoCheck = pseudoCheck;
