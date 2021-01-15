"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ko = require("knockout");
ko.bindingHandlers["hyperlink"] = {
    init(element, valueAccessor) {
        const hyperlink = valueAccessor();
        const attributesObservable = ko.observable();
        const setElementAttributes = (hyperlink) => {
            var _a;
            if (!hyperlink) {
                attributesObservable({ href: "#", target: "_blank" });
                return;
            }
            const downloadAttribute = ((_a = hyperlink.targetKey) === null || _a === void 0 ? void 0 : _a.startsWith("uploads/")) ? ""
                : undefined;
            attributesObservable({ href: hyperlink.href, target: hyperlink.target, download: downloadAttribute });
        };
        if (ko.isObservable(hyperlink)) {
            hyperlink.subscribe(setElementAttributes);
        }
        const initial = ko.unwrap(hyperlink);
        setElementAttributes(initial);
        ko.applyBindingsToNode(element, { attr: attributesObservable }, null);
    }
};
//# sourceMappingURL=bindingHandlers.hyperlink.js.map