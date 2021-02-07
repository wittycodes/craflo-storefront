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
exports.BlogService = void 0;
const Utils = require("../utils");
const persistence_1 = require("../persistence");
const blogPostsPath = "posts";
const documentsPath = "files";
const templateBlockKey = "blocks/new-page-template";
class BlogService {
    constructor(objectStorage, blockService) {
        this.objectStorage = objectStorage;
        this.blockService = blockService;
    }
    getBlogPostByPermalink(permalink) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!permalink) {
                throw new Error(`Parameter "permalink" not specified.`);
            }
            const query = persistence_1.Query
                .from()
                .where("permalink", persistence_1.Operator.equals, permalink);
            const pageOfObjects = yield this.objectStorage.searchObjects(blogPostsPath, query);
            const result = pageOfObjects.value;
            const posts = Object.values(result);
            return posts.length > 0 ? posts[0] : null;
        });
    }
    getBlogPostByKey(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.objectStorage.getObject(key);
        });
    }
    search(pattern) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = persistence_1.Query
                .from()
                .where("title", persistence_1.Operator.contains, pattern)
                .orderBy("title");
            const pageOfObjects = yield this.objectStorage.searchObjects(blogPostsPath, query);
            const result = pageOfObjects.value;
            return result;
        });
    }
    deleteBlogPost(blogPost) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteContentPromise = this.objectStorage.deleteObject(blogPost.contentKey);
            const deleteBlogPostPromise = this.objectStorage.deleteObject(blogPost.key);
            yield Promise.all([deleteContentPromise, deleteBlogPostPromise]);
        });
    }
    createBlogPost(url, title, description, keywords) {
        return __awaiter(this, void 0, void 0, function* () {
            const identifier = Utils.guid();
            const postKey = `${blogPostsPath}/${identifier}`;
            const contentKey = `${documentsPath}/${identifier}`;
            const post = {
                key: postKey,
                title: title,
                description: description,
                keywords: keywords,
                permalink: url,
                contentKey: contentKey
            };
            yield this.objectStorage.addObject(postKey, post);
            const template = yield this.blockService.getBlockContent(templateBlockKey);
            yield this.objectStorage.addObject(contentKey, template);
            return post;
        });
    }
    updateBlogPost(blogPost) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.objectStorage.updateObject(blogPost.key, blogPost);
        });
    }
    getBlogPostContent(postKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = yield this.getBlogPostByKey(postKey);
            return yield this.objectStorage.getObject(page.contentKey);
        });
    }
    updateBlogPostContent(postKey, content) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!postKey) {
                throw new Error(`Parameter "postKey" not specified.`);
            }
            if (!content) {
                throw new Error(`Parameter "content" not specified.`);
            }
            const page = yield this.getBlogPostByKey(postKey);
            this.objectStorage.updateObject(page.contentKey, content);
        });
    }
}
exports.BlogService = BlogService;
//# sourceMappingURL=blogService.js.map