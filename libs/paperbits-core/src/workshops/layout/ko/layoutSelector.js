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
exports.LayoutSelector = void 0;
const ko = require("knockout");
const layoutSelector_html_1 = require("./layoutSelector.html");
const persistence_1 = require("@paperbits/common/persistence");
const layoutItem_1 = require("./layoutItem");
const decorators_1 = require("@paperbits/common/ko/decorators");
let LayoutSelector = class LayoutSelector {
    constructor(layoutService) {
        this.layoutService = layoutService;
        this.layouts = ko.observableArray();
        this.selectedLayout = ko.observable();
        this.searchPattern = ko.observable();
        this.working = ko.observable();
    }
    onMounted() {
        return __awaiter(this, void 0, void 0, function* () {
            this.searchLayouts();
        });
    }
    searchLayouts(searchPattern = "") {
        return __awaiter(this, void 0, void 0, function* () {
            this.layouts([]);
            const query = persistence_1.Query
                .from()
                .orderBy(`title`);
            if (searchPattern) {
                query.where(`title`, persistence_1.Operator.contains, searchPattern);
            }
            const pageOfResults = yield this.layoutService.search(query);
            this.currentPage = pageOfResults;
            const pageItems = pageOfResults.value.map(page => new layoutItem_1.LayoutItem(page));
            this.layouts.push(...pageItems);
        });
    }
    loadNextPage() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = this.currentPage) === null || _a === void 0 ? void 0 : _a.takeNext) || this.working()) {
                this.loadNextPage = null;
                return;
            }
            this.working(true);
            this.currentPage = yield this.currentPage.takeNext();
            const layoutItems = this.currentPage.value.map(page => new layoutItem_1.LayoutItem(page));
            this.layouts.push(...layoutItems);
            this.working(false);
        });
    }
    selectLayout(layout) {
        return __awaiter(this, void 0, void 0, function* () {
            this.selectedLayout(layout);
            if (this.onSelect) {
                this.onSelect(layout.toContract());
            }
        });
    }
};
__decorate([
    decorators_1.Param(),
    __metadata("design:type", Function)
], LayoutSelector.prototype, "selectedLayout", void 0);
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], LayoutSelector.prototype, "onSelect", void 0);
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LayoutSelector.prototype, "onMounted", null);
LayoutSelector = __decorate([
    decorators_1.Component({
        selector: "layout-selector",
        template: layoutSelector_html_1.default
    }),
    __metadata("design:paramtypes", [Object])
], LayoutSelector);
exports.LayoutSelector = LayoutSelector;
//# sourceMappingURL=layoutSelector.js.map