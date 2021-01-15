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
exports.CardEditor = void 0;
const ko = require("knockout");
const Objects = require("@paperbits/common/objects");
const cardEditor_html_1 = require("./cardEditor.html");
const styles_1 = require("@paperbits/styles");
const decorators_1 = require("@paperbits/common/ko/decorators");
const cardModel_1 = require("../cardModel");
let CardEditor = class CardEditor {
    constructor(viewManager, styleService, eventManager) {
        this.viewManager = viewManager;
        this.styleService = styleService;
        this.eventManager = eventManager;
        this.appearanceStyles = ko.observableArray();
        this.appearanceStyle = ko.observable();
        this.containerConfig = ko.observable();
        this.background = ko.observable();
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            const variations = yield this.styleService.getComponentVariations("card");
            this.appearanceStyles(variations.filter(x => x.category === "appearance"));
            this.updateObservables();
            this.appearanceStyle.subscribe(this.onAppearanceChange);
            this.eventManager.addEventListener("onViewportChange", this.updateObservables);
        });
    }
    updateObservables() {
        const viewport = this.viewManager.getViewport();
        const containerStyleConfig = styles_1.StyleHelper.getPluginConfigForLocalStyles(this.model.styles, "container", viewport);
        this.containerConfig(containerStyleConfig);
        const backgroundStyleConfig = styles_1.StyleHelper.getPluginConfigForLocalStyles(this.model.styles, "background", viewport);
        this.background(backgroundStyleConfig);
        this.appearanceStyle(this.model.styles.appearance);
    }
    onContainerChange(pluginConfig) {
        const viewport = this.viewManager.getViewport();
        styles_1.StyleHelper.setPluginConfigForLocalStyles(this.model.styles, "container", pluginConfig, viewport);
        this.onChange(this.model);
    }
    onBackgroundChange(pluginConfig) {
        styles_1.StyleHelper.setPluginConfigForLocalStyles(this.model.styles, "background", pluginConfig);
        this.onChange(this.model);
    }
    onAppearanceChange() {
        Objects.setValue("styles/appearance", this.model, this.appearanceStyle());
        this.onChange(this.model);
    }
};
__decorate([
    decorators_1.Param(),
    __metadata("design:type", cardModel_1.CardModel)
], CardEditor.prototype, "model", void 0);
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], CardEditor.prototype, "onChange", void 0);
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CardEditor.prototype, "initialize", null);
CardEditor = __decorate([
    decorators_1.Component({
        selector: "card-editor",
        template: cardEditor_html_1.default
    }),
    __metadata("design:paramtypes", [Object, styles_1.StyleService, Object])
], CardEditor);
exports.CardEditor = CardEditor;
//# sourceMappingURL=cardEditor.js.map