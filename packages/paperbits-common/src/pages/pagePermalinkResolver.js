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
exports.PagePermalinkResolver = void 0;
const permalinks_1 = require("../permalinks");
const pagesPath = "pages/";
class PagePermalinkResolver {
    constructor(pageService, localeService) {
        this.pageService = pageService;
        this.localeService = localeService;
    }
    canHandleTarget(targetKey) {
        return targetKey.startsWith(pagesPath);
    }
    getUrlByTargetKey(targetKey, locale) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!targetKey) {
                throw new Error("Target key cannot be null or empty.");
            }
            if (!targetKey.startsWith(pagesPath)) {
                return null;
            }
            const defaultLocale = yield this.localeService.getDefaultLocale();
            let pageContract = yield this.pageService.getPageByKey(targetKey, locale);
            if (!pageContract) {
                pageContract = yield this.pageService.getPageByKey(targetKey, defaultLocale);
                if (!pageContract) {
                    console.warn(`Could not find content item with key ${targetKey}.`);
                    return null;
                }
            }
            else if (locale && locale !== defaultLocale) {
                pageContract.permalink = `/${locale}${pageContract.permalink}`;
            }
            return pageContract.permalink;
        });
    }
    getHyperlink(pageContract, hyperlinkContract) {
        return __awaiter(this, void 0, void 0, function* () {
            const hyperlinkModel = new permalinks_1.HyperlinkModel();
            hyperlinkModel.targetKey = pageContract.key;
            hyperlinkModel.href = pageContract.permalink;
            hyperlinkModel.title = pageContract.title || pageContract.permalink;
            if (hyperlinkContract) {
                hyperlinkModel.target = hyperlinkContract.target;
                hyperlinkModel.anchor = hyperlinkContract.anchor;
                hyperlinkModel.anchorName = hyperlinkContract.anchorName;
            }
            return hyperlinkModel;
        });
    }
    getHyperlinkFromContract(hyperlinkContract, locale) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!hyperlinkContract.targetKey) {
                throw new Error("Target key cannot be null or empty.");
            }
            if (!hyperlinkContract.targetKey.startsWith(pagesPath)) {
                return null;
            }
            let hyperlinkModel;
            if (hyperlinkContract.targetKey) {
                const pageContract = yield this.pageService.getPageByKey(hyperlinkContract.targetKey, locale);
                if (pageContract) {
                    return this.getHyperlink(pageContract, hyperlinkContract);
                }
            }
            hyperlinkModel = new permalinks_1.HyperlinkModel();
            hyperlinkModel.title = "Unset link";
            hyperlinkModel.target = hyperlinkContract.target;
            hyperlinkModel.targetKey = hyperlinkContract.targetKey;
            hyperlinkModel.href = "#";
            hyperlinkModel.anchor = hyperlinkContract.anchor;
            hyperlinkModel.anchorName = hyperlinkContract.anchorName;
            return hyperlinkModel;
        });
    }
    getHyperlinkByTargetKey(targetKey, locale) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!targetKey) {
                throw new Error("Target key cannot be null or empty.");
            }
            if (!targetKey.startsWith(pagesPath)) {
                return null;
            }
            const defaultLocale = yield this.localeService.getDefaultLocale();
            let pageContract = yield this.pageService.getPageByKey(targetKey, locale);
            if (!pageContract) {
                pageContract = yield this.pageService.getPageByKey(targetKey, defaultLocale);
                if (!pageContract) {
                    console.warn(`Could create hyperlink for target with key ${targetKey} in locale ${locale}.`);
                    return null;
                }
            }
            else if (locale && locale !== defaultLocale) {
                pageContract.permalink = `/${locale}${pageContract.permalink}`;
            }
            const hyperlink = yield this.getHyperlink(pageContract);
            return hyperlink;
        });
    }
    getContentByPermalink(permalink, locale) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!permalink) {
                throw new Error(`Parameter "permalink" not specified.`);
            }
            let pageContract = yield this.pageService.getPageByPermalink(permalink, locale);
            if (!pageContract) {
                const defaultLocale = yield this.localeService.getDefaultLocale();
                pageContract = yield this.pageService.getPageByPermalink(permalink, defaultLocale);
                if (!pageContract) {
                    return null;
                }
            }
            const pageContent = yield this.pageService.getPageContent(pageContract.key);
            return pageContent;
        });
    }
    getContentItemByPermalink(permalink, locale) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!permalink) {
                throw new Error(`Parameter "permalink" not specified.`);
            }
            const pageContract = yield this.pageService.getPageByPermalink(permalink, locale);
            return pageContract;
        });
    }
}
exports.PagePermalinkResolver = PagePermalinkResolver;
//# sourceMappingURL=pagePermalinkResolver.js.map