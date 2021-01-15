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
exports.SitemapBuilder = void 0;
class SitemapBuilder {
    constructor(siteService) {
        this.siteService = siteService;
        this.permalinks = [];
    }
    appendPermalink(permalink) {
        this.permalinks.push(permalink);
    }
    buildSitemap() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const settings = yield this.siteService.getSettings();
                const siteSettings = settings.site;
                const hostname = siteSettings === null || siteSettings === void 0 ? void 0 : siteSettings.hostname;
                const baseUrl = hostname ? `https://${hostname}` : "";
                const now = new Date();
                const dateTimeISO = now.toISOString();
                const urls = this.permalinks.map(permalink => `<url><loc>${baseUrl}${permalink}</loc><lastmod>${dateTimeISO}</lastmod><changefreq>daily</changefreq></url>`).join("");
                return `<?xml version="1.0" encoding="utf-8"?><urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="https://www.w3.org/1999/xhtml">${urls}</urlset>`;
            }
            catch (error) {
                throw new Error(`Unable to build sitemap: ${error.stack || error.message}`);
            }
        });
    }
}
exports.SitemapBuilder = SitemapBuilder;
//# sourceMappingURL=sitemapBuilder.js.map