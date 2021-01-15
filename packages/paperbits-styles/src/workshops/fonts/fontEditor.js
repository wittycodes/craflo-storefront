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
exports.FontEditor = void 0;
var ko = require("knockout");
var Utils = require("@paperbits/common/utils");
var fontEditor_html_1 = require("./fontEditor.html");
var decorators_1 = require("@paperbits/common/ko/decorators");
var styles_1 = require("@paperbits/common/styles");
var consts_1 = require("@paperbits/common/ko/consts");
var possibleVariants = [
    {
        name: "Thin",
        displayName: "Thin 100",
        weight: 100,
        style: "normal"
    },
    {
        name: "ThinItalic",
        displayName: "Thin 100 italic",
        weight: 100,
        style: "italic"
    },
    {
        name: "ExtraLight",
        displayName: "Extra-light 200",
        weight: 200,
        style: "normal"
    },
    {
        name: "ExtraLightItalic",
        displayName: "Extra-light 200 italic",
        weight: 200,
        style: "italic"
    },
    {
        name: "Light",
        displayName: "Light 300",
        weight: 300,
        style: "normal"
    },
    {
        name: "LightItalic",
        displayName: "Light 300 italic",
        weight: 300,
        style: "italic"
    },
    {
        name: "Regular",
        displayName: "Regular 400",
        weight: 400,
        style: "normal"
    },
    {
        name: "RegularItalic",
        displayName: "Regular 400 italic",
        weight: 400,
        style: "italic"
    },
    {
        name: "Medium",
        displayName: "Medium 500",
        weight: 500,
        style: "normal"
    },
    {
        name: "MediumItalic",
        displayName: "Medium 500 italic",
        weight: 500,
        style: "italic"
    },
    {
        name: "SemiBold",
        displayName: "Semi-bold 600",
        weight: 600,
        style: "normal"
    },
    {
        name: "SemiBoldItalic",
        displayName: "Semi-bold 600 italic",
        weight: 600,
        style: "italic"
    },
    {
        name: "Bold",
        displayName: "Bold 700",
        weight: 700,
        style: "normal"
    },
    {
        name: "BoldItalic",
        displayName: "Bold 700 italic",
        weight: 700,
        style: "italic"
    },
    {
        name: "ExtraBold",
        displayName: "Extra-bold 800",
        weight: 800,
        style: "normal"
    },
    {
        name: "ExtraBoldItalic",
        displayName: "Extra-bold 800 italic",
        weight: 800,
        style: "italic"
    },
    {
        name: "Black",
        displayName: "Black 900",
        weight: 900,
        style: "normal"
    },
    {
        name: "BlackItalic",
        displayName: "Black 900 italic",
        weight: 900,
        style: "italic"
    }
];
var FontEditor = (function () {
    function FontEditor(permalinkResolver, viewManager, blobStorage) {
        this.permalinkResolver = permalinkResolver;
        this.viewManager = viewManager;
        this.blobStorage = blobStorage;
        this.variants = ko.observableArray();
        this.displayName = ko.observable();
        this.preview = ko.observable();
        this.previewText = ko.observable("AaBbCcDdEeFfGg");
    }
    FontEditor.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.displayName(this.font.displayName);
                        this.displayName
                            .extend(consts_1.ChangeRateLimit)
                            .subscribe(this.applyChanges);
                        return [4, this.buildPreview()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    FontEditor.prototype.buildPreview = function () {
        return __awaiter(this, void 0, void 0, function () {
            var previewCss;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getVariantCss()];
                    case 1:
                        previewCss = _a.sent();
                        this.preview(previewCss);
                        this.variants([]);
                        this.variants(possibleVariants);
                        return [2];
                }
            });
        });
    };
    FontEditor.prototype.isVariantDefined = function (variant) {
        var isDefined = this.font.variants.some(function (x) { return x.weight.toString() === variant.weight.toString() && x.style === variant.style; });
        return isDefined;
    };
    FontEditor.prototype.getVariantCss = function () {
        return __awaiter(this, void 0, void 0, function () {
            var font, styleSheet, _i, _a, variant, fontVariantUrl, fontFace;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        font = this.font;
                        styleSheet = new styles_1.StyleSheet();
                        _i = 0, _a = font.variants;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3, 6];
                        variant = _a[_i];
                        fontVariantUrl = void 0;
                        if (!variant.sourceKey) return [3, 3];
                        return [4, this.permalinkResolver.getUrlByTargetKey(variant.sourceKey)];
                    case 2:
                        fontVariantUrl = _b.sent();
                        return [3, 4];
                    case 3:
                        if (variant.permalink || variant.file) {
                            fontVariantUrl = variant.permalink || variant.file;
                        }
                        else {
                            throw new Error("Font variant URL is empty.");
                        }
                        _b.label = 4;
                    case 4:
                        fontFace = new styles_1.FontFace();
                        fontFace.fontFamily = font.family;
                        fontFace.src = fontVariantUrl;
                        fontFace.fontStyle = variant.style || "normal";
                        fontFace.fontWeight = variant.weight || "normal";
                        styleSheet.fontFaces.push(fontFace);
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3, 1];
                    case 6: return [2, styleSheet];
                }
            });
        });
    };
    FontEditor.prototype.addVariant = function (variant) {
        return __awaiter(this, void 0, void 0, function () {
            var files, file, content, identifier, fileNameParts, extension, blobKey, variantIndex, error_1, fontVariant;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.viewManager.openUploadDialog(".ttf", ".otf", "woff")];
                    case 1:
                        files = _a.sent();
                        file = files[0];
                        return [4, Utils.readFileAsByteArray(file)];
                    case 2:
                        content = _a.sent();
                        identifier = Utils.guid();
                        fileNameParts = file.name.split(".");
                        extension = fileNameParts.length > 1 ? "." + fileNameParts.pop() : "";
                        blobKey = "fonts/" + identifier + extension;
                        variantIndex = this.font.variants.findIndex(function (x) { return x.weight.toString() === variant.weight.toString() && x.style === variant.style; });
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4, this.blobStorage.uploadBlob(blobKey, content, "font/ttf")];
                    case 4:
                        _a.sent();
                        return [3, 6];
                    case 5:
                        error_1 = _a.sent();
                        console.error("Could not upload font variant blob. " + error_1.stack);
                        return [3, 6];
                    case 6:
                        fontVariant = {
                            weight: variant.weight,
                            style: variant.style,
                            sourceKey: blobKey
                        };
                        if (variantIndex >= 0) {
                            this.font.variants[variantIndex] = fontVariant;
                        }
                        else {
                            this.font.variants.push(fontVariant);
                        }
                        return [4, this.buildPreview()];
                    case 7:
                        _a.sent();
                        this.applyChanges();
                        return [2];
                }
            });
        });
    };
    FontEditor.prototype.removeVariant = function (variant) {
        return __awaiter(this, void 0, void 0, function () {
            var fontVariant, index, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fontVariant = this.font.variants.find(function (x) { return x.weight.toString() === variant.weight.toString() && x.style === variant.style; });
                        if (!fontVariant) {
                            return [2];
                        }
                        index = this.font.variants.indexOf(fontVariant);
                        this.font.variants.splice(index, 1);
                        if (!fontVariant.sourceKey) return [3, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.blobStorage.deleteBlob(fontVariant.sourceKey)];
                    case 2:
                        _a.sent();
                        return [3, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.error("Could not delete font variant blob. " + error_2.stack);
                        return [3, 4];
                    case 4: return [4, this.buildPreview()];
                    case 5:
                        _a.sent();
                        this.applyChanges();
                        return [2];
                }
            });
        });
    };
    FontEditor.prototype.applyChanges = function () {
        this.font.displayName = this.displayName();
        if (this.onChange) {
            this.onChange();
        }
    };
    __decorate([
        decorators_1.Param(),
        __metadata("design:type", Object)
    ], FontEditor.prototype, "font", void 0);
    __decorate([
        decorators_1.Event(),
        __metadata("design:type", Function)
    ], FontEditor.prototype, "onChange", void 0);
    __decorate([
        decorators_1.OnMounted(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], FontEditor.prototype, "initialize", null);
    FontEditor = __decorate([
        decorators_1.Component({
            selector: "font-editor",
            template: fontEditor_html_1.default
        }),
        __metadata("design:paramtypes", [Object, Object, Object])
    ], FontEditor);
    return FontEditor;
}());
exports.FontEditor = FontEditor;
