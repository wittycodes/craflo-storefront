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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollapsiblePanelEditor = void 0;
const ko = require("knockout");
const collapsiblePanelEditor_html_1 = require("./collapsiblePanelEditor.html");
const collapsiblePanelModel_1 = require("../collapsiblePanelModel");
const decorators_1 = require("@paperbits/common/ko/decorators");
const events_1 = require("@paperbits/common/events");
const styles_1 = require("@paperbits/styles");
let CollapsiblePanelEditor = class CollapsiblePanelEditor {
    constructor(viewManager, eventManager) {
        this.viewManager = viewManager;
        this.eventManager = eventManager;
        this.backgroundConfig = ko.observable();
        this.containerConfig = ko.observable();
        this.sizeConfig = ko.observable();
    }
    initialize() {
        this.updateObservables();
        this.eventManager.addEventListener(events_1.CommonEvents.onViewportChange, this.updateObservables);
    }
    updateObservables() {
        const viewport = this.viewManager.getViewport();
        const containerStyleConfig = styles_1.StyleHelper.getPluginConfigForLocalStyles(this.model.styles, "container", viewport);
        this.containerConfig(containerStyleConfig);
        const backgroundStyleConfig = styles_1.StyleHelper.getPluginConfigForLocalStyles(this.model.styles, "background", viewport);
        this.backgroundConfig(backgroundStyleConfig);
        const sizeStyleConfig = styles_1.StyleHelper.getPluginConfigForLocalStyles(this.model.styles, "size", viewport);
        this.sizeConfig(sizeStyleConfig);
    }
    onContainerChange(pluginConfig) {
        const viewport = this.viewManager.getViewport();
        styles_1.StyleHelper.setPluginConfigForLocalStyles(this.model.styles, "container", pluginConfig, viewport);
        this.onChange(this.model);
    }
    onBackgroundChange(pluginConfig) {
        const viewport = this.viewManager.getViewport();
        styles_1.StyleHelper.setPluginConfigForLocalStyles(this.model.styles, "background", pluginConfig, viewport);
        this.onChange(this.model);
    }
    onSizeChange(pluginConfig) {
        const viewport = this.viewManager.getViewport();
        styles_1.StyleHelper.setPluginConfigForLocalStyles(this.model.styles, "size", pluginConfig, viewport);
        this.onChange(this.model);
    }
    dispose() {
        this.eventManager.removeEventListener(events_1.CommonEvents.onViewportChange, this.initialize);
    }
};
__decorate([
    decorators_1.Param(),
    __metadata("design:type", collapsiblePanelModel_1.CollapsiblePanelModel)
], CollapsiblePanelEditor.prototype, "model", void 0);
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], CollapsiblePanelEditor.prototype, "onChange", void 0);
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CollapsiblePanelEditor.prototype, "initialize", null);
__decorate([
    decorators_1.OnDestroyed(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CollapsiblePanelEditor.prototype, "dispose", null);
CollapsiblePanelEditor = __decorate([
    decorators_1.Component({
        selector: "collapsible-panel-editor",
        template: collapsiblePanelEditor_html_1.default
    }),
    __metadata("design:paramtypes", [Object, Object])
], CollapsiblePanelEditor);
exports.CollapsiblePanelEditor = CollapsiblePanelEditor;
//# sourceMappingURL=collapsiblePanelEditor.js.map