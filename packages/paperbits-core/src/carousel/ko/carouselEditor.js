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
exports.CarouselEditor = void 0;
const ko = require("knockout");
const Utils = require("@paperbits/common");
const Objects = require("@paperbits/common/objects");
const carouselEditor_html_1 = require("./carouselEditor.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
const carouselModel_1 = require("../carouselModel");
const consts_1 = require("@paperbits/common/ko/consts");
const events_1 = require("@paperbits/common/events");
let CarouselEditor = class CarouselEditor {
    constructor(viewManager, eventManager) {
        this.viewManager = viewManager;
        this.eventManager = eventManager;
        this.sizeConfig = ko.observable();
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            this.updateObservables();
            this.sizeConfig.extend(consts_1.ChangeRateLimit).subscribe(this.applyChanges);
            this.eventManager.addEventListener(events_1.CommonEvents.onViewportChange, this.updateObservables);
        });
    }
    updateObservables() {
        const viewport = this.viewManager.getViewport();
        const containerSizeStyles = Objects.getObjectAt(`instance/size/${viewport}`, this.model.styles);
        this.sizeConfig(containerSizeStyles);
    }
    applyChanges() {
        const viewport = this.viewManager.getViewport();
        this.model.styles = this.model.styles || {};
        if (this.model.styles.instance && !this.model.styles.instance.key) {
            this.model.styles.instance.key = Utils.randomClassName();
        }
        const containerSizeStyles = this.sizeConfig();
        Objects.setValue(`instance/size/${viewport}`, this.model.styles, containerSizeStyles);
        this.onChange(this.model);
    }
    onSizeUpdate(sizeConfig) {
        this.sizeConfig(sizeConfig);
    }
};
__decorate([
    decorators_1.Param(),
    __metadata("design:type", carouselModel_1.CarouselModel)
], CarouselEditor.prototype, "model", void 0);
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], CarouselEditor.prototype, "onChange", void 0);
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CarouselEditor.prototype, "initialize", null);
CarouselEditor = __decorate([
    decorators_1.Component({
        selector: "carousel-editor",
        template: carouselEditor_html_1.default
    }),
    __metadata("design:paramtypes", [Object, Object])
], CarouselEditor);
exports.CarouselEditor = CarouselEditor;
//# sourceMappingURL=carouselEditor.js.map