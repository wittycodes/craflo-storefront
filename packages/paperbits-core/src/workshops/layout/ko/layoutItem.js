"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutItem = void 0;
const ko = require("knockout");
class LayoutItem {
    constructor(layout) {
        this.key = layout.key;
        this.contentKey = layout.contentKey;
        this.title = ko.observable(layout.title);
        this.description = ko.observable(layout.description);
        this.permalinkTemplate = ko.observable(layout.permalinkTemplate);
    }
    toContract() {
        return {
            key: this.key,
            contentKey: this.contentKey,
            title: this.title(),
            description: this.description(),
            permalinkTemplate: this.permalinkTemplate()
        };
    }
}
exports.LayoutItem = LayoutItem;
//# sourceMappingURL=layoutItem.js.map