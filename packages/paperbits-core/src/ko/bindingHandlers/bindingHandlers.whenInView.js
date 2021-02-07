"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ko = require("knockout");
ko.bindingHandlers["whenInView"] = {
    init: (element, valueAccessor) => {
        const callback = valueAccessor();
        const onIntersect = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && callback) {
                    callback();
                }
            });
        };
        const observer = new IntersectionObserver(onIntersect);
        observer.observe(element);
        ko.utils.domNodeDisposal.addDisposeCallback(element, () => {
            observer.disconnect();
        });
    }
};
//# sourceMappingURL=bindingHandlers.whenInView.js.map