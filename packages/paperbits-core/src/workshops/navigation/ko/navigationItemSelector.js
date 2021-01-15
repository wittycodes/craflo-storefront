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
exports.NavigationItemSelector = void 0;
const ko = require("knockout");
const navigationItemSelector_html_1 = require("./navigationItemSelector.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
const navigationModelBinder_1 = require("../navigationModelBinder");
const navigationViewModelBinder_1 = require("./navigationViewModelBinder");
let NavigationItemSelector = class NavigationItemSelector {
    constructor(navigationService, navigationModelBinder, navigationViewModelBinder) {
        this.navigationService = navigationService;
        this.navigationModelBinder = navigationModelBinder;
        this.navigationViewModelBinder = navigationViewModelBinder;
        this.selectNavigationItem = this.selectNavigationItem.bind(this);
        this.selectedNavigationItem = ko.observable();
        this.working = ko.observable(true);
        this.root = ko.observable();
        this.initialize();
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            this.working(true);
            const navigationItems = yield this.navigationService.getNavigationItems();
            const lang = {
                key: "@locales",
                label: "Languages"
            };
            navigationItems.push(lang);
            const root = {
                key: null,
                label: "Root",
                navigationItems: navigationItems
            };
            const rootModel = yield this.navigationModelBinder.contractToModel(root);
            const rootViewModel = yield this.navigationViewModelBinder.modelToViewModel(rootModel);
            this.root(rootViewModel);
            this.working(false);
        });
    }
    selectNavigationItem(navigationItem) {
        return __awaiter(this, void 0, void 0, function* () {
            this.selectedNavigationItem(navigationItem);
            if (this.onSelect) {
                const rootModel = this.navigationViewModelBinder.viewModelToModel(navigationItem);
                this.onSelect(rootModel);
            }
        });
    }
    selectNone() {
        if (this.onSelect) {
            this.onSelect(null);
        }
    }
};
__decorate([
    decorators_1.Param(),
    __metadata("design:type", Function)
], NavigationItemSelector.prototype, "selectedNavigationItem", void 0);
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], NavigationItemSelector.prototype, "onSelect", void 0);
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NavigationItemSelector.prototype, "initialize", null);
NavigationItemSelector = __decorate([
    decorators_1.Component({
        selector: "navigation-item-selector",
        template: navigationItemSelector_html_1.default
    }),
    __metadata("design:paramtypes", [Object, navigationModelBinder_1.NavigationModelBinder,
        navigationViewModelBinder_1.NavigationViewModelBinder])
], NavigationItemSelector);
exports.NavigationItemSelector = NavigationItemSelector;
//# sourceMappingURL=navigationItemSelector.js.map