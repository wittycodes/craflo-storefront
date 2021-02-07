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
exports.PageService = void 0;
const Utils = require("../utils");
const Constants = require("../constants");
const persistence_1 = require("../persistence");
const documentsPath = "files";
const templateBlockKey = "blocks/new-page-template";
class PageService {
    constructor(objectStorage, blockService, localeService) {
        this.objectStorage = objectStorage;
        this.blockService = blockService;
        this.localeService = localeService;
        this.pagesPath = "pages";
    }
    copyMetadata(sourceMetadata, targetMetadata) {
        if (!sourceMetadata) {
            throw new Error(`Parameter "sourceMetadata" not specified.`);
        }
        if (!targetMetadata) {
            throw new Error(`Parameter "targetMetadata" not specified.`);
        }
        targetMetadata.title = sourceMetadata.title;
        targetMetadata.description = sourceMetadata.description;
        targetMetadata.keywords = sourceMetadata.keywords;
        targetMetadata.permalink = sourceMetadata.permalink;
        targetMetadata.jsonLd = sourceMetadata.jsonLd;
        targetMetadata.socialShareData = sourceMetadata.socialShareData;
        return targetMetadata;
    }
    localizedContractToContract(defaultLocale, currentLocale, requestedLocale, localizedPageContract) {
        const locales = localizedPageContract[Constants.localePrefix];
        const pageMetadata = (requestedLocale
            ? locales[requestedLocale]
            : locales[currentLocale])
            || this.copyMetadata(locales[defaultLocale], {});
        if (!pageMetadata) {
            return null;
        }
        const pageContract = Object.assign({ key: localizedPageContract.key }, pageMetadata);
        return pageContract;
    }
    getPageByPermalink(permalink, requestedLocale = null) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!permalink) {
                throw new Error(`Parameter "permalink" not specified.`);
            }
            const defaultLocale = yield this.localeService.getDefaultLocale();
            const currentLocale = yield this.localeService.getCurrentLocale();
            const permalinkProperty = `${Constants.localePrefix}/${defaultLocale}/permalink`;
            const query = persistence_1.Query
                .from()
                .where(permalinkProperty, persistence_1.Operator.equals, permalink);
            try {
                const pageOfObjects = yield this.objectStorage.searchObjects(this.pagesPath, query);
                const result = pageOfObjects.value;
                if (!result) {
                    return null;
                }
                const pages = Object.values(result);
                if (pages.length === 0) {
                    return null;
                }
                const firstPage = pages[0];
                return this.localizedContractToContract(defaultLocale, currentLocale, requestedLocale, firstPage);
            }
            catch (error) {
                throw new Error(`Unable to search pages: ${error.stack || error.message}`);
            }
        });
    }
    getPageByKey(key, requestedLocale) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!key) {
                throw new Error(`Parameter "key" not specified.`);
            }
            const pageContract = yield this.objectStorage.getObject(key);
            if (!pageContract) {
                return null;
            }
            const defaultLocale = yield this.localeService.getDefaultLocale();
            const currentLocale = yield this.localeService.getCurrentLocale();
            return this.localizedContractToContract(defaultLocale, currentLocale, requestedLocale, pageContract);
        });
    }
    convertPage(localizedPage, defaultLocale, searchLocale, requestedLocale) {
        const resultPage = {
            value: localizedPage.value.map(x => this.localizedContractToContract(defaultLocale, searchLocale, requestedLocale, x)),
            takeNext: () => __awaiter(this, void 0, void 0, function* () {
                const nextLocalizedPage = yield localizedPage.takeNext();
                return this.convertPage(nextLocalizedPage, defaultLocale, searchLocale, requestedLocale);
            })
        };
        if (!localizedPage.takeNext) {
            resultPage.takeNext = null;
        }
        return resultPage;
    }
    search(query, requestedLocale) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!query) {
                throw new Error(`Parameter "query" not specified.`);
            }
            const defaultLocale = yield this.localeService.getDefaultLocale();
            const currentLocale = yield this.localeService.getCurrentLocale();
            const searchLocale = requestedLocale || currentLocale;
            const localizedQuery = Utils.localizeQuery(query, searchLocale);
            try {
                const pageOfResults = yield this.objectStorage.searchObjects(this.pagesPath, localizedQuery);
                return this.convertPage(pageOfResults, defaultLocale, searchLocale, requestedLocale);
            }
            catch (error) {
                throw new Error(`Unable to search pages: ${error.stack || error.message}`);
            }
        });
    }
    deletePage(page) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!page) {
                throw new Error(`Parameter "page" not specified.`);
            }
            try {
                const localizedPageContract = yield this.objectStorage.getObject(page.key);
                if (localizedPageContract.locales) {
                    const contentKeys = Object.values(localizedPageContract.locales).map(x => x.contentKey);
                    for (const contentKey of contentKeys) {
                        yield this.objectStorage.deleteObject(contentKey);
                    }
                }
                yield this.objectStorage.deleteObject(page.key);
            }
            catch (error) {
                throw new Error(`Unable to delete page ${page.title}: ${error.stack || error.message}`);
            }
        });
    }
    createPage(permalink, title, description, keywords) {
        return __awaiter(this, void 0, void 0, function* () {
            const locale = yield this.localeService.getDefaultLocale();
            const identifier = Utils.guid();
            const pageKey = `${this.pagesPath}/${identifier}`;
            const contentKey = `${documentsPath}/${identifier}`;
            const localizedPage = {
                key: pageKey,
                locales: {
                    [locale]: {
                        title: title,
                        description: description,
                        keywords: keywords,
                        permalink: permalink,
                        contentKey: contentKey
                    }
                }
            };
            yield this.objectStorage.addObject(pageKey, localizedPage);
            const template = yield this.blockService.getBlockContent(templateBlockKey);
            template["key"] = contentKey;
            yield this.objectStorage.addObject(contentKey, template);
            const pageContent = {
                key: pageKey,
                title: title,
                description: description,
                keywords: keywords,
                permalink: permalink,
                contentKey: contentKey
            };
            return pageContent;
        });
    }
    updatePage(page, requestedLocale) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!page) {
                throw new Error(`Parameter "page" not specified.`);
            }
            if (!requestedLocale) {
                requestedLocale = yield this.localeService.getCurrentLocale();
            }
            const pageContract = yield this.objectStorage.getObject(page.key);
            if (!pageContract) {
                throw new Error(`Could not update page. Page with key "${page.key}" doesn't exist.`);
            }
            const existingLocaleMetadata = pageContract.locales[requestedLocale] || {};
            pageContract.locales[requestedLocale] = this.copyMetadata(page, existingLocaleMetadata);
            yield this.objectStorage.updateObject(page.key, pageContract);
        });
    }
    getPageContent(pageKey, requestedLocale) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!pageKey) {
                throw new Error(`Parameter "pageKey" not specified.`);
            }
            if (!requestedLocale) {
                requestedLocale = yield this.localeService.getCurrentLocale();
            }
            const defaultLocale = yield this.localeService.getDefaultLocale();
            const localizedPageContract = yield this.objectStorage.getObject(pageKey);
            let pageMetadata = localizedPageContract.locales[requestedLocale];
            if (!pageMetadata) {
                pageMetadata = localizedPageContract.locales[defaultLocale];
            }
            let pageContent;
            if (pageMetadata.contentKey) {
                pageContent = yield this.objectStorage.getObject(pageMetadata.contentKey);
            }
            else {
                const pageDefaultLocaleMetadata = localizedPageContract.locales[defaultLocale];
                pageContent = yield this.objectStorage.getObject(pageDefaultLocaleMetadata.contentKey);
            }
            return pageContent;
        });
    }
    updatePageContent(pageKey, content, requestedLocale) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!pageKey) {
                throw new Error(`Parameter "pageKey" not specified.`);
            }
            if (!content) {
                throw new Error(`Parameter "content" not specified.`);
            }
            const localizedPageContract = yield this.objectStorage.getObject(pageKey);
            if (!localizedPageContract) {
                throw new Error(`Page with key "${pageKey}" not found.`);
            }
            if (!requestedLocale) {
                requestedLocale = yield this.localeService.getCurrentLocale();
            }
            let pageMetadata = localizedPageContract.locales[requestedLocale];
            if (!pageMetadata) {
                const defaultLocale = yield this.localeService.getDefaultLocale();
                const defaultPageMetadata = localizedPageContract.locales[defaultLocale];
                const identifier = Utils.guid();
                pageMetadata = this.copyMetadata(defaultPageMetadata, {
                    contentKey: `${documentsPath}/${identifier}`
                });
                localizedPageContract.locales[requestedLocale] = pageMetadata;
                yield this.objectStorage.updateObject(pageKey, localizedPageContract);
            }
            else if (!pageMetadata.contentKey) {
                const identifier = Utils.guid();
                pageMetadata.contentKey = `${documentsPath}/${identifier}`;
                yield this.objectStorage.updateObject(pageKey, pageMetadata);
            }
            yield this.objectStorage.updateObject(pageMetadata.contentKey, content);
        });
    }
}
exports.PageService = PageService;
//# sourceMappingURL=pageService.js.map