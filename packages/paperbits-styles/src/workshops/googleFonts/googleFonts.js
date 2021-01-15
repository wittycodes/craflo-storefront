"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.GoogleFonts = void 0;
var ko = require("knockout");
var Objects = require("@paperbits/common");
var googleFonts_html_1 = require("./googleFonts.html");
var http_1 = require("@paperbits/common/http");
var consts_1 = require("@paperbits/common/ko/consts");
var decorators_1 = require("@paperbits/common/ko/decorators");
var styleService_1 = require("../../styleService");
var googleFont_1 = require("./googleFont");
var openType_1 = require("../../openType");
var defaultApiKey = "AIzaSyDnNQwlwF8y3mxGwO5QglUyYZRj_VqNJgM";
var defaultApiUrl = "https://www.googleapis.com/webfonts/v1/webfonts";
var GoogleFonts = (function () {
    function GoogleFonts(styleService, httpClient, viewManager, fontManager, settingsProvider) {
        this.styleService = styleService;
        this.httpClient = httpClient;
        this.viewManager = viewManager;
        this.fontManager = fontManager;
        this.settingsProvider = settingsProvider;
        this.searchPattern = ko.observable("");
        this.fonts = ko.observableArray();
        this.selectedFont = ko.observable();
    }
    GoogleFonts.prototype.loadGoogleFonts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var settings, apiKey, apiUrl, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.settingsProvider.getSetting("integration/googleFonts")];
                    case 1:
                        settings = _a.sent();
                        apiKey = (settings === null || settings === void 0 ? void 0 : settings.apiKey) || defaultApiKey;
                        apiUrl = (settings === null || settings === void 0 ? void 0 : settings.apiUrl) || defaultApiUrl;
                        return [4, this.httpClient.send({
                                url: apiUrl + "?key=" + apiKey,
                                method: http_1.HttpMethod.get,
                            })];
                    case 2:
                        response = _a.sent();
                        this.loadedContracts = response.toObject().items;
                        return [4, this.searchFonts()];
                    case 3:
                        _a.sent();
                        this.searchPattern
                            .extend(consts_1.ChangeRateLimit)
                            .subscribe(this.searchFonts);
                        return [2];
                }
            });
        });
    };
    GoogleFonts.prototype.searchFonts = function () {
        this.fonts([]);
        this.loadNextPage();
    };
    GoogleFonts.prototype.loadNextPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadedCount, pattern, fonts;
            var _a;
            return __generator(this, function (_b) {
                if (!this.loadedContracts) {
                    return [2];
                }
                loadedCount = this.fonts().length;
                pattern = this.searchPattern().toLowerCase();
                fonts = this.loadedContracts
                    .filter(function (x) { return x.family.toLowerCase().includes(pattern); })
                    .slice(loadedCount, loadedCount + 50).map(function (contract) { return new googleFont_1.GoogleFont(contract); });
                (_a = this.fonts).push.apply(_a, fonts);
                return [2];
            });
        });
    };
    GoogleFonts.prototype.selectFont = function (googleFont) {
        return __awaiter(this, void 0, void 0, function () {
            var fontContract, styles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fontContract = googleFont.toContract();
                        return [4, this.styleService.getStyles()];
                    case 1:
                        styles = _a.sent();
                        styles.fonts[googleFont.identifier] = fontContract;
                        return [4, this.styleService.updateStyles(styles)];
                    case 2:
                        _a.sent();
                        if (this.selectedFont) {
                            this.selectedFont(fontContract);
                        }
                        if (this.onSelect) {
                            this.onSelect(fontContract);
                        }
                        return [2];
                }
            });
        });
    };
    GoogleFonts.prototype.uploadFont = function () {
        return __awaiter(this, void 0, void 0, function () {
            var files, styles, fontContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.viewManager.openUploadDialog(".ttf", ".otf", "woff")];
                    case 1:
                        files = _a.sent();
                        return [4, this.styleService.getStyles()];
                    case 2:
                        styles = _a.sent();
                        return [4, this.fontManager.parseFontFiles(files)];
                    case 3:
                        fontContract = _a.sent();
                        Objects.setValue(fontContract.key, styles, fontContract);
                        this.styleService.updateStyles(styles);
                        if (this.selectedFont) {
                            this.selectedFont(fontContract);
                        }
                        if (this.onSelect) {
                            this.onSelect(fontContract, true);
                        }
                        return [2];
                }
            });
        });
    };
    __decorate([
        decorators_1.Param(),
        __metadata("design:type", Function)
    ], GoogleFonts.prototype, "selectedFont", void 0);
    __decorate([
        decorators_1.Event(),
        __metadata("design:type", Function)
    ], GoogleFonts.prototype, "onSelect", void 0);
    __decorate([
        decorators_1.OnMounted(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], GoogleFonts.prototype, "loadGoogleFonts", null);
    GoogleFonts = __decorate([
        decorators_1.Component({
            selector: "google-fonts",
            template: googleFonts_html_1.default
        }),
        __metadata("design:paramtypes", [styleService_1.StyleService, Object, Object, openType_1.FontManager, Object])
    ], GoogleFonts);
    return GoogleFonts;
}());
exports.GoogleFonts = GoogleFonts;
