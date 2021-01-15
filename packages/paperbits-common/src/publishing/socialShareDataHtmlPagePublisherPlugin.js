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
exports.SocialShareDataHtmlPagePublisherPlugin = void 0;
class SocialShareDataHtmlPagePublisherPlugin {
    constructor(mediaService) {
        this.mediaService = mediaService;
    }
    appendLink(document, rel, href) {
        const canonicalLinkElement = document.createElement("link");
        canonicalLinkElement.setAttribute("rel", rel);
        canonicalLinkElement.setAttribute("href", href);
        document.head.appendChild(canonicalLinkElement);
    }
    appendMetaTag(document, name, content) {
        const element = document.createElement("meta");
        element.setAttribute("name", name);
        element.setAttribute("content", content);
        document.head.appendChild(element);
    }
    apply(document, page) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_b = (_a = page.socialShareData) === null || _a === void 0 ? void 0 : _a.image) === null || _b === void 0 ? void 0 : _b.sourceKey)) {
                return;
            }
            const media = yield this.mediaService.getMediaByKey(page.socialShareData.image.sourceKey);
            if (!media) {
                return;
            }
            const baseUrl = page.siteHostName ? `https://${page.siteHostName}` : "";
            this.appendLink(document, "image_src", baseUrl + media.permalink);
            this.appendMetaTag(document, "twitter:card", "summary_large_image");
            this.appendMetaTag(document, "twitter:title", page.socialShareData.title || page.title);
            this.appendMetaTag(document, "twitter:description", page.socialShareData.description || page.description);
            this.appendMetaTag(document, "twitter:image", baseUrl + media.permalink);
            const imageWidth = (_d = (_c = page.socialShareData) === null || _c === void 0 ? void 0 : _c.image) === null || _d === void 0 ? void 0 : _d.width;
            const imageHeight = (_f = (_e = page.socialShareData) === null || _e === void 0 ? void 0 : _e.image) === null || _f === void 0 ? void 0 : _f.height;
            if (imageWidth && imageHeight) {
                this.appendMetaTag(document, "twitter:image:width", imageWidth.toString());
                this.appendMetaTag(document, "twitter:image:height", imageHeight.toString());
            }
        });
    }
}
exports.SocialShareDataHtmlPagePublisherPlugin = SocialShareDataHtmlPagePublisherPlugin;
//# sourceMappingURL=socialShareDataHtmlPagePublisherPlugin.js.map