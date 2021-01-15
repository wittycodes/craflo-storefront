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
exports.MapEditor = void 0;
const ko = require("knockout");
const mapEditor_html_1 = require("./mapEditor.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
const mapModel_1 = require("../mapModel");
const consts_1 = require("@paperbits/common/ko/consts");
const styles_1 = require("@paperbits/styles");
const events_1 = require("@paperbits/common/events");
let MapEditor = class MapEditor {
    constructor(viewManager, eventManager, styleService) {
        this.viewManager = viewManager;
        this.eventManager = eventManager;
        this.styleService = styleService;
        this.location = ko.observable();
        this.caption = ko.observable();
        this.zoom = ko.observable(17);
        this.layout = ko.observable();
        this.mapType = ko.observable("terrain");
        this.sizeConfig = ko.observable();
        this.mapTypeOptions = ko.observableArray([
            { label: "Terrain", value: "terrain" },
            { label: "Satellite", value: "satellite" },
            { label: "Hybrid", value: "hybrid" }
        ]);
    }
    initialize() {
        this.location(this.model.location);
        this.caption(this.model.caption);
        this.zoom(this.model.zoom);
        this.mapType(this.model.mapType);
        this.updateObservables();
        this.eventManager.addEventListener(events_1.CommonEvents.onViewportChange, this.updateObservables);
        this.location
            .extend(consts_1.ChangeRateLimit)
            .subscribe(this.applyChanges);
        this.caption
            .extend(consts_1.ChangeRateLimit)
            .subscribe(this.applyChanges);
        this.zoom
            .extend(consts_1.ChangeRateLimit)
            .subscribe(this.applyChanges);
        this.mapType
            .extend(consts_1.ChangeRateLimit)
            .subscribe(this.applyChanges);
    }
    updateObservables() {
        const viewport = this.viewManager.getViewport();
        const sizeStyles = styles_1.StyleHelper.getPluginConfigForLocalStyles(this.model.styles, "size", viewport);
        this.sizeConfig(sizeStyles);
    }
    applyChanges() {
        this.model.caption = this.caption();
        this.model.location = this.location();
        this.model.zoom = this.zoom();
        this.model.mapType = this.mapType();
        this.onChange(this.model);
    }
    onSizeChange(pluginConfig) {
        const viewport = this.viewManager.getViewport();
        styles_1.StyleHelper.setPluginConfigForLocalStyles(this.model.styles, "size", pluginConfig, viewport);
        this.onChange(this.model);
        console.log(this.model);
    }
};
__decorate([
    decorators_1.Param(),
    __metadata("design:type", mapModel_1.MapModel)
], MapEditor.prototype, "model", void 0);
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], MapEditor.prototype, "onChange", void 0);
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MapEditor.prototype, "initialize", null);
MapEditor = __decorate([
    decorators_1.Component({
        selector: "paperbits-map-editor",
        template: mapEditor_html_1.default
    }),
    __metadata("design:paramtypes", [Object, Object, styles_1.StyleService])
], MapEditor);
exports.MapEditor = MapEditor;
//# sourceMappingURL=mapEditor.js.map