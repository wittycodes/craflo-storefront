"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ko = require("knockout");
const perfect_scrollbar_1 = require("perfect-scrollbar");
ko.bindingHandlers["scrollable"] = {
    init: (element, valueAccessor) => {
        const config = ko.unwrap(valueAccessor());
        const configType = typeof config;
        let scrollbar = new perfect_scrollbar_1.default(element);
        if (configType === "object" && config.onEndReach) {
            element.addEventListener("ps-y-reach-end", () => {
                config.onEndReach();
            });
        }
        const verticalScrollBar = element.querySelector(".ps__thumb-y");
        verticalScrollBar.setAttribute("aria-label", "Vertical scrollbar");
        const checkElementSize = () => {
            requestAnimationFrame(() => {
                if (!scrollbar) {
                    return;
                }
                scrollbar.update();
                setTimeout(checkElementSize, 100);
            });
        };
        checkElementSize();
        ko.utils.domNodeDisposal.addDisposeCallback(element, () => {
            scrollbar.destroy();
            scrollbar = null;
        });
    }
};
ko.bindingHandlers["scrolledIntoView"] = {
    init: (element, valueAccessor) => {
        const config = ko.unwrap(valueAccessor());
        let scrollTimeout;
        const checkInView = () => {
            const elementRect = element.getBoundingClientRect();
            const parentElementRect = element.parentElement.getBoundingClientRect();
            if ((elementRect.top >= parentElementRect.top && elementRect.top <= parentElementRect.bottom) ||
                (elementRect.bottom >= parentElementRect.top && elementRect.bottom <= parentElementRect.bottom)) {
                if (config.onInView) {
                    config.onInView();
                }
            }
        };
        const onParentScroll = () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(checkInView, 200);
        };
        element.parentElement.addEventListener("scroll", onParentScroll);
        checkInView();
        ko.utils.domNodeDisposal.addDisposeCallback(element, () => {
            element.parentElement.removeEventListener("scroll", onParentScroll);
        });
    }
};
//# sourceMappingURL=bindingHandlers.scrollable.js.map