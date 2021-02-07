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
exports.WidgetSelector = void 0;
const ko = require("knockout");
const widgetSelector_html_1 = require("./widgetSelector.html");
const widgetItem_1 = require("./widgetItem");
const decorators_1 = require("@paperbits/common/ko/decorators");
const consts_1 = require("@paperbits/common/ko/consts");
let WidgetSelector = class WidgetSelector {
    constructor(widgetService) {
        this.widgetService = widgetService;
        this.working = ko.observable(true);
        this.searchPattern = ko.observable();
        this.categories = ko.observable();
    }
    initialize() {
        this.loadWidgetOrders();
        this.searchPattern
            .extend(consts_1.ChangeRateLimit)
            .subscribe(this.searchWidgets);
    }
    searchWidgets(pattern) {
        return __awaiter(this, void 0, void 0, function* () {
            pattern = pattern.toLowerCase();
            const filteredCategories = this.originalCategories
                .map(x => ({
                name: x.name,
                items: x.items.filter(w => w.displayName.toLowerCase().includes(pattern))
            }))
                .filter(x => x.items.length > 0);
            this.categories(filteredCategories);
        });
    }
    loadWidgetOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            this.working(true);
            const items = new Array();
            const widgetOrders = yield this.widgetService.getWidgetOrders();
            const provided = this.onRequest();
            widgetOrders
                .filter(x => !x.requires || x.requires.every(y => provided.includes(y)))
                .forEach((widgetOrder) => {
                const widgetItem = new widgetItem_1.WidgetItem();
                widgetItem.css = `${widgetOrder.iconClass}`;
                widgetItem.displayName = widgetOrder.displayName;
                widgetItem.category = widgetOrder.category || "";
                widgetItem.widgetOrder = widgetOrder;
                items.push(widgetItem);
            });
            const groupsObj = items.reduce((result, item) => {
                (result[item["category"]] = result[item["category"]] || []).push(item);
                return result;
            }, {});
            const groups = Object.keys(groupsObj).map(category => {
                return { name: category, items: groupsObj[category] };
            });
            this.originalCategories = groups;
            this.categories(this.originalCategories);
            this.working(false);
        });
    }
    selectWidget(widgetItem) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = yield widgetItem.widgetOrder.createModel();
            this.onSelect(model);
        });
    }
};
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], WidgetSelector.prototype, "onSelect", void 0);
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], WidgetSelector.prototype, "onRequest", void 0);
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WidgetSelector.prototype, "initialize", null);
WidgetSelector = __decorate([
    decorators_1.Component({
        selector: "widget-selector",
        template: widgetSelector_html_1.default
    }),
    __metadata("design:paramtypes", [Object])
], WidgetSelector);
exports.WidgetSelector = WidgetSelector;
//# sourceMappingURL=widgetSelector.js.map