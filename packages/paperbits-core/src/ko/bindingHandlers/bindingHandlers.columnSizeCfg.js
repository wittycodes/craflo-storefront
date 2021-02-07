"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ko = require("knockout");
ko.bindingHandlers["columnSizeCfg"] = {
    init(element, valueAccessor) {
        let sizes = valueAccessor();
        let size = sizes.xs;
        if (sizes.sm) {
            size = sizes.sm;
        }
        if (sizes.md) {
            size = sizes.md;
        }
        if (sizes.lg) {
            size = sizes.lg;
        }
        if (sizes.xl) {
            size = sizes.xl;
        }
        const css = {};
        css[`col-cfg-${size}`] = true;
        ko.applyBindingsToNode(element, { css: css }, null);
    }
};
//# sourceMappingURL=bindingHandlers.columnSizeCfg.js.map