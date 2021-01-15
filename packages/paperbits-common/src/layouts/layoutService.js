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
exports.LayoutService = void 0;
const Utils = require("../utils");
const Constants = require("../constants");
const persistence_1 = require("../persistence");
const layoutTemplate_1 = require("./layoutTemplate");
const documentsPath = "files";
class LayoutService {
    constructor(objectStorage, localeService) {
        this.objectStorage = objectStorage;
        this.localeService = localeService;
        this.layoutsPath = "layouts";
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
        targetMetadata.permalinkTemplate = sourceMetadata.permalinkTemplate;
        return targetMetadata;
    }
    localizedContractToContract(defaultLocale, currentLocale, requestedLocale, localizedPageContract) {
        const locales = localizedPageContract[Constants.localePrefix];
        const metadata = (requestedLocale
            ? locales[requestedLocale]
            : locales[currentLocale])
            || this.copyMetadata(locales[defaultLocale], {});
        if (!metadata) {
            return null;
        }
        const contract = Object.assign({ key: localizedPageContract.key }, metadata);
        return contract;
    }
    getLayoutByKey(key, requestedLocale) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!key) {
                throw new Error(`Parameter "key" not specified.`);
            }
            const layoutContract = yield this.objectStorage.getObject(key);
            if (!layoutContract) {
                return null;
            }
            const defaultLocale = yield this.localeService.getDefaultLocale();
            const currentLocale = yield this.localeService.getCurrentLocale();
            return this.localizedContractToContract(defaultLocale, currentLocale, requestedLocale, layoutContract);
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
                const pageOfResults = yield this.objectStorage.searchObjects(this.layoutsPath, localizedQuery);
                return this.convertPage(pageOfResults, defaultLocale, searchLocale, requestedLocale);
            }
            catch (error) {
                throw new Error(`Unable to search pages: ${error.stack || error.message}`);
            }
        });
    }
    deleteLayout(layout) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!layout) {
                throw new Error(`Parameter "layout" not specified.`);
            }
            const localizedLayoutContract = yield this.objectStorage.getObject(layout.key);
            if (localizedLayoutContract.locales) {
                const contentKeys = Object.values(localizedLayoutContract.locales).map(x => x.contentKey);
                for (const contentKey of contentKeys) {
                    yield this.objectStorage.deleteObject(contentKey);
                }
            }
            yield this.objectStorage.deleteObject(layout.key);
        });
    }
    createLayout(title, description, permalinkTemplate) {
        return __awaiter(this, void 0, void 0, function* () {
            const locale = yield this.localeService.getDefaultLocale();
            const identifier = Utils.guid();
            const layoutKey = `${this.layoutsPath}/${identifier}`;
            const contentKey = `${documentsPath}/${identifier}`;
            const localizedLayout = {
                key: layoutKey,
                locales: {
                    [locale]: {
                        title: title,
                        description: description,
                        permalinkTemplate: permalinkTemplate,
                        contentKey: contentKey
                    }
                }
            };
            yield this.objectStorage.addObject(layoutKey, localizedLayout);
            yield this.objectStorage.addObject(contentKey, layoutTemplate_1.layoutTemplate);
            const layoutContent = {
                key: layoutKey,
                title: title,
                description: description,
                permalinkTemplate: permalinkTemplate,
                contentKey: contentKey
            };
            return layoutContent;
        });
    }
    updateLayout(layout, requestedLocale) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!layout) {
                throw new Error(`Parameter "layout" not specified.`);
            }
            if (!requestedLocale) {
                requestedLocale = yield this.localeService.getCurrentLocale();
            }
            const layoutContract = yield this.objectStorage.getObject(layout.key);
            if (!layoutContract) {
                throw new Error(`Could not update layout. Layout with key "${layout.key}" doesn't exist.`);
            }
            const existingLocaleMetadata = layoutContract.locales[requestedLocale] || {};
            layoutContract.locales[requestedLocale] = this.copyMetadata(layout, existingLocaleMetadata);
            yield this.objectStorage.updateObject(layout.key, layoutContract);
        });
    }
    getLayoutByPermalinkTemplate(permalinkTemplate) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!permalinkTemplate) {
                throw new Error(`Parameter "permalinkTemplate" not specified.`);
            }
            const defaultLocale = yield this.localeService.getDefaultLocale();
            const query = persistence_1.Query
                .from()
                .where(`locales/${defaultLocale}/permalinkTemplate`, persistence_1.Operator.equals, permalinkTemplate);
            const pageOfObjects = yield this.objectStorage.searchObjects(this.layoutsPath, query);
            const result = pageOfObjects.value;
            const layouts = Object.keys(result).map(key => result[key]);
            return layouts.length > 0 ? layouts[0] : null;
        });
    }
    sort(patterns) {
        const result = [];
        function compare(a, b) {
            if (a.score < b.score) {
                return 1;
            }
            if (a.score > b.score) {
                return -1;
            }
            return 0;
        }
        for (const pattern of patterns) {
            const segments = pattern.split("/").filter(x => !!x);
            let score = 0;
            for (let i = 0; i < segments.length; i++) {
                const segment = segments[i];
                let weight;
                if (segment.startsWith("{")) {
                    weight = 2;
                }
                else if (segment === "*") {
                    weight = 1;
                }
                else {
                    weight = 3;
                }
                score += weight / (i + 1);
            }
            result.push({ score: score, pattern: pattern });
        }
        return result.sort(compare).map(x => x.pattern);
    }
    matchPermalink(permalink, template, locale) {
        if (locale) {
            const localePrefix = `/${locale}/`;
            if (permalink.startsWith(localePrefix)) {
                permalink = permalink.replace(localePrefix, "/");
            }
        }
        const tokens = [];
        const permalinkSegments = permalink.split("/");
        const templateSegments = template.split("/");
        if (permalinkSegments.length !== templateSegments.length && template.indexOf("*") === -1) {
            return {
                match: false,
                tokens: tokens
            };
        }
        for (let i = 0; i < templateSegments.length; i++) {
            const permalinkSegment = permalinkSegments[i];
            const templateSegment = templateSegments[i];
            if (templateSegment === "*") {
                if (permalinkSegment !== "" && permalinkSegment !== undefined) {
                    return {
                        match: true,
                        tokens: tokens
                    };
                }
                else {
                    return {
                        match: false,
                        tokens: []
                    };
                }
            }
            else if (templateSegment.startsWith("{")) {
                tokens.push({ index: i, name: templateSegment.replace(/{|}/g, "") });
            }
            else if (permalinkSegment !== templateSegment) {
                return {
                    match: false,
                    tokens: []
                };
            }
        }
        return {
            match: true,
            tokens: tokens
        };
    }
    getLayoutByPermalink(permalink, requestedLocale) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!permalink) {
                return null;
            }
            const defaultLocale = yield this.localeService.getDefaultLocale();
            const currentLocale = yield this.localeService.getCurrentLocale();
            const query = persistence_1.Query
                .from();
            const pageOfObjects = yield this.objectStorage.searchObjects(this.layoutsPath, query);
            const result = pageOfObjects.value;
            const layouts = Object.keys(result).map(key => result[key]);
            if (layouts && layouts.length) {
                let permalinkTemplates = layouts
                    .map(x => { var _a; return (_a = x.locales[defaultLocale]) === null || _a === void 0 ? void 0 : _a.permalinkTemplate; });
                permalinkTemplates = this.sort(permalinkTemplates);
                const matchingTemplate = permalinkTemplates.find(template => {
                    return this.matchPermalink(permalink, template, requestedLocale || currentLocale).match;
                });
                const matchingLayout = layouts.find(x => x.locales[defaultLocale].permalinkTemplate === (matchingTemplate || "/"));
                if (!matchingLayout) {
                    return null;
                }
                return this.localizedContractToContract(defaultLocale, currentLocale, requestedLocale, matchingLayout);
            }
            else {
                return null;
            }
        });
    }
    getLayoutContent(layoutKey, requestedLocale) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!layoutKey) {
                throw new Error(`Parameter "layoutKey" not specified.`);
            }
            if (!requestedLocale) {
                requestedLocale = yield this.localeService.getCurrentLocale();
            }
            const defaultLocale = yield this.localeService.getDefaultLocale();
            const localizedLayoutContract = yield this.objectStorage.getObject(layoutKey);
            let layoutMetadata = localizedLayoutContract.locales[requestedLocale];
            if (!layoutMetadata) {
                layoutMetadata = localizedLayoutContract.locales[defaultLocale];
            }
            let layoutContent;
            if (layoutMetadata.contentKey) {
                layoutContent = yield this.objectStorage.getObject(layoutMetadata.contentKey);
            }
            else {
                const layoutDefaultLocaleMetadata = localizedLayoutContract.locales[defaultLocale];
                layoutContent = yield this.objectStorage.getObject(layoutDefaultLocaleMetadata.contentKey);
            }
            layoutContent.type = "layout";
            return layoutContent;
        });
    }
    updateLayoutContent(layoutKey, content, requestedLocale) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!layoutKey) {
                throw new Error(`Parameter "layoutKey" not specified.`);
            }
            if (!content) {
                throw new Error(`Parameter "content" not specified.`);
            }
            const localizedLayoutContract = yield this.objectStorage.getObject(layoutKey);
            if (!localizedLayoutContract) {
                throw new Error(`Layout with key "${layoutKey}" not found.`);
            }
            if (!requestedLocale) {
                requestedLocale = yield this.localeService.getCurrentLocale();
            }
            let layoutMetadata = localizedLayoutContract.locales[requestedLocale];
            if (!layoutMetadata) {
                const defaultLocale = yield this.localeService.getDefaultLocale();
                const defaultLayoutMetadata = localizedLayoutContract.locales[defaultLocale];
                const identifier = Utils.guid();
                layoutMetadata = this.copyMetadata(defaultLayoutMetadata, {
                    contentKey: `${documentsPath}/${identifier}`
                });
                localizedLayoutContract.locales[requestedLocale] = layoutMetadata;
                yield this.objectStorage.updateObject(layoutKey, localizedLayoutContract);
            }
            else if (!layoutMetadata.contentKey) {
                const identifier = Utils.guid();
                layoutMetadata.contentKey = `${documentsPath}/${identifier}`;
                yield this.objectStorage.updateObject(layoutKey, layoutMetadata);
            }
            yield this.objectStorage.updateObject(layoutMetadata.contentKey, content);
        });
    }
}
exports.LayoutService = LayoutService;
//# sourceMappingURL=layoutService.js.map