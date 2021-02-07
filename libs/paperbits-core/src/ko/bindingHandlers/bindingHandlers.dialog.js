"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ko = require("knockout");
const common_1 = require("@paperbits/common");
ko.bindingHandlers["dialog"] = {
    init(element) {
        setTimeout(() => {
            const focusables = `a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])`;
            const focusableElements = element.querySelectorAll(focusables);
            const firstFocusableElement = focusableElements[0];
            const lastFocusableElement = focusableElements[focusableElements.length - 1];
            const onKeyDown = (event) => {
                const isTabPressed = event.keyCode === common_1.Keys.Tab;
                if (!isTabPressed) {
                    return;
                }
                if (event.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        event.preventDefault();
                    }
                }
                else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        event.preventDefault();
                    }
                }
            };
            element.addEventListener("keydown", onKeyDown);
            ko.utils.domNodeDisposal.addDisposeCallback(element, () => {
                element.removeEventListener("keydown", onKeyDown);
            });
        }, 100);
    }
};
//# sourceMappingURL=bindingHandlers.dialog.js.map