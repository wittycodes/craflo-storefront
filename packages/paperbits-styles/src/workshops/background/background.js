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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Background = void 0;
var ko = require("knockout");
var Objects = require("@paperbits/common");
var background_html_1 = require("./background.html");
var decorators_1 = require("@paperbits/common/ko/decorators");
var styles_1 = require("@paperbits/common/styles");
var __1 = require("../..");
var backgroundStylePlugin_1 = require("../../plugins/background/backgroundStylePlugin");
var consts_1 = require("@paperbits/common/ko/consts");
var defaultBackgroundSize = "original";
var defaultBackgroundAttachment = "inherit";
var Background = (function () {
    function Background(styleService, mediaService, mediaPermalinkResolver) {
        this.styleService = styleService;
        this.mediaService = mediaService;
        this.mediaPermalinkResolver = mediaPermalinkResolver;
        this.size = ko.observable();
        this.position = ko.observable();
        this.attachment = ko.observable();
        this.color = ko.observable();
        this.colorKey = ko.observable();
        this.gradientKey = ko.observable();
        this.repeat = ko.observable();
        this.background = ko.observable();
        this.source = ko.observable();
        this.sourceKey = ko.observable();
        this.backgroundPreview = ko.observable();
        this.direction = ko.observable();
        this.horizontalOffsetDirection = ko.observable();
        this.verticalOffsetDirection = ko.observable();
        this.horizontalOffset = ko.observable();
        this.vertialOffset = ko.observable();
    }
    Background.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.fillout()];
                    case 1:
                        _a.sent();
                        this.background.subscribe(this.fillout);
                        this.size.subscribe(this.applyChanges);
                        this.attachment.subscribe(this.applyChanges);
                        this.horizontalOffset.extend(consts_1.ChangeRateLimit).subscribe(this.applyDirectionOffset);
                        this.vertialOffset.extend(consts_1.ChangeRateLimit).subscribe(this.applyDirectionOffset);
                        return [2];
                }
            });
        });
    };
    Background.prototype.getBackgroundStylePlugin = function (themeContract) {
        if (!this.backgroundStylePlugin) {
            this.backgroundStylePlugin = new backgroundStylePlugin_1.BackgroundStylePlugin(themeContract, this.mediaPermalinkResolver);
        }
        return this.backgroundStylePlugin;
    };
    Background.prototype.fillout = function () {
        return __awaiter(this, void 0, void 0, function () {
            var backgroundPluginConfig, styles, styleRules, style, styleSheet, colorContract, image, media;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        backgroundPluginConfig = this.background();
                        if (!backgroundPluginConfig) {
                            this.size(null);
                            this.position(null);
                            this.attachment(null);
                            this.color(null);
                            this.colorKey(null);
                            this.gradientKey(null);
                            this.repeat(null);
                            this.source(null);
                            this.sourceKey(null);
                            this.backgroundPreview(null);
                            this.clearBackgroundImageOffset();
                            return [2];
                        }
                        return [4, this.styleService.getStyles()];
                    case 1:
                        styles = _a.sent();
                        return [4, this.getBackgroundStylePlugin(styles).configToStyleRules(backgroundPluginConfig)];
                    case 2:
                        styleRules = _a.sent();
                        style = new styles_1.Style("background-preview");
                        style.addRules(styleRules);
                        styleSheet = new styles_1.StyleSheet();
                        styleSheet.styles.push(style);
                        this.backgroundPreview(styleSheet);
                        if (backgroundPluginConfig.colorKey) {
                            colorContract = Objects.getObjectAt(backgroundPluginConfig.colorKey, styles);
                            if (colorContract) {
                                this.color(colorContract);
                                this.colorKey(backgroundPluginConfig.colorKey);
                            }
                            else {
                                console.warn("Color with key \"" + backgroundPluginConfig.colorKey + "\" not found. Elements using it will fallback to parent's definition.");
                            }
                        }
                        if (!(backgroundPluginConfig.images && backgroundPluginConfig.images.length > 0)) return [3, 4];
                        image = backgroundPluginConfig.images[0];
                        this.sourceKey(image.sourceKey);
                        this.repeat(image.repeat || "no-repeat");
                        this.size(image.size || defaultBackgroundSize);
                        this.attachment(image.attachment || defaultBackgroundAttachment);
                        this.position(image.position || "center");
                        return [4, this.mediaService.getMediaByKey(image.sourceKey)];
                    case 3:
                        media = _a.sent();
                        if (media) {
                            this.source("url(\"" + media.downloadUrl + "\")");
                        }
                        _a.label = 4;
                    case 4:
                        if (backgroundPluginConfig.gradientKey) {
                            this.gradientKey(backgroundPluginConfig.gradientKey);
                        }
                        return [2];
                }
            });
        });
    };
    Background.prototype.onAlignmentChange = function (position) {
        this.direction(position);
        this.clearBackgroundImageOffset();
        if (position.includes("left")) {
            this.horizontalOffsetDirection("left");
        }
        else if (position.includes("right")) {
            this.horizontalOffsetDirection("right");
        }
        else {
            this.horizontalOffsetDirection("center");
        }
        if (position.includes("top")) {
            this.verticalOffsetDirection("top");
        }
        else if (position.includes("bottom")) {
            this.verticalOffsetDirection("bottom");
        }
        else {
            this.verticalOffsetDirection("center");
        }
        this.applyDirectionOffset();
    };
    Background.prototype.applyDirectionOffset = function () {
        var position = "";
        if (!this.horizontalOffsetDirection() || this.horizontalOffsetDirection() === "center") {
            position += "center ";
        }
        else {
            position += this.horizontalOffsetDirection() + " " + (this.horizontalOffset() || 0) + "px ";
        }
        if (!this.verticalOffsetDirection() || this.verticalOffsetDirection() === "center") {
            position += "center";
        }
        else {
            position += this.verticalOffsetDirection() + " " + (this.vertialOffset() || 0) + "px";
        }
        this.position(position);
        this.applyChanges();
    };
    Background.prototype.onAttachmentChange = function (attachment) {
        this.attachment(attachment);
        this.applyChanges();
    };
    Background.prototype.onMediaSelected = function (media) {
        this.source(media ? "url(\"" + media.downloadUrl + "\")" : "none");
        this.sourceKey(media ? media.key : undefined);
        this.repeat(this.repeat() || "no-repeat");
        this.size(this.size() || defaultBackgroundSize);
        this.attachment(this.attachment() || defaultBackgroundAttachment);
        this.position(this.position() || "center center");
        this.applyChanges();
    };
    Background.prototype.onColorSelected = function (color) {
        this.color(color);
        this.colorKey(color ? color.key : undefined);
        this.applyChanges();
    };
    Background.prototype.onGradientSelected = function (gradient) {
        this.gradientKey(gradient ? gradient.key : undefined);
        this.applyChanges();
    };
    Background.prototype.clearBackground = function () {
        this.color(undefined);
        this.colorKey(undefined);
        this.source("none");
        this.sourceKey(undefined);
        this.size(undefined);
        this.position(undefined);
        this.attachment(undefined);
        this.gradientKey(undefined);
        this.applyChanges();
    };
    Background.prototype.applyChanges = function () {
        return __awaiter(this, void 0, void 0, function () {
            var images, updatedPluginConfig, styles, styleRules, style, styleSheet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.sourceKey()) {
                            images = [];
                            images.push({
                                sourceKey: this.sourceKey(),
                                position: this.position(),
                                size: this.size() !== defaultBackgroundSize
                                    ? this.size()
                                    : undefined,
                                repeat: this.repeat(),
                                attachment: this.attachment() !== defaultBackgroundAttachment
                                    ? this.attachment()
                                    : undefined,
                            });
                        }
                        updatedPluginConfig = {
                            colorKey: this.colorKey(),
                            gradientKey: this.gradientKey(),
                            images: images
                        };
                        return [4, this.styleService.getStyles()];
                    case 1:
                        styles = _a.sent();
                        return [4, this.getBackgroundStylePlugin(styles).configToStyleRules(updatedPluginConfig)];
                    case 2:
                        styleRules = _a.sent();
                        style = new styles_1.Style("background-preview");
                        style.addRules(styleRules);
                        styleSheet = new styles_1.StyleSheet();
                        styleSheet.styles.push(style);
                        this.backgroundPreview(styleSheet);
                        if (this.onUpdate) {
                            this.onUpdate(updatedPluginConfig);
                        }
                        return [2];
                }
            });
        });
    };
    Background.prototype.clearBackgroundImageOffset = function () {
        this.horizontalOffsetDirection(null);
        this.verticalOffsetDirection(null);
        this.horizontalOffset(0);
        this.vertialOffset(0);
    };
    __decorate([
        decorators_1.Param(),
        __metadata("design:type", Function)
    ], Background.prototype, "background", void 0);
    __decorate([
        decorators_1.Event(),
        __metadata("design:type", Function)
    ], Background.prototype, "onUpdate", void 0);
    __decorate([
        decorators_1.OnMounted(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], Background.prototype, "initialize", null);
    Background = __decorate([
        decorators_1.Component({
            selector: "background",
            template: background_html_1.default
        }),
        __metadata("design:paramtypes", [__1.StyleService, Object, Object])
    ], Background);
    return Background;
}());
exports.Background = Background;
