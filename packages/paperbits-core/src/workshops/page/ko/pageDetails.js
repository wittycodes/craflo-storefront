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
exports.PageDetailsWorkshop = void 0;
const ko = require("knockout");
const pageDetails_html_1 = require("./pageDetails.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
const pageItem_1 = require("./pageItem");
const background_1 = require("@paperbits/common/widgets/background");
let PageDetailsWorkshop = class PageDetailsWorkshop {
    constructor(pageService, router, viewManager, reservedPermalinks, settingsProvider, mediaService, localeService) {
        this.pageService = pageService;
        this.router = router;
        this.viewManager = viewManager;
        this.reservedPermalinks = reservedPermalinks;
        this.settingsProvider = settingsProvider;
        this.mediaService = mediaService;
        this.localeService = localeService;
        this.isReserved = ko.observable(false);
        this.isSeoEnabled = ko.observable(false);
        this.socialShareImage = ko.observable();
    }
    onMounted() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            this.pageItem.title
                .extend({ required: true, onlyValid: true })
                .subscribe(this.applyChanges);
            this.pageItem.description
                .subscribe(this.applyChanges);
            this.pageItem.keywords
                .subscribe(this.applyChanges);
            this.pageItem.jsonLd
                .subscribe(this.applyChanges);
            let validPermalink = this.pageItem.permalink;
            if (this.reservedPermalinks.includes(this.pageItem.permalink())) {
                this.isReserved(true);
            }
            else {
                validPermalink = validPermalink.extend({ required: true, validPermalink: this.pageItem.key, onlyValid: true });
                validPermalink.subscribe(this.onPermalinkChange);
            }
            const socialShareData = this.pageItem.socialShareData();
            if ((_a = socialShareData === null || socialShareData === void 0 ? void 0 : socialShareData.image) === null || _a === void 0 ? void 0 : _a.sourceKey) {
                const media = yield this.mediaService.getMediaByKey(socialShareData.image.sourceKey);
                if (media) {
                    const imageModel = new background_1.BackgroundModel();
                    imageModel.sourceUrl = media.downloadUrl;
                    this.socialShareImage(imageModel);
                }
            }
            const locale = yield this.localeService.getCurrentLocale();
            const defaultLocale = yield this.localeService.getDefaultLocale();
            if (locale !== defaultLocale) {
                this.isReserved(true);
            }
            const seoSetting = yield this.settingsProvider.getSetting("enableSeo");
            if (seoSetting) {
                this.isSeoEnabled(seoSetting);
            }
            yield this.router.navigateTo(validPermalink());
            this.viewManager.setHost({ name: "page-host" });
        });
    }
    applyChanges() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pageService.updatePage(this.pageItem.toContract());
        });
    }
    onPermalinkChange() {
        return __awaiter(this, void 0, void 0, function* () {
            const permalink = this.pageItem.permalink();
            this.router.updateHistory(permalink, this.pageItem.title());
            yield this.applyChanges();
        });
    }
    deletePage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pageService.deletePage(this.pageItem.toContract());
            this.viewManager.notifySuccess("Pages", `Page "${this.pageItem.title()}" was deleted.`);
            this.viewManager.closeWorkshop("page-details-workshop");
            if (this.onDeleteCallback) {
                this.onDeleteCallback();
            }
            this.router.navigateTo("/");
        });
    }
    copyPage() {
        return __awaiter(this, void 0, void 0, function* () {
            const copyPermalink = `${this.pageItem.permalink()} copy`;
            const pageContract = yield this.pageService.createPage(copyPermalink, `${this.pageItem.title()} copy`, this.pageItem.description(), this.pageItem.keywords());
            const copyContract = this.pageItem.toContract();
            copyContract.key = pageContract.key;
            copyContract.permalink = pageContract.permalink;
            copyContract.title = pageContract.title;
            copyContract.contentKey = pageContract.contentKey;
            yield this.pageService.updatePage(copyContract);
            const pageContentContract = yield this.pageService.getPageContent(this.pageItem.key);
            yield this.pageService.updatePageContent(copyContract.key, pageContentContract);
            if (this.onCopyCallback) {
                this.onCopyCallback(new pageItem_1.PageItem(copyContract));
            }
        });
    }
    onMediaSelected(media) {
        return __awaiter(this, void 0, void 0, function* () {
            let socialShareData = null;
            if (media) {
                socialShareData = {
                    image: {
                        sourceKey: media.key,
                    }
                };
                const imageModel = new background_1.BackgroundModel();
                imageModel.sourceUrl = media.downloadUrl;
                this.socialShareImage(imageModel);
            }
            else {
                this.socialShareImage(null);
            }
            this.pageItem.socialShareData(socialShareData);
            yield this.applyChanges();
        });
    }
};
__decorate([
    decorators_1.Param(),
    __metadata("design:type", pageItem_1.PageItem)
], PageDetailsWorkshop.prototype, "pageItem", void 0);
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], PageDetailsWorkshop.prototype, "onDeleteCallback", void 0);
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], PageDetailsWorkshop.prototype, "onCopyCallback", void 0);
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PageDetailsWorkshop.prototype, "onMounted", null);
PageDetailsWorkshop = __decorate([
    decorators_1.Component({
        selector: "page-details-workshop",
        template: pageDetails_html_1.default
    }),
    __metadata("design:paramtypes", [Object, Object, Object, Array, Object, Object, Object])
], PageDetailsWorkshop);
exports.PageDetailsWorkshop = PageDetailsWorkshop;
//# sourceMappingURL=pageDetails.js.map