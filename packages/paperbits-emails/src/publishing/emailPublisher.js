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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailPublisher = void 0;
var ko = require("knockout");
var Utils = require("@paperbits/common/utils");
var fs = require("fs");
var path = require("path");
var await_parallel_limit_1 = require("await-parallel-limit");
var inlineContent_1 = require("./inlineContent");
var persistence_1 = require("@paperbits/common/persistence");
var knockout_rendering_1 = require("@paperbits/core/ko/knockout-rendering");
var styles_1 = require("@paperbits/common/styles");
var styles_2 = require("@paperbits/styles");
var jssCompiler_1 = require("@paperbits/styles/jssCompiler");
var EmailPublisher = (function () {
    function EmailPublisher(emailService, styleCompiler, outputBlobStorage, settingsProvider, emailLayoutViewModelBinder, logger, htmlPageOptimizer) {
        this.emailService = emailService;
        this.styleCompiler = styleCompiler;
        this.outputBlobStorage = outputBlobStorage;
        this.settingsProvider = settingsProvider;
        this.emailLayoutViewModelBinder = emailLayoutViewModelBinder;
        this.logger = logger;
        this.htmlPageOptimizer = htmlPageOptimizer;
        this.localStyleBuilder = new styles_2.LocalStyleBuilder(this.outputBlobStorage);
    }
    EmailPublisher.prototype.readFile = function (filepath) {
        return new Promise(function (resolve, reject) {
            fs.readFile(filepath, "utf8", function (error, content) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(content);
            });
        });
    };
    EmailPublisher.prototype.replacePermalinks = function (container, permalinkBaseUrl) {
        var elements = container.querySelectorAll("[href]");
        var elementsWithHref = Array.prototype.slice.call(elements);
        elementsWithHref.forEach(function (element) {
            if (!element.href.startsWith("http://") && !element.href.startsWith("https://") && !element.href.startsWith("mailto:")) {
                if (!element.href.startsWith("/")) {
                    element.href = "/" + element.href;
                }
                element.href = "" + permalinkBaseUrl + element.href;
            }
        });
    };
    EmailPublisher.prototype.replaceSources = function (container, mediaBaseUrl) {
        var elements = container.querySelectorAll("[src]");
        var elementsWithSrc = Array.prototype.slice.call(elements);
        elementsWithSrc.forEach(function (el) {
            if (!el.src.startsWith("http://") && !el.src.startsWith("https://") && !el.src.startsWith("mailto:")) {
                if (!el.src.startsWith("/")) {
                    el.src = "/" + el.src;
                }
                el.src = "" + mediaBaseUrl + el.src;
            }
        });
    };
    EmailPublisher.prototype.renderEmailTemplate = function (emailTemplate, globalStyleSheet, permalinkBaseUrl, mediaBaseUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var styleManager, bindingContext, templateDocument, layoutViewModel, resourceUri, htmlContent, styleSheets, compiler, stylesPath, css, customStyleElement, optimizedHtmlContent, contentBytes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.trackEvent("Publishing", { message: "Publishing email template " + emailTemplate.title + "..." });
                        styleManager = new styles_1.StyleManager();
                        styleManager.setStyleSheet(globalStyleSheet);
                        bindingContext = {
                            styleManager: styleManager
                        };
                        templateDocument = knockout_rendering_1.createDocument();
                        return [4, this.emailLayoutViewModelBinder.getLayoutViewModel(emailTemplate.key, bindingContext)];
                    case 1:
                        layoutViewModel = _a.sent();
                        ko.applyBindingsToNode(templateDocument.body, { widget: layoutViewModel }, null);
                        return [4, Utils.delay(400)];
                    case 2:
                        _a.sent();
                        resourceUri = Utils.slugify(emailTemplate.title) + ".html";
                        styleSheets = styleManager.getAllStyleSheets();
                        compiler = new jssCompiler_1.JssCompiler();
                        stylesPath = path.resolve(__dirname, "assets/styles/theme.css");
                        return [4, this.readFile(stylesPath)];
                    case 3:
                        css = _a.sent();
                        styleSheets.forEach(function (styleSheet) {
                            css += " " + compiler.compile(styleSheet);
                        });
                        customStyleElement = templateDocument.createElement("style");
                        customStyleElement.setAttribute("type", "text/css");
                        customStyleElement.textContent = css.replace(/\n/g, "").replace(/\s\s+/g, " ");
                        templateDocument.head.appendChild(customStyleElement);
                        this.replacePermalinks(templateDocument.body, permalinkBaseUrl);
                        this.replaceSources(templateDocument.body, mediaBaseUrl);
                        htmlContent = templateDocument.documentElement.outerHTML;
                        return [4, inlineContent_1.process(htmlContent, {
                                baseUrl: mediaBaseUrl,
                                removeHtmlSelectors: true,
                                applyTableAttributes: true,
                                preserveMediaQueries: true,
                                applyWidthAttributes: true,
                                applyLinkTags: true
                            })];
                    case 4:
                        htmlContent = _a.sent();
                        return [4, this.htmlPageOptimizer.optimize(htmlContent)];
                    case 5:
                        optimizedHtmlContent = _a.sent();
                        document.body.innerHTML = optimizedHtmlContent;
                        contentBytes = Utils.stringToUnit8Array(document.documentElement.outerHTML);
                        return [4, this.outputBlobStorage.uploadBlob("/email-templates/" + resourceUri, contentBytes)];
                    case 6:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    EmailPublisher.prototype.publish = function () {
        return __awaiter(this, void 0, void 0, function () {
            var settings, permalinkBaseUrl, mediaBaseUrl, globalStyleSheet, query, pagesOfResults, tasks, emailTemplates, _loop_1, _i, emailTemplates_1, emailTemplate;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.settingsProvider.getSetting("emailTemplates")];
                    case 1:
                        settings = _a.sent();
                        permalinkBaseUrl = settings.permalinkBaseUrl;
                        mediaBaseUrl = settings.mediaBaseUrl;
                        return [4, this.styleCompiler.getStyleSheet()];
                    case 2:
                        globalStyleSheet = _a.sent();
                        this.localStyleBuilder.buildGlobalStyle(globalStyleSheet);
                        query = persistence_1.Query.from();
                        return [4, this.emailService.search(query)];
                    case 3:
                        pagesOfResults = _a.sent();
                        _a.label = 4;
                    case 4:
                        tasks = [];
                        emailTemplates = pagesOfResults.value;
                        _loop_1 = function (emailTemplate) {
                            tasks.push(function () { return _this.renderEmailTemplate(emailTemplate, globalStyleSheet, permalinkBaseUrl, mediaBaseUrl); });
                        };
                        for (_i = 0, emailTemplates_1 = emailTemplates; _i < emailTemplates_1.length; _i++) {
                            emailTemplate = emailTemplates_1[_i];
                            _loop_1(emailTemplate);
                        }
                        return [4, await_parallel_limit_1.default(tasks, 7)];
                    case 5:
                        _a.sent();
                        if (!pagesOfResults.takeNext) return [3, 7];
                        return [4, pagesOfResults.takeNext()];
                    case 6:
                        pagesOfResults = _a.sent();
                        return [3, 8];
                    case 7:
                        pagesOfResults = null;
                        _a.label = 8;
                    case 8:
                        if (pagesOfResults) return [3, 4];
                        _a.label = 9;
                    case 9: return [2];
                }
            });
        });
    };
    return EmailPublisher;
}());
exports.EmailPublisher = EmailPublisher;
