"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogPostItem = void 0;
const ko = require("knockout");
const permalinks_1 = require("@paperbits/common/permalinks");
class BlogPostItem {
    constructor(blogPost) {
        this.contentKey = blogPost.contentKey;
        this.key = blogPost.key;
        this.title = ko.observable(blogPost.title);
        this.description = ko.observable(blogPost.description);
        this.keywords = ko.observable(blogPost.keywords);
        this.permalink = ko.observable(blogPost.permalink);
        this.hasFocus = ko.observable(false);
    }
    getHyperlink() {
        const hyperlinkModel = new permalinks_1.HyperlinkModel();
        hyperlinkModel.title = this.title();
        hyperlinkModel.targetKey = this.key;
        hyperlinkModel.href = this.permalink();
        return hyperlinkModel;
    }
    toBlogPost() {
        return {
            key: this.key,
            title: this.title(),
            description: this.description(),
            keywords: this.keywords(),
            contentKey: this.contentKey,
            permalink: this.permalink()
        };
    }
}
exports.BlogPostItem = BlogPostItem;
//# sourceMappingURL=blogPostItem.js.map