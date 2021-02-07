"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Style = void 0;
const Utils = require("../utils");
class Style {
    constructor(selector) {
        this.selector = Utils.camelCaseToKebabCase(selector);
        this.rules = [];
        this.nestedStyles = [];
        this.nestedGlobalStyles = [];
        this.modifierStyles = [];
        this.pseudoStyles = [];
        this.nestedMediaQueries = [];
    }
    addRule(rule) {
        this.rules.push(rule);
    }
    addRules(rules) {
        this.rules.push(...rules);
    }
    getRulesJssString() {
        const rules = this.rules.filter(x => !!x.value).map(rule => rule.toJssString()).filter(x => !!x).join(",");
        const modifierStyles = this.modifierStyles.map(style => `"&.${style.selector}": ${style.getRulesJssString()}`).filter(x => !!x).join(",");
        const pseudoStyles = this.pseudoStyles.map(style => `"&:${style.selector}": ${style.getRulesJssString()}`).filter(x => !!x).join(",");
        const nestedStyles = this.nestedStyles.map(style => `"& .${style.selector}": ${style.getRulesJssString()}`).filter(x => !!x).join(",");
        const nestedGloablStyles = this.nestedGlobalStyles.map(style => `"& ${style.selector}": ${style.getRulesJssString()}`).filter(x => !!x).join(",");
        const jssString = `{ ${[rules, modifierStyles, pseudoStyles, nestedStyles, nestedGloablStyles].filter(x => !!x).join(",")} }`;
        return jssString;
    }
    toJssString() {
        const rulesJssString = this.getRulesJssString();
        const jssString = `"${this.selector}":${rulesJssString}`;
        return jssString;
    }
}
exports.Style = Style;
//# sourceMappingURL=styles.js.map