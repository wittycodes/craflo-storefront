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
exports.LayoutHost = void 0;
const ko = require("knockout");
const ko_1 = require("../../../content/ko");
const decorators_1 = require("@paperbits/common/ko/decorators");
const ui_1 = require("@paperbits/common/ui");
const styles_1 = require("@paperbits/common/styles");
let LayoutHost = class LayoutHost {
    constructor(contentViewModelBinder, router, eventManager, viewManager, layoutService, styleCompiler) {
        this.contentViewModelBinder = contentViewModelBinder;
        this.router = router;
        this.eventManager = eventManager;
        this.viewManager = viewManager;
        this.layoutService = layoutService;
        this.styleCompiler = styleCompiler;
        this.contentViewModel = ko.observable();
        this.layoutKey = ko.observable();
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.refreshContent();
            this.eventManager.addEventListener("onDataPush", () => this.onDataPush());
            this.eventManager.addEventListener("onLocaleChange", () => this.onLocaleUpdate());
        });
    }
    onDataPush() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.viewManager.mode === ui_1.ViewManagerMode.selecting || this.viewManager.mode === ui_1.ViewManagerMode.selected) {
                yield this.refreshContent();
            }
        });
    }
    onLocaleUpdate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.refreshContent();
        });
    }
    refreshContent() {
        return __awaiter(this, void 0, void 0, function* () {
            this.viewManager.setShutter();
            const route = this.router.getCurrentRoute();
            const layoutContentContract = yield this.layoutService.getLayoutContent(this.layoutKey());
            const styleManager = new styles_1.StyleManager(this.eventManager);
            const styleSheet = yield this.styleCompiler.getStyleSheet();
            styleManager.setStyleSheet(styleSheet);
            const bindingContext = {
                styleManager: styleManager,
                navigationPath: route.path,
                routeKind: "layout",
                template: {
                    layout: {
                        value: layoutContentContract,
                        onValueUpdate: (updatedContentContract) => __awaiter(this, void 0, void 0, function* () {
                            yield this.layoutService.updateLayoutContent(this.layoutKey(), updatedContentContract);
                        })
                    }
                }
            };
            const contentViewModel = yield this.contentViewModelBinder.getContentViewModelByKey(layoutContentContract, bindingContext);
            contentViewModel["widgetBinding"].provides = ["html", "js", "interaction"];
            this.contentViewModel(contentViewModel);
            this.viewManager.removeShutter();
        });
    }
};
__decorate([
    decorators_1.Param(),
    __metadata("design:type", Function)
], LayoutHost.prototype, "layoutKey", void 0);
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LayoutHost.prototype, "initialize", null);
LayoutHost = __decorate([
    decorators_1.Component({
        selector: "layout-host",
        template: "<!-- ko if: contentViewModel --><!-- ko widget: contentViewModel, grid: {} --><!-- /ko --><!-- /ko -->"
    }),
    __metadata("design:paramtypes", [ko_1.ContentViewModelBinder, Object, Object, Object, Object, Object])
], LayoutHost);
exports.LayoutHost = LayoutHost;
//# sourceMappingURL=layoutHost.js.map