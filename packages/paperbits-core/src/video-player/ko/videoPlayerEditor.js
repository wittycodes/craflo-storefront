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
exports.VideoPlayerEditor = void 0;
const ko = require("knockout");
const Objects = require("@paperbits/common/objects");
const videoPlayerEditor_html_1 = require("./videoPlayerEditor.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
const videoPlayerModel_1 = require("../videoPlayerModel");
const styleService_1 = require("@paperbits/styles/styleService");
const consts_1 = require("@paperbits/common/ko/consts");
const styles_1 = require("@paperbits/styles");
const events_1 = require("@paperbits/common/events");
let VideoPlayerEditor = class VideoPlayerEditor {
    constructor(viewManager, eventManager, styleService, mediaPermalinkResolver) {
        this.viewManager = viewManager;
        this.eventManager = eventManager;
        this.styleService = styleService;
        this.mediaPermalinkResolver = mediaPermalinkResolver;
        this.sourceUrl = ko.observable();
        this.controls = ko.observable(true);
        this.autoplay = ko.observable(false);
        this.appearanceStyles = ko.observableArray();
        this.appearanceStyle = ko.observable();
        this.sizeConfig = ko.observable();
        this.mimeType = "video/mp4";
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            let sourceUrl;
            if (this.model.sourceKey) {
                sourceUrl = yield this.mediaPermalinkResolver.getUrlByTargetKey(this.model.sourceKey);
            }
            this.sourceUrl(sourceUrl);
            const variations = yield this.styleService.getComponentVariations("videoPlayer");
            this.appearanceStyles(variations.filter(x => x.category === "appearance"));
            this.updateObservables();
            this.eventManager.addEventListener(events_1.CommonEvents.onViewportChange, this.updateObservables);
            this.controls
                .extend(consts_1.ChangeRateLimit)
                .subscribe(this.applyChanges);
            this.autoplay
                .extend(consts_1.ChangeRateLimit)
                .subscribe(this.applyChanges);
            this.appearanceStyle
                .extend(consts_1.ChangeRateLimit)
                .subscribe(this.onAppearanceChange);
        });
    }
    updateObservables() {
        var _a, _b;
        const viewport = this.viewManager.getViewport();
        this.controls(this.model.controls);
        this.autoplay(this.model.autoplay);
        const sizeStyles = styles_1.StyleHelper.getPluginConfigForLocalStyles(this.model.styles, "size", viewport);
        this.sizeConfig(sizeStyles);
        this.appearanceStyle((_b = (_a = this.model) === null || _a === void 0 ? void 0 : _a.styles) === null || _b === void 0 ? void 0 : _b.appearance);
    }
    onMediaSelected(media) {
        if (media) {
            this.model.sourceKey = media.key;
            this.sourceUrl(media.downloadUrl);
        }
        else {
            this.model.sourceKey = undefined;
            this.sourceUrl(null);
        }
        this.onChange(this.model);
    }
    onSizeChange(pluginConfig) {
        const viewport = this.viewManager.getViewport();
        styles_1.StyleHelper.setPluginConfigForLocalStyles(this.model.styles, "size", pluginConfig, viewport);
        this.onChange(this.model);
    }
    onAppearanceChange(variationKey) {
        Objects.setValue(`styles/appearance`, this.model, variationKey);
        this.onChange(this.model);
    }
    applyChanges() {
        this.model.controls = this.controls();
        this.model.autoplay = this.autoplay();
        this.onChange(this.model);
    }
};
__decorate([
    decorators_1.Param(),
    __metadata("design:type", videoPlayerModel_1.VideoPlayerModel)
], VideoPlayerEditor.prototype, "model", void 0);
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], VideoPlayerEditor.prototype, "onChange", void 0);
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VideoPlayerEditor.prototype, "initialize", null);
VideoPlayerEditor = __decorate([
    decorators_1.Component({
        selector: "video-player-editor",
        template: videoPlayerEditor_html_1.default
    }),
    __metadata("design:paramtypes", [Object, Object, styleService_1.StyleService, Object])
], VideoPlayerEditor);
exports.VideoPlayerEditor = VideoPlayerEditor;
//# sourceMappingURL=videoPlayerEditor.js.map