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
exports.LinkedDataHtmlPagePublisherPlugin = void 0;
class LinkedDataHtmlPagePublisherPlugin {
    constructor(siteService) {
        this.siteService = siteService;
    }
    apply(document, page) {
        return __awaiter(this, void 0, void 0, function* () {
            let linkedDataObject = page.linkedData;
            if (page.permalink !== "/" && !linkedDataObject) {
                return;
            }
            if (!linkedDataObject) {
                const settings = yield this.siteService.getSettings();
                const siteSettings = settings.site;
                linkedDataObject = {
                    "@context": "http://www.schema.org",
                    "@type": "Organization",
                    "name": siteSettings.title,
                    "description": siteSettings.description
                };
            }
            const structuredDataScriptElement = document.createElement("script");
            structuredDataScriptElement.setAttribute("type", "application/ld+json");
            structuredDataScriptElement.innerHTML = JSON.stringify(linkedDataObject);
            document.head.appendChild(structuredDataScriptElement);
        });
    }
}
exports.LinkedDataHtmlPagePublisherPlugin = LinkedDataHtmlPagePublisherPlugin;
//# sourceMappingURL=linkedDataHtmlPagePublisherPlugin.js.map