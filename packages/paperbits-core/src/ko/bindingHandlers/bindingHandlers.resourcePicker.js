"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ko = require("knockout");
ko.bindingHandlers["resourcePicker"] = {
    init: (element, valueAccessor) => {
        const config = valueAccessor();
        const resourcePicker = ko.unwrap(config["resourcePicker"]);
        const onSelect = ko.unwrap(config["onSelect"]);
        const hyperlink = ko.unwrap(config["hyperlink"]);
        let onSelectCallback;
        const onSelectCallbackProxy = (newResource) => {
            if (onSelectCallback) {
                onSelectCallback(newResource);
            }
        };
        ko.applyBindingsToNode(element, {
            balloon: {
                component: {
                    name: resourcePicker.componentName,
                    params: { onSelect: onSelectCallbackProxy },
                    oncreate: (resourceSelector) => {
                        if (hyperlink && resourceSelector.selectResource) {
                            resourceSelector.selectResource(hyperlink);
                        }
                        onSelectCallback = (newResource) => {
                            const hyperlink = resourcePicker.getHyperlinkFromResource(newResource);
                            onSelect(hyperlink);
                        };
                    }
                }
            }
        }, null);
    }
};
//# sourceMappingURL=bindingHandlers.resourcePicker.js.map