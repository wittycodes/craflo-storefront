"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageItem = exports.AnchorItem = void 0;
const ko = require("knockout");
const permalinks_1 = require("@paperbits/common/permalinks");
class AnchorItem {
    constructor() {
        this.isSelected = ko.observable();
    }
}
exports.AnchorItem = AnchorItem;
class PageItem {
    constructor(page) {
        this.contentKey = page.contentKey;
        this.key = page.key;
        this.title = ko.observable(page.title);
        this.description = ko.observable(page.description);
        this.keywords = ko.observable(page.keywords);
        this.jsonLd = ko.observable(page.jsonLd);
        this.permalink = ko.observable(page.permalink);
        this.anchors = ko.observableArray();
        this.socialShareData = ko.observable(page.socialShareData);
        this.anchorsLoaded = ko.observable(false);
    }
    getHyperlink() {
        const hyperlinkModel = new permalinks_1.HyperlinkModel();
        hyperlinkModel.title = this.title();
        hyperlinkModel.targetKey = this.key;
        hyperlinkModel.href = this.permalink();
        if (this.selectedAnchor) {
            hyperlinkModel.anchor = this.selectedAnchor.elementId;
            hyperlinkModel.anchorName = this.selectedAnchor.shortTitle;
        }
        return hyperlinkModel;
    }
    toContract() {
        return {
            key: this.key,
            title: this.title(),
            description: this.description(),
            keywords: this.keywords(),
            jsonLd: this.jsonLd(),
            contentKey: this.contentKey,
            permalink: this.permalink(),
            socialShareData: this.socialShareData()
        };
    }
}
exports.PageItem = PageItem;
//# sourceMappingURL=pageItem.js.map