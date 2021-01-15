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
exports.UrlSelector = void 0;
const ko = require("knockout");
const urlSelector_html_1 = require("./urlSelector.html");
const urlItem_1 = require("./urlItem");
const decorators_1 = require("@paperbits/common/ko/decorators");
const consts_1 = require("@paperbits/common/ko/consts");
const persistence_1 = require("@paperbits/common/persistence");
let UrlSelector = class UrlSelector {
    constructor(urlService) {
        this.urlService = urlService;
        this.uri = ko.observable("https://");
        this.urls = ko.observableArray();
        this.selectedUrl = ko.observable();
        this.searchPattern = ko.observable();
        this.working = ko.observable(false);
    }
    onMounted() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.searchUrls();
            this.searchPattern
                .extend(consts_1.ChangeRateLimit)
                .subscribe(this.searchUrls);
        });
    }
    searchUrls(searchPattern = "") {
        return __awaiter(this, void 0, void 0, function* () {
            this.working(true);
            this.urls([]);
            const query = persistence_1.Query
                .from()
                .orderBy(`title`);
            if (searchPattern) {
                query.where(`title`, persistence_1.Operator.contains, searchPattern);
            }
            const pageOfResults = yield this.urlService.search(query);
            this.currentPage = pageOfResults;
            const urlItems = pageOfResults.value.map(media => new urlItem_1.UrlItem(media));
            this.urls.push(...urlItems);
            this.working(false);
        });
    }
    loadNextPage() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = this.currentPage) === null || _a === void 0 ? void 0 : _a.takeNext) || this.working()) {
                return;
            }
            this.working(true);
            this.currentPage = yield this.currentPage.takeNext();
            const urlItems = this.currentPage.value.map(page => new urlItem_1.UrlItem(page));
            this.urls.push(...urlItems);
            this.working(false);
        });
    }
    selectUrl(urlItem) {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = this.selectedUrl();
            if (uri) {
                uri.hasFocus(false);
            }
            urlItem.hasFocus(true);
            this.selectedUrl(urlItem);
            if (this.onSelect) {
                this.onSelect(urlItem.toContract());
            }
            if (this.onHyperlinkSelect) {
                this.onHyperlinkSelect(urlItem.getHyperlink());
            }
        });
    }
    createUrl() {
        return __awaiter(this, void 0, void 0, function* () {
            const newUri = this.uri();
            const urlContract = yield this.urlService.createUrl(newUri, newUri);
            const urlItem = new urlItem_1.UrlItem(urlContract);
            if (this.onHyperlinkSelect) {
                this.onHyperlinkSelect(urlItem.getHyperlink());
            }
        });
    }
    deleteUrl() {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = this.selectedUrl();
            if (uri) {
                yield this.urlService.deleteUrl(uri.toContract());
            }
            this.uri("https://");
            yield this.searchUrls();
        });
    }
};
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], UrlSelector.prototype, "onSelect", void 0);
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], UrlSelector.prototype, "onHyperlinkSelect", void 0);
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UrlSelector.prototype, "onMounted", null);
UrlSelector = __decorate([
    decorators_1.Component({
        selector: "url-selector",
        template: urlSelector_html_1.default
    }),
    __metadata("design:paramtypes", [Object])
], UrlSelector);
exports.UrlSelector = UrlSelector;
//# sourceMappingURL=urlSelector.js.map