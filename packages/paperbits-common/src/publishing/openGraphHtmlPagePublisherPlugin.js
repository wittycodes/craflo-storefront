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
exports.OpenGraphHtmlPagePublisherPlugin = void 0;
class OpenGraphHtmlPagePublisherPlugin {
    constructor(mediaService) {
        this.mediaService = mediaService;
    }
    appendMetaTag(document, property, content) {
        const element = document.createElement("meta");
        element.setAttribute("property", property);
        element.setAttribute("content", content);
        document.head.appendChild(element);
    }
    apply(document, page) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
        return __awaiter(this, void 0, void 0, function* () {
            if ((_a = page.openGraph) === null || _a === void 0 ? void 0 : _a.type) {
                this.appendMetaTag(document, "og:type", page.openGraph.type);
            }
            if ((_b = page.openGraph) === null || _b === void 0 ? void 0 : _b.siteName) {
                this.appendMetaTag(document, "og:site_name", page.openGraph.siteName);
            }
            const title = ((_c = page.openGraph) === null || _c === void 0 ? void 0 : _c.title) || page.title;
            if (title) {
                this.appendMetaTag(document, "og:title", title);
            }
            const description = ((_d = page.openGraph) === null || _d === void 0 ? void 0 : _d.description) || page.description;
            if (description) {
                this.appendMetaTag(document, "og:description", description);
            }
            const url = ((_e = page.openGraph) === null || _e === void 0 ? void 0 : _e.url) || page.url;
            if (url) {
                this.appendMetaTag(document, "og:url", url);
            }
            const imageSourceKey = ((_g = (_f = page.openGraph) === null || _f === void 0 ? void 0 : _f.image) === null || _g === void 0 ? void 0 : _g.sourceKey) || ((_j = (_h = page.socialShareData) === null || _h === void 0 ? void 0 : _h.image) === null || _j === void 0 ? void 0 : _j.sourceKey);
            if (!imageSourceKey) {
                return;
            }
            const media = yield this.mediaService.getMediaByKey(imageSourceKey);
            if (!media) {
                return;
            }
            const baseUrl = page.siteHostName ? `https://${page.siteHostName}` : "";
            this.appendMetaTag(document, "og:image", baseUrl + media.permalink);
            const imageWidth = ((_l = (_k = page.openGraph) === null || _k === void 0 ? void 0 : _k.image) === null || _l === void 0 ? void 0 : _l.width) || ((_o = (_m = page.socialShareData) === null || _m === void 0 ? void 0 : _m.image) === null || _o === void 0 ? void 0 : _o.width);
            const imageHeight = ((_q = (_p = page.openGraph) === null || _p === void 0 ? void 0 : _p.image) === null || _q === void 0 ? void 0 : _q.height) || ((_s = (_r = page.socialShareData) === null || _r === void 0 ? void 0 : _r.image) === null || _s === void 0 ? void 0 : _s.height);
            if (imageWidth && imageHeight) {
                this.appendMetaTag(document, "og:image:width", imageWidth.toString());
                this.appendMetaTag(document, "og:image:height", imageHeight.toString());
            }
        });
    }
}
exports.OpenGraphHtmlPagePublisherPlugin = OpenGraphHtmlPagePublisherPlugin;
//# sourceMappingURL=openGraphHtmlPagePublisherPlugin.js.map