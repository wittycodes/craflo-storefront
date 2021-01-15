"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropBucketItem = void 0;
const ko = require("knockout");
const background_1 = require("@paperbits/common/widgets/background");
class DropBucketItem {
    constructor() {
        this.title = null;
        this.description = null;
        this.previewUrl = ko.observable();
        this.thumbnailUrl = ko.observable();
        this.uploadables = ko.observableArray();
        this.widgetOrder = ko.observable();
        this.background = ko.computed(() => {
            const background = new background_1.BackgroundModel();
            background.sourceUrl = this.thumbnailUrl();
            return background;
        });
    }
}
exports.DropBucketItem = DropBucketItem;
//# sourceMappingURL=dropbucketItem.js.map