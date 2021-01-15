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
exports.LayoutDetails = void 0;
const ko = require("knockout");
const layoutDetails_html_1 = require("./layoutDetails.html");
const layoutItem_1 = require("./layoutItem");
const decorators_1 = require("@paperbits/common/ko/decorators");
let LayoutDetails = class LayoutDetails {
    constructor(layoutService, viewManager) {
        this.layoutService = layoutService;
        this.viewManager = viewManager;
        this.permalinkTemplate = ko.observable();
    }
    onMounted() {
        return __awaiter(this, void 0, void 0, function* () {
            this.layoutItem.title
                .extend({ required: true, onlyValid: true })
                .subscribe(this.updateLayout);
            this.permalinkTemplate(this.layoutItem.permalinkTemplate());
            const validPermalinkTemplate = this.permalinkTemplate
                .extend({ uniqueLayoutUri: this.layoutItem.key, required: true, onlyValid: true });
            validPermalinkTemplate.subscribe(this.updateLayout);
            this.layoutItem.description
                .subscribe(this.updateLayout);
            this.isDefaultLayout = ko.pureComputed(() => {
                return validPermalinkTemplate() === "/";
            });
            this.canDelete = ko.computed(() => {
                return !this.isDefaultLayout();
            });
            this.viewManager.setHost({ name: "layout-host", params: { layoutKey: this.layoutItem.key } });
        });
    }
    updateLayout() {
        return __awaiter(this, void 0, void 0, function* () {
            this.layoutItem.permalinkTemplate(this.permalinkTemplate());
            yield this.layoutService.updateLayout(this.layoutItem.toContract());
        });
    }
    deleteLayout() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.layoutService.deleteLayout(this.layoutItem.toContract());
            this.viewManager.notifySuccess("Layouts", `Page "${this.layoutItem.title()}" was deleted.`);
            this.viewManager.closeWorkshop("layout-details-workshop");
            if (this.onDeleteCallback) {
                this.onDeleteCallback();
            }
            this.viewManager.setHost({ name: "page-host" });
        });
    }
    copyLayout() {
        return __awaiter(this, void 0, void 0, function* () {
            const copyPermalink = `${this.layoutItem.permalinkTemplate()} copy`;
            const layoutContract = yield this.layoutService.createLayout(`${this.layoutItem.title()} copy`, this.layoutItem.description(), copyPermalink);
            const copyContract = this.layoutItem.toContract();
            copyContract.key = layoutContract.key;
            copyContract.permalinkTemplate = layoutContract.permalinkTemplate;
            copyContract.title = layoutContract.title;
            copyContract.contentKey = layoutContract.contentKey;
            yield this.layoutService.updateLayout(copyContract);
            const layoutContentContract = yield this.layoutService.getLayoutContent(this.layoutItem.key);
            yield this.layoutService.updateLayoutContent(copyContract.key, layoutContentContract);
            if (this.onCopyCallback) {
                this.onCopyCallback(new layoutItem_1.LayoutItem(copyContract));
            }
        });
    }
};
__decorate([
    decorators_1.Param(),
    __metadata("design:type", layoutItem_1.LayoutItem)
], LayoutDetails.prototype, "layoutItem", void 0);
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], LayoutDetails.prototype, "onDeleteCallback", void 0);
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], LayoutDetails.prototype, "onCopyCallback", void 0);
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LayoutDetails.prototype, "onMounted", null);
LayoutDetails = __decorate([
    decorators_1.Component({
        selector: "layout-details-workshop",
        template: layoutDetails_html_1.default
    }),
    __metadata("design:paramtypes", [Object, Object])
], LayoutDetails);
exports.LayoutDetails = LayoutDetails;
//# sourceMappingURL=layoutDetails.js.map