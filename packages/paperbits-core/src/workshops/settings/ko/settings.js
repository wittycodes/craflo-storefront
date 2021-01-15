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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsWorkshop = void 0;
const ko = require("knockout");
const settings_html_1 = require("./settings.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
const metaDataSetter_1 = require("@paperbits/common/meta/metaDataSetter");
const background_1 = require("@paperbits/common/widgets/background");
let SettingsWorkshop = class SettingsWorkshop {
    constructor(mediaService, siteService) {
        this.mediaService = mediaService;
        this.siteService = siteService;
        this.working = ko.observable();
        this.title = ko.observable();
        this.description = ko.observable();
        this.keywords = ko.observable();
        this.hostname = ko.observable();
        this.author = ko.observable();
        this.faviconSourceKey = ko.observable();
        this.faviconFileName = ko.observable();
        this.favicon = ko.observable();
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            this.working(true);
            const settings = yield this.siteService.getSettings();
            const siteSettings = settings.site;
            if (siteSettings) {
                this.title(siteSettings.title);
                this.description(siteSettings.description);
                this.keywords(siteSettings.keywords);
                this.hostname(siteSettings.hostname);
                this.author(siteSettings.author);
                this.faviconSourceKey(siteSettings.faviconSourceKey);
                this.setFaviconUri(siteSettings.faviconSourceKey);
            }
            this.working(false);
            this.title.subscribe(this.onSettingChange);
            this.description.subscribe(this.onSettingChange);
            this.keywords.subscribe(this.onSettingChange);
            this.hostname.subscribe(this.onSettingChange);
            this.author.subscribe(this.onSettingChange);
            this.faviconSourceKey.subscribe(this.onSettingChange);
        });
    }
    onSettingChange() {
        return __awaiter(this, void 0, void 0, function* () {
            const settings = yield this.siteService.getSettings();
            const siteSettings = {
                title: this.title(),
                description: this.description(),
                keywords: this.keywords(),
                hostname: this.hostname(),
                faviconSourceKey: this.faviconSourceKey(),
                author: this.author()
            };
            settings.site = siteSettings;
            yield this.siteService.setSettings(settings);
        });
    }
    onMediaSelected(media) {
        if (media) {
            this.faviconSourceKey(media.key);
            this.setFaviconUri(media.key);
        }
        else {
            this.faviconFileName(null);
            this.faviconSourceKey(null);
        }
    }
    setFaviconUri(sourceKey) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!sourceKey) {
                return;
            }
            const mediaContract = yield this.mediaService.getMediaByKey(sourceKey);
            if (!mediaContract) {
                console.warn(`Unable to fetch favicon by key ${sourceKey}.`);
                return;
            }
            this.faviconFileName(mediaContract.downloadUrl);
            metaDataSetter_1.MetaDataSetter.setFavIcon(mediaContract.downloadUrl);
            const faviconModel = new background_1.BackgroundModel();
            faviconModel.sourceUrl = mediaContract.downloadUrl;
            this.favicon(faviconModel);
        });
    }
};
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SettingsWorkshop.prototype, "initialize", null);
SettingsWorkshop = __decorate([
    decorators_1.Component({
        selector: "settings",
        template: settings_html_1.default
    }),
    __metadata("design:paramtypes", [Object, Object])
], SettingsWorkshop);
exports.SettingsWorkshop = SettingsWorkshop;
//# sourceMappingURL=settings.js.map