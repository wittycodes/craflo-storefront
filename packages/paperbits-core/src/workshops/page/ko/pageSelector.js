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
exports.PageSelector = void 0;
const ko = require("knockout");
const pageSelector_html_1 = require("./pageSelector.html");
const pageItem_1 = require("./pageItem");
const decorators_1 = require("@paperbits/common/ko/decorators");
const anchorUtils_1 = require("../../../text/anchorUtils");
const consts_1 = require("@paperbits/common/ko/consts");
const persistence_1 = require("@paperbits/common/persistence");
let PageSelector = class PageSelector {
    constructor(pageService) {
        this.pageService = pageService;
        this.pages = ko.observableArray();
        this.selectedPage = ko.observable();
        this.searchPattern = ko.observable("");
        this.working = ko.observable();
    }
    onMounted() {
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
            if (!this.selectedPage() && this.preSelectedModel) {
                const currentPermalink = this.preSelectedModel.href;
                const current = pageItems.find(item => item.permalink() === currentPermalink);
                if (current) {
                    yield this.selectPage(current);
                    const currentAnchors = current.anchors();
                    if (this.preSelectedModel.anchor) {
                        const currentAnchor = currentAnchors.find(item => item.elementId === this.preSelectedModel.anchor);
                        if (currentAnchor) {
                            yield this.selectAnchor(currentAnchor);
                        }
                    }
                }
            }
            this.working(false);
        });
    }
    selectPage(page) {
        return __awaiter(this, void 0, void 0, function* () {
            this.selectedPage(page);
            if (!page.anchorsLoaded()) {
                const anchors = yield this.getAnchors(page);
                page.anchors(anchors);
                page.anchorsLoaded(true);
                if (anchors.length > 0) {
                    return;
                }
            }
            if (this.onSelect) {
                this.onSelect(page.toContract());
            }
            if (this.onHyperlinkSelect) {
                this.onHyperlinkSelect(page.getHyperlink());
            }
        });
    }
    selectResource(resource) {
        this.preSelectedModel = resource;
    }
    selectAnchor(anchor) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.onHyperlinkSelect) {
                return;
            }
            const selectedPage = this.selectedPage();
            anchor.isSelected(true);
            selectedPage.selectedAnchor = anchor;
            this.onHyperlinkSelect(selectedPage.getHyperlink());
        });
    }
    getAnchors(pageItem) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageContent = yield this.pageService.getPageContent(pageItem.key);
            const children = anchorUtils_1.AnchorUtils.getHeadingNodes(pageContent, 1, 6);
            const anchors = children
                .filter(item => { var _a; return ((_a = item.nodes) === null || _a === void 0 ? void 0 : _a.length) > 0; })
                .map(item => {
                var _a, _b;
                const anchor = new pageItem_1.AnchorItem();
                anchor.shortTitle = (_a = item.nodes[0]) === null || _a === void 0 ? void 0 : _a.text;
                anchor.elementId = (_b = item.attrs) === null || _b === void 0 ? void 0 : _b.id;
                return anchor;
            });
            return anchors;
        });
    }
    isSelected(page) {
        const selectedPage = this.selectedPage();
        return (selectedPage === null || selectedPage === void 0 ? void 0 : selectedPage.key) === page.key;
    }
};
__decorate([
    decorators_1.Param(),
    __metadata("design:type", Function)
], PageSelector.prototype, "selectedPage", void 0);
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], PageSelector.prototype, "onSelect", void 0);
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], PageSelector.prototype, "onHyperlinkSelect", void 0);
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PageSelector.prototype, "onMounted", null);
PageSelector = __decorate([
    decorators_1.Component({
        selector: "page-selector",
        template: pageSelector_html_1.default
    }),
    __metadata("design:paramtypes", [Object])
], PageSelector);
exports.PageSelector = PageSelector;
//# sourceMappingURL=pageSelector.js.map