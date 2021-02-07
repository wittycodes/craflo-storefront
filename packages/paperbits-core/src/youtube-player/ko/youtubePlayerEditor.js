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
exports.YoutubePlayerEditor = void 0;
const ko = require("knockout");
const youtubePlayerEditor_html_1 = require("./youtubePlayerEditor.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
const styles_1 = require("@paperbits/styles");
const youtubePlayerModel_1 = require("../youtubePlayerModel");
const consts_1 = require("@paperbits/common/ko/consts");
const events_1 = require("@paperbits/common/events");
let YoutubePlayerEditor = class YoutubePlayerEditor {
    constructor(viewManager, eventManager) {
        this.viewManager = viewManager;
        this.eventManager = eventManager;
        this.videoId = ko.observable();
        this.controls = ko.observable();
        this.autoplay = ko.observable();
        this.loop = ko.observable();
        this.sizeConfig = ko.observable();
    }
    initialize() {
        this.updateObservables();
        this.eventManager.addEventListener(events_1.CommonEvents.onViewportChange, this.updateObservables);
        this.videoId
            .extend(consts_1.ChangeRateLimit)
            .subscribe(this.applyChanges);
        this.controls
            .extend(consts_1.ChangeRateLimit)
            .subscribe(this.applyChanges);
        this.autoplay
            .extend(consts_1.ChangeRateLimit)
            .subscribe(this.applyChanges);
        this.loop
            .extend(consts_1.ChangeRateLimit)
            .subscribe(this.applyChanges);
    }
    updateObservables() {
        const viewport = this.viewManager.getViewport();
        const sizeStyles = styles_1.StyleHelper.getPluginConfigForLocalStyles(this.model.styles, "size", viewport);
        this.sizeConfig(sizeStyles);
        this.videoId(this.model.videoId);
        this.controls(this.model.controls);
        this.autoplay(this.model.autoplay);
        this.loop(this.model.loop);
    }
    onSizeChange(pluginConfig) {
        const viewport = this.viewManager.getViewport();
        styles_1.StyleHelper.setPluginConfigForLocalStyles(this.model.styles, "size", pluginConfig, viewport);
        this.applyChanges();
    }
    applyChanges() {
        this.model.videoId = this.videoId();
        this.model.controls = this.controls();
        this.model.autoplay = this.autoplay();
        this.model.loop = this.loop();
        this.onChange(this.model);
    }
};
__decorate([
    decorators_1.Param(),
    __metadata("design:type", youtubePlayerModel_1.YoutubePlayerModel)
], YoutubePlayerEditor.prototype, "model", void 0);
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], YoutubePlayerEditor.prototype, "onChange", void 0);
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], YoutubePlayerEditor.prototype, "initialize", null);
YoutubePlayerEditor = __decorate([
    decorators_1.Component({
        selector: "youtube-player-editor",
        template: youtubePlayerEditor_html_1.default
    }),
    __metadata("design:paramtypes", [Object, Object])
], YoutubePlayerEditor);
exports.YoutubePlayerEditor = YoutubePlayerEditor;
//# sourceMappingURL=youtubePlayerEditor.js.map