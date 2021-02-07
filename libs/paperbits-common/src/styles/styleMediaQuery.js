"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyleMediaQuery = void 0;
class StyleMediaQuery {
    constructor(minWidth) {
        this.minWidth = minWidth;
        this.styles = [];
        this.globalStyles = [];
    }
    toJssString() {
        const stylesJss = this.styles.map(style => style.toJssString()).join();
        const globalStylesJss = this.globalStyles.map(style => style.toJssString()).join();
        const general = !!stylesJss
            ? stylesJss
            : "";
        const global = !!globalStylesJss
            ? `"@global": {${globalStylesJss}}`
            : "";
        const jssString = `"@media(min-width:${this.minWidth}px)":{${[global, general].filter(x => !!x).join(",")}}`;
        return jssString;
    }
}
exports.StyleMediaQuery = StyleMediaQuery;
//# sourceMappingURL=styleMediaQuery.js.map