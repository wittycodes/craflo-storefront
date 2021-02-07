"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FontFace = void 0;
class FontFace {
    toJssString() {
        const jssString = `{
            "src": "url(${this.src})",
            "fontFamily": "${this.fontFamily}",
            "fontStyle": "${this.fontStyle}",
            "fontWeight": "${this.fontWeight}"
        }`;
        return jssString;
    }
}
exports.FontFace = FontFace;
//# sourceMappingURL=fontFace.js.map