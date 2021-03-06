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
exports.PagesWorkshop = void 0;
const ko = require("knockout");
const pages_html_1 = require("./pages.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
const consts_1 = require("@paperbits/common/ko/consts");
const persistence_1 = require("@paperbits/common/persistence");
const pageItem_1 = require("./pageItem");
let PagesWorkshop = class PagesWorkshop {
    constructor(pageService, viewManager) {
        this.pageService = pageService;
        this.viewManager = viewManager;
        this.pages = ko.observableArray();
        this.selectedPage = ko.observable();
        this.searchPattern = ko.observable("");
        this.working = ko.observable(false);
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.searchPages();
            this.searchPattern
                .extend(consts_1.ChangeRateLimit)
                .subscribe(this.searchPages);
        });
    }
    searchPages(searchPattern = "") {
        return __awaiter(this, void 0, void 0, function* () {
            this.working(true);
            this.pages([]);
            const query = persistence_1.Query
                .from()
                .orderBy(`title`);
            if (searchPattern) {
                query.where(`title`, persistence_1.Operator.contains, searchPattern);
            }
            const pageOfResults = yield this.pageService.search(query);
            this.currentPage = pageOfResults;
            const pageItems = pageOfResults.value.map(page => new pageItem_1.PageItem(page));
            this.pages.push(...pageItems);
            this.working(false);
        });
    }
    loadNextPage() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = this.currentPage) === null || _a === void 0 ? void 0 : _a.takeNext)) {
                return;
            }
            this.working(true);
            this.currentPage = yield this.currentPage.takeNext();
            const pageItems = this.currentPage.value.map(page => new pageItem_1.PageItem(page));
            this.pages.push(...pageItems);
            this.working(false);
        });
    }
    selectPage(pageItem) {
        this.selectedPage(pageItem);
        const view = {
            heading: "Page",
            component: {
                name: "page-details-workshop",
                params: {
                    pageItem: pageItem,
                    onDeleteCallback: () => {
                        this.searchPages();
                    },
                    onCopyCallback: (item) => __awaiter(this, void 0, void 0, function* () {
                        yield this.searchPages();
                        this.selectPage(item);
                    })
                }
            }
        };
        this.viewManager.openViewAsWorkshop(view);
    }
    addPage() {
        return __awaiter(this, void 0, void 0, function* () {
            this.working(true);
            const pageUrl = "/new-page";
            const pageContract = yield this.pageService.createPage(pageUrl, "New page", "", "");
            const pageItem = new pageItem_1.PageItem(pageContract);
            this.pages.push(pageItem);
            this.selectPage(pageItem);
            this.working(false);
        });
    }
    isSelected(page) {
        const selectedPage = this.selectedPage();
        return (selectedPage === null || selectedPage === void 0 ? void 0 : selectedPage.key) === page.key;
    }
};
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PagesWorkshop.prototype, "initialize", null);
PagesWorkshop = __decorate([
    decorators_1.Component({
        selector: "pages",
        template: pages_html_1.default
    }),
    __metadata("design:paramtypes", [Object, Object])
], PagesWorkshop);
exports.PagesWorkshop = PagesWorkshop;
//# sourceMappingURL=pages.js.map