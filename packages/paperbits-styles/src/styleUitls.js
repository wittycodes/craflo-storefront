"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatUnicode = void 0;
function formatUnicode(unicode) {
    var unicodeString = unicode.toString(16);
    if (unicodeString.length > 4) {
        return ("000000" + unicodeString.toLowerCase()).substr(-6);
    }
    else {
        return ("0000" + unicodeString.toLowerCase()).substr(-4);
    }
}
exports.formatUnicode = formatUnicode;
