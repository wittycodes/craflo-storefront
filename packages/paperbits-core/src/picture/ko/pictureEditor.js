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
exports.PictureEditor = void 0;
const ko = require("knockout");
const pictureEditor_html_1 = require("./pictureEditor.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
const background_1 = require("@paperbits/common/widgets/background");
const pictureModel_1 = require("../pictureModel");
const styleService_1 = require("@paperbits/styles/styleService");
const consts_1 = require("@paperbits/common/ko/consts");
let PictureEditor = class PictureEditor {
    constructor(styleService, mediaPermalinkResolver) {
        this.styleService = styleService;
        this.mediaPermalinkResolver = mediaPermalinkResolver;
        this.caption = ko.observable();
        this.hyperlink = ko.observable();
        this.sourceKey = ko.observable();
        this.background = ko.observable();
        this.hyperlinkTitle = ko.computed(() => this.hyperlink() ? this.hyperlink().title : "Add a link...");
        this.sizeConfig = ko.observable();
        this.appearanceStyles = ko.observableArray();
        this.appearanceStyle = ko.observable();
    }
    initialize() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.model.sourceKey) {
                const background = new background_1.BackgroundModel();
                background.sourceKey = this.model.sourceKey;
                background.sourceUrl = yield this.mediaPermalinkResolver.getUrlByTargetKey(this.model.sourceKey);
                this.background(background);
                this.sourceKey(this.model.sourceKey);
            }
            this.caption(this.model.caption);
            this.hyperlink(this.model.hyperlink);
            this.sizeConfig({ width: this.model.width, height: this.model.height });
            const variations = yield this.styleService.getComponentVariations("picture");
            this.appearanceStyles(variations.filter(x => x.category === "appearance"));
            this.appearanceStyle((_a = this.model.styles) === null || _a === void 0 ? void 0 : _a.appearance);
            this.caption.extend(consts_1.ChangeRateLimit).subscribe(this.applyChanges);
            this.sizeConfig.extend(consts_1.ChangeRateLimit).subscribe(this.applyChanges);
            this.appearanceStyle.extend(consts_1.ChangeRateLimit).subscribe(this.applyChanges);
        });
    }
    onVariationSelected(snippet) {
        if (snippet) {
            this.appearanceStyle(snippet);
        }
    }
    applyChanges() {
        this.model.caption = this.caption();
        this.model.hyperlink = this.hyperlink();
        this.model.sourceKey = this.sourceKey();
        const appearanceStyle = this.appearanceStyle();
        if (appearanceStyle) {
            this.model.styles = {
                appearance: this.appearanceStyle()
            };
        }
        this.onChange(this.model);
    }
    onMediaSelected(media) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!media) {
                this.background(null);
                this.sourceKey(null);
            }
            else {
                this.sourceKey(media.key);
                const background = new background_1.BackgroundModel();
                background.sourceKey = media.key;
                background.sourceUrl = media.downloadUrl;
                background.size = "contain";
                background.position = "center center";
                this.background(background);
                yield this.updateSizeConfigForSelectedMedia(media);
            }
            this.applyChanges();
        });
    }
    updateSizeConfigForSelectedMedia(media) {
        if (!media.downloadUrl) {
            return;
        }
        return new Promise(resolve => {
            const selectedMedia = new Image();
            selectedMedia.src = media.downloadUrl;
            selectedMedia.onload = () => {
                let width = selectedMedia.width;
                let height = selectedMedia.height;
                if (!media.mimeType.startsWith("image/svg")) {
                    const pixelRatio = devicePixelRatio || 1;
                    width = selectedMedia.width / pixelRatio;
                    height = selectedMedia.height / pixelRatio;
                }
                this.model.width = width;
                this.model.height = height;
                this.sizeConfig({ width: width, height: height });
                resolve();
            };
        });
    }
    onHyperlinkChange(hyperlink) {
        this.hyperlink(hyperlink);
        this.applyChanges();
    }
    onSizeChange(sizeConfig) {
        this.model.width = sizeConfig.width;
        this.model.height = sizeConfig.height;
        this.applyChanges();
    }
};
__decorate([
    decorators_1.Param(),
    __metadata("design:type", pictureModel_1.PictureModel)
], PictureEditor.prototype, "model", void 0);
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], PictureEditor.prototype, "onChange", void 0);
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PictureEditor.prototype, "initialize", null);
PictureEditor = __decorate([
    decorators_1.Component({
        selector: "picture-editor",
        template: pictureEditor_html_1.default
    }),
    __metadata("design:paramtypes", [styleService_1.StyleService, Object])
], PictureEditor);
exports.PictureEditor = PictureEditor;
//# sourceMappingURL=pictureEditor.js.map