"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ko = require("knockout");
ko.bindingHandlers["alignment"] = {
    init: (arrowElement, valueAccessor) => {
        const config = ko.unwrap(valueAccessor());
        const alignment = arrowElement.getAttribute("alignment");
        ko.applyBindingsToNode(arrowElement, {
            click: () => {
                config.onChange(alignment);
            },
            css: {
                active: ko.pureComputed(() => config.position() === alignment)
            }
        }, null);
    }
};
//# sourceMappingURL=bindingHandlers.align.js.map