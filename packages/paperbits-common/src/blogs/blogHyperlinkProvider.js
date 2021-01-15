"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogHyperlinkProvider = void 0;
const hyperlinkModel_1 = require("../permalinks/hyperlinkModel");
class BlogHyperlinkProvider {
    constructor() {
        this.name = "Blog posts";
        this.componentName = "blog-selector";
        this.iconClass = "paperbits-icon paperbits-single-content-03";
    }
    canHandleHyperlink(contentItemKey) {
        return contentItemKey.startsWith("posts/");
    }
    getHyperlinkFromResource(post) {
        const hyperlinkModel = new hyperlinkModel_1.HyperlinkModel();
        hyperlinkModel.title = post.title;
        hyperlinkModel.targetKey = post.key;
        hyperlinkModel.href = post.permalink;
        return hyperlinkModel;
    }
}
exports.BlogHyperlinkProvider = BlogHyperlinkProvider;
//# sourceMappingURL=blogHyperlinkProvider.js.map