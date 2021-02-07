"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ko = require("knockout");
ko.bindingHandlers["focus"] = {
    init: (element, valueAccessor) => {
        const options = ko.unwrap(valueAccessor());
        setTimeout(() => {
            const type = typeof options;
            if (type === "boolean" && options) {
                element.focus();
                return;
            }
            if (type === "object" && options["childSelector"]) {
                element = element.querySelector(options["childSelector"]);
                if (element) {
                    element.focus();
                }
                return;
            }
        }, 100);
    }
};
//# sourceMappingURL=bindingHandlers.focus.js.map