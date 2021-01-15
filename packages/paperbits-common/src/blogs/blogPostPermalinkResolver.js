"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogPostPermalinkResolver = void 0;
const permalinks_1 = require("../permalinks");
const blogPostsPath = "blogPosts/";
class BlogPostPermalinkResolver {
    constructor(blogPostService) {
        this.blogPostService = blogPostService;
    }
    canHandleTarget(targetKey) {
        return targetKey.startsWith(blogPostsPath);
    }
    getUrlByTargetKey(targetKey, locale) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!targetKey) {
                throw new Error("Target key cannot be null or empty.");
            }
            if (!targetKey.startsWith(blogPostsPath)) {
                return null;
            }
            const contentItem = yield this.blogPostService.getBlogPostByKey(targetKey, locale);
            if (!contentItem) {
                throw new Error(`Could not find permalink by key ${targetKey}.`);
            }
            return contentItem.permalink;
        });
    }
    getHyperlink(blogPostContract, target = "_self") {
        return __awaiter(this, void 0, void 0, function* () {
            const hyperlinkModel = new permalinks_1.HyperlinkModel();
            hyperlinkModel.targetKey = blogPostContract.key;
            hyperlinkModel.href = blogPostContract.permalink;
            hyperlinkModel.title = blogPostContract.title || blogPostContract.permalink;
            hyperlinkModel.target = target;
            hyperlinkModel.targetKey = blogPostContract.key;
            return hyperlinkModel;
        });
    }
    getHyperlinkFromContract(hyperlinkContract, locale) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!hyperlinkContract.targetKey) {
                throw new Error("Target key cannot be null or empty.");
            }
            if (!hyperlinkContract.targetKey.startsWith("blogPosts/")) {
                return null;
            }
            let hyperlinkModel;
            if (hyperlinkContract.targetKey) {
                const blogPostContract = yield this.blogPostService.getBlogPostByKey(hyperlinkContract.targetKey, locale);
                if (blogPostContract) {
                    return this.getHyperlink(blogPostContract, hyperlinkContract.target);
                }
            }
            hyperlinkModel = new permalinks_1.HyperlinkModel();
            hyperlinkModel.title = "Unset link";
            hyperlinkModel.target = hyperlinkContract.target;
            hyperlinkModel.targetKey = hyperlinkContract.targetKey;
            hyperlinkModel.href = "#";
            hyperlinkModel.anchor = hyperlinkContract.anchor;
            return hyperlinkModel;
        });
    }
    getHyperlinkByTargetKey(targetKey, locale) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!targetKey) {
                throw new Error("Target key cannot be null or empty.");
            }
            if (!targetKey.startsWith(blogPostsPath)) {
                return null;
            }
            const contentItem = yield this.blogPostService.getBlogPostByKey(targetKey, locale);
            if (!contentItem) {
                return null;
            }
            const hyperlink = yield this.getHyperlink(contentItem);
            return hyperlink;
        });
    }
    getContentByPermalink(permalink, locale) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!permalink) {
                throw new Error(`Parameter "permalink" not specified.`);
            }
            const blogPostContract = yield this.blogPostService.getBlogPostByPermalink(permalink, locale);
            const blogPostContent = yield this.blogPostService.getBlogPostContent(blogPostContract.key);
            return blogPostContent;
        });
    }
    getContentItemByPermalink(permalink, locale) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!permalink) {
                throw new Error(`Parameter "permalink" not specified.`);
            }
            const blogPostContract = yield this.blogPostService.getBlogPostByPermalink(permalink, locale);
            return blogPostContract;
        });
    }
}
exports.BlogPostPermalinkResolver = BlogPostPermalinkResolver;
//# sourceMappingURL=blogPostPermalinkResolver.js.map