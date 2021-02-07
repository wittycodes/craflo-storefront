"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyleRule = void 0;
class StyleRule {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
    toJssString() {
        return `"${this.name}":"${this.value}"`;
    }
}
exports.StyleRule = StyleRule;
//# sourceMappingURL=styleRule.js.map