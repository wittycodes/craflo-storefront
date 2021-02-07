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
exports.HtmlPagePublisher = void 0;
class HtmlPagePublisher {
    constructor(htmlDocumentProvider, htmlPagePublisherPlugins, htmlPageOptimizer) {
        this.htmlDocumentProvider = htmlDocumentProvider;
        this.htmlPagePublisherPlugins = htmlPagePublisherPlugins;
        this.htmlPageOptimizer = htmlPageOptimizer;
    }
    appendMetaTag(document, name, content) {
        const element = document.createElement("meta");
        element.setAttribute("name", name);
        element.setAttribute("content", content);
        document.head.appendChild(element);
    }
    appendStyleLink(document, styleSheetUrl) {
        const element = document.createElement("link");
        element.setAttribute("href", styleSheetUrl);
        element.setAttribute("rel", "stylesheet");
        element.setAttribute("type", "text/css");
        document.head.appendChild(element);
    }
    appendFaviconLink(permalink) {
        const faviconLinkElement = document.createElement("link");
        faviconLinkElement.setAttribute("rel", "shortcut icon");
        faviconLinkElement.setAttribute("href", permalink);
        document.head.insertAdjacentElement("afterbegin", faviconLinkElement);
    }
    renderHtml(page, overridePlugins) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const document = this.htmlDocumentProvider.createDocument(page.template);
                document.title = page.title;
                if (page.faviconPermalink) {
                    this.appendFaviconLink(page.faviconPermalink);
                }
                if (page.description) {
                    this.appendMetaTag(document, "description", page.description);
                }
                if (page.keywords) {
                    this.appendMetaTag(document, "keywords", page.keywords);
                }
                if (page.author) {
                    this.appendMetaTag(document, "author", page.author);
                }
                page.styleReferences.forEach(reference => {
                    this.appendStyleLink(document, reference);
                });
                if (overridePlugins) {
                    for (const plugin of overridePlugins) {
                        yield plugin.apply(document, page);
                    }
                }
                else {
                    for (const plugin of this.htmlPagePublisherPlugins) {
                        yield plugin.apply(document, page);
                    }
                }
                const htmlContent = "<!DOCTYPE html>" + document.documentElement.outerHTML;
                const optimizedHtmlContent = yield this.htmlPageOptimizer.optimize(htmlContent);
                return optimizedHtmlContent;
            }
            catch (error) {
                throw new Error(`Unable to render page: ${error.stack}`);
            }
        });
    }
}
exports.HtmlPagePublisher = HtmlPagePublisher;
//# sourceMappingURL=htmlPagePublisher.js.map