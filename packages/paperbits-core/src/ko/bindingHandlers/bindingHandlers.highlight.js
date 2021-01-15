"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ko = require("knockout");
ko.bindingHandlers["highlight"] = {
    init(element, valueAccessor) {
        const config = valueAccessor();
        element["highlightConfig"] = config;
        const updatePosition = () => {
            const currentConfig = element["highlightConfig"];
            if (!currentConfig || !currentConfig.element) {
                return;
            }
            const parent = currentConfig.element.ownerDocument.defaultView.frameElement;
            const parentRect = parent.getBoundingClientRect();
            const rect = currentConfig.element.getBoundingClientRect();
            element.style.left = parentRect.left + rect.left + "px";
            element.style.top = parentRect.top + rect.top + "px";
            element.style.width = rect.width + "px";
            element.style.height = rect.height + "px";
            element.title = currentConfig.text || "Widget";
        };
        element["highlightUpdate"] = updatePosition;
        updatePosition();
        document.addEventListener("scroll", updatePosition);
        ko.utils.domNodeDisposal.addDisposeCallback(element, () => {
            document.removeEventListener("scroll", updatePosition);
        });
    },
    update(element, valueAccessor) {
        const config = valueAccessor();
        element["highlightConfig"] = ko.unwrap(config);
        element["highlightUpdate"]();
    }
};
//# sourceMappingURL=bindingHandlers.highlight.js.map