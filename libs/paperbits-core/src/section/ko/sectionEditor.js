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
exports.SectionEditor = void 0;
const ko = require("knockout");
const Utils = require("@paperbits/common");
const Objects = require("@paperbits/common/objects");
const sectionEditor_html_1 = require("./sectionEditor.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
const sectionModel_1 = require("../sectionModel");
const consts_1 = require("@paperbits/common/ko/consts");
const events_1 = require("@paperbits/common/events");
let SectionEditor = class SectionEditor {
    constructor(viewManager, eventManager) {
        this.viewManager = viewManager;
        this.eventManager = eventManager;
        this.stickTo = ko.observable("none");
        this.stretch = ko.observable(false);
        this.background = ko.observable();
        this.typography = ko.observable();
        this.sizeConfig = ko.observable();
        this.box = ko.observable();
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            this.updateObservables();
            this.stickTo.extend(consts_1.ChangeRateLimit).subscribe(this.applyChanges);
            this.stretch.extend(consts_1.ChangeRateLimit).subscribe(this.applyChanges);
            this.background.extend(consts_1.ChangeRateLimit).subscribe(this.applyChanges);
            this.typography.extend(consts_1.ChangeRateLimit).subscribe(this.applyChanges);
            this.box.extend(consts_1.ChangeRateLimit).subscribe(this.applyChanges);
            this.sizeConfig.extend(consts_1.ChangeRateLimit).subscribe(this.applyChanges);
            this.eventManager.addEventListener(events_1.CommonEvents.onViewportChange, this.updateObservables);
        });
    }
    updateObservables() {
        const viewport = this.viewManager.getViewport();
        if (this.model.styles) {
            if (this.model.styles.instance) {
                const sectionStyles = this.model.styles.instance;
                if (sectionStyles) {
                    this.background(sectionStyles.background);
                    this.typography(sectionStyles.typography);
                }
            }
            const stickToStyles = Objects.getObjectAt(`instance/stickTo/${viewport}`, this.model.styles);
            if (stickToStyles) {
                this.stickTo(stickToStyles);
            }
            const stretchStyle = Objects.getObjectAt(`instance/size/${viewport}/stretch`, this.model.styles);
            this.stretch(!!stretchStyle);
        }
        this.gridModel = this.model.widgets[0];
        const gridStyles = this.gridModel.styles;
        const containerSizeStyles = Objects.getObjectAt(`instance/size/${viewport}`, gridStyles);
        const marginStyles = Objects.getObjectAt(`instance/margin/${viewport}`, gridStyles);
        this.box({ margin: marginStyles });
        this.sizeConfig(containerSizeStyles);
    }
    applyChanges() {
        const viewport = this.viewManager.getViewport();
        this.model.styles = this.model.styles || {};
        if (this.model.styles.instance && !this.model.styles.instance.key) {
            this.model.styles.instance.key = Utils.randomClassName();
        }
        const gridStyles = this.gridModel.styles;
        const containerSizeStyles = this.sizeConfig();
        Objects.setValue(`instance/size/${viewport}`, gridStyles, containerSizeStyles);
        const marginStyle = this.box().margin;
        Objects.cleanupObject(marginStyle);
        Objects.setValue(`instance/margin/${viewport}`, gridStyles, marginStyle);
        Objects.setValue(`instance/stickTo/${viewport}`, this.model.styles, this.stickTo());
        Objects.setValue(`instance/size/${viewport}/stretch`, this.model.styles, this.stretch());
        this.onChange(this.model);
    }
    onBackgroundUpdate(background) {
        Objects.setValue("instance/background", this.model.styles, background);
        this.applyChanges();
    }
    onTypographyUpdate(typography) {
        Objects.setValue("instance/typography", this.model.styles, typography);
        this.applyChanges();
    }
    onBoxUpdate(pluginConfig) {
        this.box(pluginConfig);
    }
    onSizeUpdate(sizeConfig) {
        this.sizeConfig(sizeConfig);
    }
};
__decorate([
    decorators_1.Param(),
    __metadata("design:type", sectionModel_1.SectionModel)
], SectionEditor.prototype, "model", void 0);
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], SectionEditor.prototype, "onChange", void 0);
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SectionEditor.prototype, "initialize", null);
SectionEditor = __decorate([
    decorators_1.Component({
        selector: "layout-section-editor",
        template: sectionEditor_html_1.default
    }),
    __metadata("design:paramtypes", [Object, Object])
], SectionEditor);
exports.SectionEditor = SectionEditor;
//# sourceMappingURL=sectionEditor.js.map