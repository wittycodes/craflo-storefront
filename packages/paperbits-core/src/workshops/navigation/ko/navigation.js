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
exports.NavigationWorkshop = void 0;
const ko = require("knockout");
const navigation_html_1 = require("./navigation.html");
const navigation_1 = require("@paperbits/common/navigation");
const decorators_1 = require("@paperbits/common/ko/decorators");
const navigationModelBinder_1 = require("../navigationModelBinder");
const navigationViewModelBinder_1 = require("./navigationViewModelBinder");
let NavigationWorkshop = class NavigationWorkshop {
    constructor(navigationService, viewManager, navigationModelBinder, navigationViewModelBinder, eventManager) {
        this.navigationService = navigationService;
        this.viewManager = viewManager;
        this.navigationModelBinder = navigationModelBinder;
        this.navigationViewModelBinder = navigationViewModelBinder;
        this.eventManager = eventManager;
        this.onNavigationUpdate = this.onNavigationUpdate.bind(this);
        this.selectNavigationItem = this.selectNavigationItem.bind(this);
        this.selection = ko.observable();
        this.working = ko.observable(true);
        this.root = ko.observable();
        this.placeholderElement = document.createElement("div");
        this.placeholderElement.className = "placeholder";
        this.placeholderElement.onmousemove = this.onNullPointerMove;
        document.addEventListener("keydown", this.onKeyDown.bind(this), false);
    }
    searchNavigationItems() {
        return __awaiter(this, void 0, void 0, function* () {
            this.working(true);
            const navigationItems = yield this.navigationService.getNavigationItems();
            const root = {
                key: null,
                label: "",
                navigationItems: navigationItems
            };
            const rootModel = yield this.navigationModelBinder.contractToModel(root);
            const rootViewModel = yield this.navigationViewModelBinder.modelToViewModel(rootModel);
            this.root(rootViewModel);
            this.working(false);
            rootViewModel.onUpdate.subscribe(this.onNavigationUpdate);
        });
    }
    onNavigationUpdate() {
        return __awaiter(this, void 0, void 0, function* () {
            const rootModel = this.navigationViewModelBinder.viewModelToModel(this.root());
            const rootContract = this.navigationModelBinder.modelToContract(rootModel);
            yield this.navigationService.updateNavigation(rootContract.navigationItems);
            rootModel.nodes.forEach(navigationItem => {
                this.eventManager.dispatchEvent(navigation_1.NavigationEvents.onNavigationItemUpdate, navigationItem);
            });
        });
    }
    addNavigationItem() {
        const currentNode = this.selection() || this.root();
        const node = currentNode.addChild();
        this.selectNavigationItem(node);
    }
    selectNavigationItem(navigationItem) {
        return __awaiter(this, void 0, void 0, function* () {
            this.selection(navigationItem);
            const view = {
                heading: "Navigation item",
                component: {
                    name: "navigation-details-workshop",
                    params: {
                        navigationItem: navigationItem,
                        onDelete: () => {
                            this.selection(navigationItem.parent);
                        }
                    }
                }
            };
            this.viewManager.openViewAsWorkshop(view);
        });
    }
    onNullPointerMove(event) {
        event.stopPropagation();
    }
    onNodeDragStart(sourceData, node) {
        const width = node.clientWidth + "px";
        const height = node.clientHeight + "px";
        this.placeholderElement.style.width = width;
        this.placeholderElement.style.height = height;
        node.parentNode.insertBefore(this.placeholderElement, node.nextSibling);
    }
    onNodeDragEnd() {
        this.placeholderElement.parentElement.removeChild(this.placeholderElement);
    }
    onAcceptNodeBefore(node, acceptingNode) {
        acceptingNode.parentNode.insertBefore(this.placeholderElement, acceptingNode);
    }
    onAcceptNodeAfter(node, acceptingNode) {
        acceptingNode.parentNode.insertBefore(this.placeholderElement, acceptingNode.nextSibling);
    }
    onKeyDown(event) {
        if (!this.selection()) {
            return;
        }
        switch (event.keyCode) {
            case 37:
                this.selection().moveNodeLeft();
                break;
            case 39:
                this.selection().moveNodeRight();
                break;
            default:
        }
    }
    dispose() {
        document.removeEventListener("keydown", this.onKeyDown.bind(this), false);
    }
    isSelected(page) {
        const selectedNavItem = this.selection();
        return (selectedNavItem === null || selectedNavItem === void 0 ? void 0 : selectedNavItem.key) === page.key;
    }
};
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NavigationWorkshop.prototype, "searchNavigationItems", null);
__decorate([
    decorators_1.OnDestroyed(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NavigationWorkshop.prototype, "dispose", null);
NavigationWorkshop = __decorate([
    decorators_1.Component({
        selector: "navigation",
        template: navigation_html_1.default
    }),
    __metadata("design:paramtypes", [Object, Object, navigationModelBinder_1.NavigationModelBinder,
        navigationViewModelBinder_1.NavigationViewModelBinder, Object])
], NavigationWorkshop);
exports.NavigationWorkshop = NavigationWorkshop;
//# sourceMappingURL=navigation.js.map