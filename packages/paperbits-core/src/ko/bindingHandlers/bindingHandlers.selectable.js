"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ko = require("knockout");
ko.bindingHandlers["selectable"] = {
    init: (element, valueAccessor) => {
        setImmediate(() => {
            if (element.classList.contains("selected")) {
                element.scrollIntoView({ block: "center" });
            }
        });
    }
};
//# sourceMappingURL=bindingHandlers.selectable.js.map