"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ko = require("knockout");
ko.bindingHandlers["size"] = {
    update: (element, valueAccessor) => {
        const config = valueAccessor();
        const width = ko.unwrap(config.width);
        const height = ko.unwrap(config.height);
        if (width) {
            element.setAttribute("width", width);
        }
        else {
            element.removeAttribute("width");
        }
        if (height) {
            element.setAttribute("height", height);
        }
        else {
            element.removeAttribute("height");
        }
        element.style.width = width ? width + "px" : null;
        element.style.height = height ? height + "px" : null;
    }
};
//# sourceMappingURL=bindingHandlers.size.js.map