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
exports.TypographyStylePlugin = void 0;
var Objects = require("@paperbits/common");
var stylePlugin_1 = require("./stylePlugin");
var styles_1 = require("@paperbits/common/styles");
var TypographyStylePlugin = (function (_super) {
    __extends(TypographyStylePlugin, _super);
    function TypographyStylePlugin(themeContract) {
        var _this = _super.call(this) || this;
        _this.themeContract = themeContract;
        _this.name = "typography";
        return _this;
    }
    TypographyStylePlugin.prototype.setThemeContract = function (themeContract) {
        this.themeContract = themeContract;
    };
    TypographyStylePlugin.prototype.configToStyleRules = function (pluginConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var result, fontContract, colorContract, shadowContract, x, y, blur_1, color;
            return __generator(this, function (_a) {
                result = [];
                if (pluginConfig.fontWeight) {
                    result.push(new styles_1.StyleRule("fontWeight", pluginConfig.fontWeight));
                }
                if (pluginConfig.fontStyle) {
                    result.push(new styles_1.StyleRule("fontStyle", pluginConfig.fontStyle));
                }
                if (pluginConfig.fontSize) {
                    result.push(new styles_1.StyleRule("fontSize", stylePlugin_1.StylePlugin.parseSize(pluginConfig.fontSize)));
                }
                if (pluginConfig.fontKey) {
                    fontContract = Objects.getObjectAt(pluginConfig.fontKey, this.themeContract);
                    if (fontContract) {
                        result.push(new styles_1.StyleRule("fontFamily", fontContract.family));
                    }
                    else {
                        console.warn("Font with key \"" + pluginConfig.fontKey + "\" not found. Elements using it will fallback to parent's definition.");
                    }
                }
                if (pluginConfig.lineHeight) {
                    result.push(new styles_1.StyleRule("lineHeight", stylePlugin_1.StylePlugin.parseSize(pluginConfig.lineHeight)));
                }
                if (pluginConfig.letterSpacing) {
                    result.push(new styles_1.StyleRule("letterSpacing", stylePlugin_1.StylePlugin.parseSize(pluginConfig.letterSpacing)));
                }
                if (pluginConfig.colorKey) {
                    colorContract = Objects.getObjectAt(pluginConfig.colorKey, this.themeContract);
                    if (colorContract) {
                        result.push(new styles_1.StyleRule("color", "" + colorContract.value || "transparent"));
                    }
                    else {
                        console.warn("Color with key \"" + pluginConfig.colorKey + "\" not found. Elements using it will fallback to parent's definition.");
                    }
                }
                if (pluginConfig.shadowKey) {
                    shadowContract = Objects.getObjectAt(pluginConfig.shadowKey, this.themeContract);
                    if (shadowContract) {
                        if (!shadowContract.color) {
                            result.push(new styles_1.StyleRule("textShadow", "none"));
                        }
                        else {
                            x = stylePlugin_1.StylePlugin.parseSize(shadowContract.offsetX);
                            y = stylePlugin_1.StylePlugin.parseSize(shadowContract.offsetY);
                            blur_1 = stylePlugin_1.StylePlugin.parseSize(shadowContract.blur);
                            color = shadowContract.color || "#000";
                            result.push(new styles_1.StyleRule("textShadow", [x, y, blur_1, color].join(" ")));
                        }
                    }
                    else {
                        console.warn("Shadow with key \"" + pluginConfig.shadowKey + "\" not found. Elements using it will fallback to parent's definition.");
                    }
                }
                if (pluginConfig.textAlign) {
                    result.push(new styles_1.StyleRule("textAlign", pluginConfig.textAlign));
                }
                if (pluginConfig.textTransform) {
                    result.push(new styles_1.StyleRule("textTransform", pluginConfig.textTransform));
                }
                if (pluginConfig.textDecoration) {
                    result.push(new styles_1.StyleRule("textDecoration", pluginConfig.textDecoration));
                }
                return [2, result];
            });
        });
    };
    return TypographyStylePlugin;
}(stylePlugin_1.StylePlugin));
exports.TypographyStylePlugin = TypographyStylePlugin;
