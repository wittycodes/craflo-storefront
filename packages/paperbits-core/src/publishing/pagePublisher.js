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
exports.PagePublisher = void 0;
const Utils = require("@paperbits/common/utils");
const await_parallel_limit_1 = require("await-parallel-limit");
const page_html_1 = require("./page.html");
const constants_1 = require("@paperbits/common/constants");
const persistence_1 = require("@paperbits/common/persistence");
const styles_1 = require("@paperbits/common/styles");
const styles_2 = require("@paperbits/styles");
class PagePublisher {
    constructor(pageService, siteService, mediaService, outputBlobStorage, htmlPagePublisher, styleCompiler, localeService, sitemapBuilder, searchIndexBuilder, logger) {
        this.pageService = pageService;
        this.siteService = siteService;
        this.mediaService = mediaService;
        this.outputBlobStorage = outputBlobStorage;
        this.htmlPagePublisher = htmlPagePublisher;
        this.styleCompiler = styleCompiler;
        this.localeService = localeService;
        this.sitemapBuilder = sitemapBuilder;
        this.searchIndexBuilder = searchIndexBuilder;
        this.logger = logger;
        this.localStyleBuilder = new styles_2.LocalStyleBuilder(this.outputBlobStorage);
    }
    renderPage(page) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.trackEvent("Publishing", { message: `Publishing page ${page.title}...` });
            try {
                const htmlContent = yield this.htmlPagePublisher.renderHtml(page);
                return htmlContent;
            }
            catch (error) {
                throw new Error(`Unable to render page "${page.title}": ${error.stack || error.message}`);
            }
        });
    }
    renderAndUpload(settings, page, locale) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!page.permalink) {
                this.logger.trackEvent("Publishing", { message: `Skipping page with no permalink specified: "${page.title}".` });
                return;
            }
            try {
                const siteAuthor = settings === null || settings === void 0 ? void 0 : settings.author;
                const siteTitle = settings === null || settings === void 0 ? void 0 : settings.title;
                const siteDescription = settings === null || settings === void 0 ? void 0 : settings.description;
                const siteKeywords = settings === null || settings === void 0 ? void 0 : settings.keywords;
                const siteHostname = settings === null || settings === void 0 ? void 0 : settings.hostname;
                const faviconSourceKey = settings === null || settings === void 0 ? void 0 : settings.faviconSourceKey;
                const localePrefix = locale ? `/${locale}` : "";
                const pagePermalink = `${localePrefix}${page.permalink}`;
                const pageContent = yield this.pageService.getPageContent(page.key, locale);
                const pageUrl = siteHostname
                    ? `https://${settings === null || settings === void 0 ? void 0 : settings.hostname}${pagePermalink}`
                    : pagePermalink;
                const styleManager = new styles_1.StyleManager();
                const htmlPage = {
                    title: [page.title, siteTitle].join(" - "),
                    description: page.description || siteDescription,
                    keywords: page.keywords || siteKeywords,
                    permalink: pagePermalink,
                    url: pageUrl,
                    siteHostName: siteHostname,
                    content: pageContent,
                    template: page_html_1.default,
                    styleReferences: [
                        `/styles/styles.css`,
                        pagePermalink === "/"
                            ? `/styles.css`
                            : `${pagePermalink}/styles.css`
                    ],
                    author: siteAuthor,
                    socialShareData: page.socialShareData,
                    openGraph: {
                        type: page.permalink === "/" ? "website" : "article",
                        title: page.title || siteTitle,
                        description: page.description || siteDescription,
                        siteName: siteTitle
                    },
                    bindingContext: {
                        contentItemKey: page.key,
                        styleManager: styleManager,
                        navigationPath: pagePermalink,
                        locale: locale,
                        template: {
                            page: {
                                value: pageContent,
                            }
                        }
                    }
                };
                if (page.jsonLd) {
                    let structuredData;
                    try {
                        structuredData = JSON.parse(page.jsonLd);
                        htmlPage.linkedData = structuredData;
                    }
                    catch (error) {
                        this.logger.trackEvent("Publishing", { message: "Unable to parse page linked data." });
                    }
                }
                if (faviconSourceKey) {
                    try {
                        const media = yield this.mediaService.getMediaByKey(faviconSourceKey);
                        if (media) {
                            htmlPage.faviconPermalink = media.permalink;
                        }
                    }
                    catch (error) {
                        this.logger.trackEvent("Publishing", { message: "Could not retrieve favicon." });
                    }
                }
                const htmlContent = yield this.renderPage(htmlPage);
                const styleSheets = styleManager.getAllStyleSheets();
                this.localStyleBuilder.buildLocalStyle(pagePermalink, styleSheets);
                this.sitemapBuilder.appendPermalink(pagePermalink);
                this.searchIndexBuilder.appendPage(pagePermalink, htmlPage.title, htmlPage.description, htmlContent);
                let permalink = pagePermalink;
                if (!permalink.endsWith("/")) {
                    permalink += "/";
                }
                permalink = `${permalink}index.html`;
                const uploadPath = permalink;
                const contentBytes = Utils.stringToUnit8Array(htmlContent);
                yield this.outputBlobStorage.uploadBlob(uploadPath, contentBytes, "text/html");
            }
            catch (error) {
                throw new Error(`Unable to publish page "${page.title}": ${error.stack || error.message}`);
            }
        });
    }
    publishNonLocalized(siteSettings) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = persistence_1.Query.from();
            let pagesOfResults = yield this.pageService.search(query);
            do {
                const tasks = [];
                const pages = pagesOfResults.value;
                for (const page of pages) {
                    tasks.push(() => this.renderAndUpload(siteSettings, page));
                }
                yield await_parallel_limit_1.default(tasks, constants_1.maxParallelPublisingTasks);
                if (pagesOfResults.takeNext) {
                    pagesOfResults = yield pagesOfResults.takeNext();
                }
                else {
                    pagesOfResults = null;
                }
            } while (pagesOfResults);
        });
    }
    publishLocalized(locales, siteSettings) {
        return __awaiter(this, void 0, void 0, function* () {
            const defaultLocale = yield this.localeService.getDefaultLocale();
            for (const locale of locales) {
                const localeCode = locale.code === defaultLocale
                    ? null
                    : locale.code;
                const query = persistence_1.Query.from();
                let pagesOfResults = yield this.pageService.search(query, localeCode);
                do {
                    const tasks = [];
                    const pages = pagesOfResults.value;
                    for (const page of pages) {
                        tasks.push(() => this.renderAndUpload(siteSettings, page, localeCode));
                    }
                    yield await_parallel_limit_1.default(tasks, constants_1.maxParallelPublisingTasks);
                    if (pagesOfResults.takeNext) {
                        pagesOfResults = yield pagesOfResults.takeNext();
                    }
                    else {
                        pagesOfResults = null;
                    }
                } while (pagesOfResults);
            }
        });
    }
    publish() {
        return __awaiter(this, void 0, void 0, function* () {
            const locales = yield this.localeService.getLocales();
            const localizationEnabled = locales.length > 0;
            const globalStyleSheet = yield this.styleCompiler.getStyleSheet();
            this.localStyleBuilder.buildGlobalStyle(globalStyleSheet);
            try {
                const settings = yield this.siteService.getSettings();
                const siteSettings = settings.site;
                if (localizationEnabled) {
                    yield this.publishLocalized(locales, siteSettings);
                }
                else {
                    yield this.publishNonLocalized(siteSettings);
                }
            }
            catch (error) {
                throw new Error(`Unable to complete pages publishing. ${error.stack || error.message}`);
            }
        });
    }
}
exports.PagePublisher = PagePublisher;
//# sourceMappingURL=pagePublisher.js.map