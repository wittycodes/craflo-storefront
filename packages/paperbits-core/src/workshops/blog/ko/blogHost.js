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
exports.BlogHost = void 0;
const ko = require("knockout");
const decorators_1 = require("@paperbits/common/ko/decorators");
const ui_1 = require("@paperbits/common/ui");
const ko_1 = require("../../../content/ko");
let BlogHost = class BlogHost {
    constructor(contentViewModelBinder, router, eventManager, viewManager, layoutService, blogService) {
        this.contentViewModelBinder = contentViewModelBinder;
        this.router = router;
        this.eventManager = eventManager;
        this.viewManager = viewManager;
        this.layoutService = layoutService;
        this.blogService = blogService;
        this.contentViewModel = ko.observable();
        this.blogPostKey = ko.observable();
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.refreshContent();
            this.router.addRouteChangeListener(this.onRouteChange);
            this.eventManager.addEventListener("onDataPush", () => this.onDataPush());
        });
    }
    onDataPush() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.viewManager.mode === ui_1.ViewManagerMode.selecting || this.viewManager.mode === ui_1.ViewManagerMode.selected) {
                yield this.refreshContent();
            }
        });
    }
    refreshContent() {
        return __awaiter(this, void 0, void 0, function* () {
            this.viewManager.setShutter();
            const route = this.router.getCurrentRoute();
            const postContract = yield this.blogService.getBlogPostByPermalink(route.path);
            const postContentContract = yield this.blogService.getBlogPostContent(postContract.key);
            this.blogPostKey(postContract.key);
            const bindingContext = {
                navigationPath: route.path,
                routeKind: "blog-post",
                template: {
                    page: {
                        value: postContentContract,
                        onValueUpdate: (updatedPostContract) => __awaiter(this, void 0, void 0, function* () {
                            yield this.blogService.updateBlogPostContent(postContract.key, updatedPostContract);
                        })
                    }
                }
            };
            const layoutContract = yield this.layoutService.getLayoutByPermalink(route.path);
            if (!layoutContract) {
                throw new Error(`No matching layouts found for page with permalink "${route.path}".`);
            }
            const layoutContentContract = yield this.layoutService.getLayoutContent(layoutContract.key);
            const contentViewModel = yield this.contentViewModelBinder.getContentViewModelByKey(layoutContentContract, bindingContext);
            this.contentViewModel(contentViewModel);
            this.viewManager.removeShutter();
        });
    }
    onRouteChange(route) {
        return __awaiter(this, void 0, void 0, function* () {
            if (route.previous && route.previous.path === route.path) {
                return;
            }
            yield this.refreshContent();
        });
    }
    dispose() {
        this.router.removeRouteChangeListener(this.onRouteChange);
    }
};
__decorate([
    decorators_1.Param(),
    __metadata("design:type", Function)
], BlogHost.prototype, "blogPostKey", void 0);
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlogHost.prototype, "initialize", null);
__decorate([
    decorators_1.OnDestroyed(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BlogHost.prototype, "dispose", null);
BlogHost = __decorate([
    decorators_1.Component({
        selector: "blog-post-host",
        template: "<!-- ko if: contentViewModel --><!-- ko widget: contentViewModel, grid: {} --><!-- /ko --><!-- /ko -->"
    }),
    __metadata("design:paramtypes", [ko_1.ContentViewModelBinder, Object, Object, Object, Object, Object])
], BlogHost);
exports.BlogHost = BlogHost;
//# sourceMappingURL=blogHost.js.map