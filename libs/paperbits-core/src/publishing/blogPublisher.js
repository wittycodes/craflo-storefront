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
exports.BlogPublisher = void 0;
const Utils = require("@paperbits/common/utils");
class BlogPublisher {
    constructor(blogService, siteService, outputBlobStorage, mediaService) {
        this.blogService = blogService;
        this.siteService = siteService;
        this.outputBlobStorage = outputBlobStorage;
        this.mediaService = mediaService;
        this.publish = this.publish.bind(this);
        this.renderBlogPost = this.renderBlogPost.bind(this);
    }
    renderBlogPost(post, settings, iconFile) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Publishing blog post ${post.title}...`);
            const templateDocument = null;
            let resourceUri;
            let htmlContent;
            const buildContentPromise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            }));
            yield buildContentPromise;
            const contentBytes = Utils.stringToUnit8Array(htmlContent);
            if (!resourceUri || resourceUri === "/blog") {
                resourceUri = "/blog/index.html";
            }
            else {
                if (!resourceUri.substr((~-resourceUri.lastIndexOf(".") >>> 0) + 2)) {
                    resourceUri = `/${resourceUri}/index.html`;
                }
            }
            return { name: resourceUri, bytes: contentBytes };
        });
    }
    publish() {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield this.blogService.search("");
            const results = [];
            const settings = yield this.siteService.getSettings();
            const siteSettings = settings.site;
            let iconFile;
            if (siteSettings && siteSettings.faviconSourceKey) {
                iconFile = yield this.mediaService.getMediaByKey(siteSettings.faviconSourceKey);
            }
            const renderAndUpload = (post) => __awaiter(this, void 0, void 0, function* () {
                const pageRenderResult = yield this.renderBlogPost(post, siteSettings, iconFile);
                yield this.outputBlobStorage.uploadBlob(pageRenderResult.name, pageRenderResult.bytes, "text/html");
            });
            for (const post of posts) {
                results.push(renderAndUpload(post));
            }
            yield Promise.all(results);
        });
    }
}
exports.BlogPublisher = BlogPublisher;
//# sourceMappingURL=blogPublisher.js.map