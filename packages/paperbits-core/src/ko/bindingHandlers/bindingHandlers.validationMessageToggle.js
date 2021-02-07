"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ko = require("knockout");
ko.bindingHandlers["validationMessageToggle"] = {
    init: (triggerElement, valueAccessor) => {
        const observable = valueAccessor();
        if (!ko.isObservable(observable) || !observable.isValid) {
            console.warn("No validation assigned to observable for element: " + triggerElement.nodeType);
            return;
        }
        ko.applyBindingsToNode(triggerElement, {
            visible: ko.pureComputed(() => !observable.isValid()),
            balloon: {
                component: {
                    name: "tooltip",
                    params: { text: observable.error }
                },
                position: "top",
                isOpen: ko.observable()
            }
        }, null);
    }
};
//# sourceMappingURL=bindingHandlers.validationMessageToggle.js.map