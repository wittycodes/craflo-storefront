"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LightboxBindingHandler = void 0;
const ko = require("knockout");
class LightboxBindingHandler {
    constructor(lightbox) {
        ko.bindingHandlers["lightbox"] = {
            init(element, valueAccessor) {
                const configuration = valueAccessor();
                let lightboxContentUrl = ko.unwrap(configuration.url);
                let lightBoxContendFileName = ko.unwrap(configuration.fileName);
                const setContentUrl = (url) => {
                    lightboxContentUrl = url;
                };
                const showLightbox = () => {
                    lightbox.show(lightboxContentUrl, lightBoxContendFileName);
                };
                if (ko.isObservable(configuration.url)) {
                    configuration.url.subscribe(setContentUrl);
                }
                ko.applyBindingsToNode(element, { click: showLightbox }, null);
            }
        };
    }
}
exports.LightboxBindingHandler = LightboxBindingHandler;
//# sourceMappingURL=bindingHandlers.lightbox.js.map