"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ko = require("knockout");
const common_1 = require("@paperbits/common");
ko.bindingHandlers["activate"] = {
    init: (element, valueAccessor) => {
        const onActivate = valueAccessor();
        const data = ko.dataFor(element);
        const onClick = (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            onActivate(data);
        };
        const onKeyDown = (event) => {
            if (event.keyCode !== common_1.Keys.Enter && event.keyCode !== common_1.Keys.Space) {
                return;
            }
            event.preventDefault();
            event.stopImmediatePropagation();
            onActivate(data);
        };
        element.addEventListener("keydown", onKeyDown);
        element.addEventListener("click", onClick);
        ko.utils.domNodeDisposal.addDisposeCallback(element, () => {
            element.removeEventListener("click", onClick);
            element.removeEventListener("keydown", onKeyDown);
        });
    }
};
//# sourceMappingURL=bindingHandlers.activate.js.map