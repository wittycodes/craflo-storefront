"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.BackgroundStylePlugin = void 0;
var Objects = require("@paperbits/common");
var stylePlugin_1 = require("../stylePlugin");
var contracts_1 = require("../../contracts");
var styles_1 = require("@paperbits/common/styles");
var BackgroundStylePlugin = (function (_super) {
    __extends(BackgroundStylePlugin, _super);
    function BackgroundStylePlugin(themeContract, mediaPermalinkResolver) {
        var _this = _super.call(this) || this;
        _this.themeContract = themeContract;
        _this.mediaPermalinkResolver = mediaPermalinkResolver;
        _this.name = "background";
        return _this;
    }
    BackgroundStylePlugin.prototype.setThemeContract = function (themeContract) {
        this.themeContract = themeContract;
    };
    BackgroundStylePlugin.prototype.configToStyleRules = function (pluginConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var rules, backgroundImage, backgroundPosition, backgroundRepeat, backgroundSize, backgroundAttachment, color, _i, _a, image, imageUrl, gradient;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        rules = [];
                        backgroundImage = [];
                        backgroundPosition = [];
                        backgroundRepeat = [];
                        backgroundSize = [];
                        backgroundAttachment = [];
                        if (pluginConfig.colorKey) {
                            color = Objects.getObjectAt(pluginConfig.colorKey, this.themeContract);
                            if (color) {
                                rules.push(new styles_1.StyleRule("backgroundColor", color.value));
                            }
                            else {
                                console.warn("Color with key \"" + pluginConfig.colorKey + "\" not found. Elements using it will fallback to parent's definition.");
                            }
                        }
                        if (!(pluginConfig.images && pluginConfig.images.length > 0)) return [3, 4];
                        _i = 0, _a = pluginConfig.images;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3, 4];
                        image = _a[_i];
                        return [4, this.mediaPermalinkResolver.getUrlByTargetKey(image.sourceKey)];
                    case 2:
                        imageUrl = _b.sent();
                        if (!imageUrl) {
                            console.warn("Unable to set background image. Media with source key " + image.sourceKey + " not found.");
                            return [3, 3];
                        }
                        backgroundImage.push("url('" + imageUrl + "')");
                        backgroundPosition.push(image.position || "unset");
                        backgroundSize.push(image.size || "unset");
                        backgroundRepeat.push(image.repeat || "no-repeat");
                        backgroundAttachment.push(image.attachment || "unset");
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3, 1];
                    case 4:
                        if (pluginConfig.gradientKey) {
                            gradient = Objects.getObjectAt(pluginConfig.gradientKey, this.themeContract);
                            if (gradient) {
                                backgroundImage.push(contracts_1.getLinearGradientString(gradient));
                            }
                            else {
                                backgroundImage.push("none");
                                console.warn("Gradient with key \"" + pluginConfig.gradientKey + "\" not found. Elements using it will fallback to parent's definition.");
                            }
                        }
                        if (backgroundImage.length > 0) {
                            rules.push(new styles_1.StyleRule("backgroundImage", backgroundImage.join(",")));
                        }
                        if (backgroundPosition.length > 0) {
                            rules.push(new styles_1.StyleRule("backgroundPosition", backgroundPosition.join(",")));
                        }
                        if (backgroundSize.length > 0) {
                            rules.push(new styles_1.StyleRule("backgroundSize", backgroundSize.join(",")));
                        }
                        if (backgroundRepeat.length > 0) {
                            rules.push(new styles_1.StyleRule("backgroundRepeat", backgroundRepeat.join(",")));
                        }
                        if (backgroundAttachment.length > 0) {
                            rules.push(new styles_1.StyleRule("backgroundAttachment", backgroundAttachment.join(",")));
                        }
                        return [2, rules];
                }
            });
        });
    };
    return BackgroundStylePlugin;
}(stylePlugin_1.StylePlugin));
exports.BackgroundStylePlugin = BackgroundStylePlugin;
