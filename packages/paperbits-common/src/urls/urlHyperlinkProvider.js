"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlHyperlinkProvider = void 0;
const hyperlinkModel_1 = require("../permalinks/hyperlinkModel");
class UrlHyperlinkProvider {
    constructor() {
        this.name = "Web URL";
        this.componentName = "url-selector";
        this.iconClass = "paperbits-icon paperbits-link-69-2";
    }
    canHandleHyperlink(contentItemKey) {
        return contentItemKey.startsWith("urls/");
    }
    getHyperlinkFromResource(url) {
        const hyperlinkModel = new hyperlinkModel_1.HyperlinkModel();
        hyperlinkModel.title = url.title;
        hyperlinkModel.targetKey = url.key;
        hyperlinkModel.href = url.permalink;
        return hyperlinkModel;
    }
}
exports.UrlHyperlinkProvider = UrlHyperlinkProvider;
//# sourceMappingURL=urlHyperlinkProvider.js.map