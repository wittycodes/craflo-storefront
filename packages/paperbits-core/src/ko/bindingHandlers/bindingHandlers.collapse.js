"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ko = require("knockout");
const common_1 = require("@paperbits/common");
ko.bindingHandlers["collapse"] = {
    init: (triggerElement, valueAccessor) => {
        const expanded = true;
        setTimeout(() => {
            const targetSelector = ko.unwrap(valueAccessor());
            const targetElement = document.querySelector(targetSelector);
            if (!targetElement) {
                return;
            }
            const visibleObservable = ko.observable(expanded);
            triggerElement.setAttribute("role", "button");
            triggerElement.setAttribute("aria-label", "Toggle section");
            triggerElement.setAttribute("aria-expanded", expanded.toString());
            targetElement.setAttribute("role", "region");
            targetElement.setAttribute("aria-hidden", (!expanded).toString());
            const toggle = () => {
                const newValue = !visibleObservable();
                visibleObservable(newValue);
                triggerElement.setAttribute("aria-expanded", newValue.toString());
                if (!targetElement) {
                    return;
                }
                targetElement.setAttribute("aria-hidden", (!newValue).toString());
            };
            const onPointerDown = (event) => {
                if (event.button !== 0) {
                    return;
                }
                toggle();
            };
            const onClick = (event) => {
                event.preventDefault();
                event.stopImmediatePropagation();
            };
            const onKeyDown = (event) => {
                if (event.keyCode === common_1.Keys.Enter || event.keyCode === common_1.Keys.Space) {
                    toggle();
                }
            };
            triggerElement.addEventListener("click", onClick);
            triggerElement.addEventListener("keydown", onKeyDown);
            triggerElement.addEventListener("mousedown", onPointerDown);
            ko.applyBindingsToNode(targetElement, {
                css: { collapsed: ko.pureComputed(() => !visibleObservable()) }
            }, null);
            ko.applyBindingsToNode(triggerElement, {
                css: { collapsed: ko.pureComputed(() => !visibleObservable()) }
            }, null);
            ko.utils.domNodeDisposal.addDisposeCallback(triggerElement, () => {
                triggerElement.removeEventListener("click", onClick);
                triggerElement.removeEventListener("keydown", onKeyDown);
                triggerElement.removeEventListener("mousedown", onPointerDown);
            });
        }, 100);
    }
};
ko.bindingHandlers["log"] = {
    init: (triggerElement, valueAccessor) => {
        console.log(valueAccessor());
    }
};
//# sourceMappingURL=bindingHandlers.collapse.js.map