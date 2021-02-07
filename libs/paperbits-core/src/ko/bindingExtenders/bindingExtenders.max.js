"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ko = require("knockout");
ko.extenders.max = (target, max) => {
    const result = ko.pureComputed({
        read: target,
        write: (newValue) => {
            const current = target();
            if (newValue <= max) {
                target(newValue);
            }
            else if (newValue !== current) {
                target.notifySubscribers(newValue);
            }
        }
    }).extend({ notify: "always" });
    result(target());
    return result;
};
//# sourceMappingURL=bindingExtenders.max.js.map