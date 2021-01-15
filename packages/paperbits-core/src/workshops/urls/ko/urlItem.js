"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlItem = void 0;
const ko = require("knockout");
const permalinks_1 = require("@paperbits/common/permalinks");
class UrlItem {
    constructor(url) {
        this.key = url.key;
        this.title = ko.observable(url.title);
        this.description = ko.observable(url.description);
        this.permalink = ko.observable(url.permalink);
        this.hasFocus = ko.observable(false);
    }
    toContract() {
        return {
            key: this.key,
            title: this.title(),
            description: this.description(),
            permalink: this.permalink()
        };
    }
    getHyperlink() {
        const hyperlinkModel = new permalinks_1.HyperlinkModel();
        hyperlinkModel.title = this.title();
        hyperlinkModel.targetKey = this.key;
        hyperlinkModel.href = this.permalink();
        return hyperlinkModel;
    }
}
exports.UrlItem = UrlItem;
//# sourceMappingURL=urlItem.js.map