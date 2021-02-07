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
exports.CarouselItemEditor = void 0;
const ko = require("knockout");
const Utils = require("@paperbits/common");
const Objects = require("@paperbits/common/objects");
const carouselItemEditor_html_1 = require("./carouselItemEditor.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
const carouselModel_1 = require("../carouselModel");
const consts_1 = require("@paperbits/common/ko/consts");
const events_1 = require("@paperbits/common/events");
let CarouselItemEditor = class CarouselItemEditor {
    constructor(viewManager, eventManager) {
        this.viewManager = viewManager;
        this.eventManager = eventManager;
        this.background = ko.observable();
        this.sizeConfig = ko.observable();
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            this.updateObservables();
            this.background.extend(consts_1.ChangeRateLimit).subscribe(this.applyChanges);
            this.sizeConfig.extend(consts_1.ChangeRateLimit).subscribe(this.applyChanges);
            this.eventManager.addEventListener(events_1.CommonEvents.onViewportChange, this.updateObservables);
        });
    }
    updateObservables() {
        var _a, _b, _c;
        const viewport = this.viewManager.getViewport();
        const sectionStyles = (_b = (_a = this.model) === null || _a === void 0 ? void 0 : _a.styles) === null || _b === void 0 ? void 0 : _b.instance;
        if (sectionStyles) {
            this.background(sectionStyles.background);
        }
        this.gridModel = this.model.widgets[0];
        const gridStyles = (_c = this.gridModel) === null || _c === void 0 ? void 0 : _c.styles;
        if (gridStyles) {
            const containerSizeStyles = Objects.getObjectAt(`instance/size/${viewport}`, gridStyles);
            this.sizeConfig(containerSizeStyles);
        }
    }
    applyChanges() {
        var _a;
        const viewport = this.viewManager.getViewport();
        this.model.styles = this.model.styles || {};
        if (this.model.styles.instance && !this.model.styles.instance.key) {
            this.model.styles.instance.key = Utils.randomClassName();
        }
        const gridStyles = (_a = this.gridModel) === null || _a === void 0 ? void 0 : _a.styles;
        if (gridStyles) {
            const containerSizeStyles = this.sizeConfig();
            Objects.setValue(`instance/size/${viewport}`, gridStyles, containerSizeStyles);
        }
        this.onChange(this.model);
    }
    onBackgroundUpdate(background) {
        Objects.setValue("instance/background", this.model.styles, background);
        this.applyChanges();
    }
    onSizeUpdate(sizeConfig) {
        this.sizeConfig(sizeConfig);
    }
};
__decorate([
    decorators_1.Param(),
    __metadata("design:type", carouselModel_1.CarouselItemModel)
], CarouselItemEditor.prototype, "model", void 0);
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], CarouselItemEditor.prototype, "onChange", void 0);
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CarouselItemEditor.prototype, "initialize", null);
CarouselItemEditor = __decorate([
    decorators_1.Component({
        selector: "carousel-item-editor",
        template: carouselItemEditor_html_1.default
    }),
    __metadata("design:paramtypes", [Object, Object])
], CarouselItemEditor);
exports.CarouselItemEditor = CarouselItemEditor;
//# sourceMappingURL=carouselItemEditor.js.map