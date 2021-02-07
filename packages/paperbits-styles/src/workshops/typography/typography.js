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
exports.Typography = void 0;
var ko = require("knockout");
var Objects = require("@paperbits/common");
var typography_html_1 = require("./typography.html");
var styleService_1 = require("../../styleService");
var decorators_1 = require("@paperbits/common/ko/decorators");
var consts_1 = require("@paperbits/common/ko/consts");
var inheritLabel = "(Inherit)";
var Typography = (function () {
    function Typography(styleService) {
        var _this = this;
        this.styleService = styleService;
        this.fontWeights = [];
        this.fontStyles = [];
        this.textTransformOptions = [
            { value: undefined, text: "(Inherit)" },
            { value: "none", text: "None" },
            { value: "capitalize", text: "Capitalize" },
            { value: "lowercase", text: "Lower-case" },
            { value: "uppercase", text: "Upper-case" }
        ];
        this.textDecorationOptions = [
            { value: undefined, text: "(Inherit)" },
            { value: "none", text: "None" },
            { value: "underline", text: "Underline" },
            { value: "overline", text: "Overline" },
            { value: "line-through", text: "Line through" }
        ];
        this.typography = ko.observable();
        this.fontKey = ko.observable();
        this.fontSize = ko.observable();
        this.fontWeight = ko.observable();
        this.fontStyle = ko.observable();
        this.lineHeight = ko.observable();
        this.letterSpacing = ko.observable();
        this.colorKey = ko.observable();
        this.shadowKey = ko.observable();
        this.textAlign = ko.observable();
        this.textTransform = ko.observable();
        this.textDecoration = ko.observable();
        this.fontName = ko.observable();
        this.colorName = ko.observable();
        this.shadowName = ko.observable();
        this.currentWeight = ko.pureComputed(function () { return "" + (_this.fontWeight() || "(Inherit)"); });
        this.currentStyle = ko.pureComputed(function () { return "" + (_this.fontStyle() || "(Inherit)"); });
    }
    Typography.prototype.updateObservables = function (typographyContract) {
        return __awaiter(this, void 0, void 0, function () {
            var styles, fontContract, supportedWeights_1, deduplicated, colorContract, shadowContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!typographyContract) {
                            return [2];
                        }
                        return [4, this.styleService.getStyles()];
                    case 1:
                        styles = _a.sent();
                        if (typographyContract.fontKey) {
                            fontContract = Objects.getObjectAt(typographyContract.fontKey, styles);
                            if (fontContract) {
                                this.fontName(fontContract.displayName);
                                this.fontKey(typographyContract.fontKey);
                                supportedWeights_1 = fontContract.variants
                                    .map(function (variant) { return variant.weight.toString(); });
                                deduplicated = supportedWeights_1
                                    .filter(function (weight) { return supportedWeights_1.includes(weight); })
                                    .sort();
                                this.fontWeights = [].concat(deduplicated, undefined);
                            }
                            else {
                                console.warn("Font with key \"" + typographyContract.fontKey + "\" not found. Elements using it will fallback to parent's definition.");
                            }
                        }
                        else {
                            this.fontWeights = ["bold", "normal", undefined];
                        }
                        this.fontStyles = ["italic", "normal", undefined];
                        if (typographyContract.colorKey) {
                            colorContract = Objects.getObjectAt(typographyContract.colorKey, styles);
                            if (colorContract) {
                                this.colorName(colorContract.displayName);
                                this.colorKey(typographyContract.colorKey);
                            }
                            else {
                                console.warn("Color with key \"" + typographyContract.colorKey + "\" not found. Elements using it will fallback to parent's definition.");
                            }
                        }
                        this.fontSize(typographyContract.fontSize);
                        this.fontWeight(typographyContract.fontWeight);
                        this.fontStyle(typographyContract.fontStyle);
                        this.textTransform(typographyContract.textTransform);
                        this.textDecoration(typographyContract.textDecoration);
                        this.lineHeight(typographyContract.lineHeight);
                        this.letterSpacing(typographyContract.letterSpacing);
                        if (typographyContract.shadowKey) {
                            shadowContract = Objects.getObjectAt(typographyContract.shadowKey, styles);
                            if (shadowContract) {
                                this.shadowName(shadowContract.displayName);
                                this.shadowKey(typographyContract.shadowKey);
                            }
                            else {
                                console.warn("Shadow with key \"" + typographyContract.shadowKey + "\" not found. Elements using it will fallback to parent's definition.");
                            }
                        }
                        this.textAlign(typographyContract.textAlign);
                        return [2];
                }
            });
        });
    };
    Typography.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var typography;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        typography = this.typography();
                        this.fontName(inheritLabel);
                        this.colorName(inheritLabel);
                        this.shadowName(inheritLabel);
                        return [4, this.updateObservables(typography)];
                    case 1:
                        _a.sent();
                        this.fontKey.extend(consts_1.ChangeRateLimit).subscribe(this.applyChanges);
                        this.fontWeight.subscribe(this.applyChanges);
                        this.fontStyle.subscribe(this.applyChanges);
                        this.fontSize.extend(consts_1.ChangeRateLimit).subscribe(this.applyChanges);
                        this.lineHeight.extend(consts_1.ChangeRateLimit).subscribe(this.applyChanges);
                        this.letterSpacing.extend(consts_1.ChangeRateLimit).subscribe(this.applyChanges);
                        this.colorKey.extend(consts_1.ChangeRateLimit).subscribe(this.applyChanges);
                        this.shadowKey.extend(consts_1.ChangeRateLimit).subscribe(this.applyChanges);
                        this.textAlign.extend(consts_1.ChangeRateLimit).subscribe(this.applyChanges);
                        this.textTransform.extend(consts_1.ChangeRateLimit).subscribe(this.applyChanges);
                        this.textDecoration.extend(consts_1.ChangeRateLimit).subscribe(this.applyChanges);
                        this.typography.extend(consts_1.ChangeRateLimit).subscribe(this.updateObservables);
                        return [2];
                }
            });
        });
    };
    Typography.prototype.onFontSelected = function (fontContract) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.fontName(fontContract ? fontContract.displayName : inheritLabel);
                        this.fontKey(fontContract ? fontContract.key : undefined);
                        return [4, this.updateObservables({
                                fontKey: this.fontKey(),
                                fontSize: this.fontSize(),
                                textAlign: this.textAlign()
                            })];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    Typography.prototype.onColorSelected = function (colorContract) {
        this.colorName(colorContract ? colorContract.displayName : inheritLabel);
        this.colorKey(colorContract ? colorContract.key : undefined);
    };
    Typography.prototype.onShadowSelected = function (shadowContract) {
        this.shadowName(shadowContract ? shadowContract.displayName : inheritLabel);
        this.shadowKey(shadowContract ? shadowContract.key : undefined);
    };
    Typography.prototype.toggleBold = function () {
        var weight = this.fontWeight();
        var index = this.fontWeights.indexOf(weight);
        index++;
        if (index > this.fontWeights.length - 1) {
            index = 0;
        }
        var newWeight = this.fontWeights[index];
        this.fontWeight(newWeight);
    };
    Typography.prototype.toggleItalic = function () {
        var style = this.fontStyle();
        var index = this.fontStyles.indexOf(style);
        index++;
        if (index > this.fontStyles.length - 1) {
            index = 0;
        }
        var newStyle = this.fontStyles[index];
        this.fontStyle(newStyle);
    };
    Typography.prototype.alignLeft = function () {
        var alignment = this.textAlign();
        this.textAlign(alignment === "left" ? undefined : "left");
    };
    Typography.prototype.alignCenter = function () {
        var alignment = this.textAlign();
        this.textAlign(alignment === "center" ? undefined : "center");
    };
    Typography.prototype.alignRight = function () {
        var alignment = this.textAlign();
        this.textAlign(alignment === "right" ? undefined : "right");
    };
    Typography.prototype.justify = function () {
        var alignment = this.textAlign();
        this.textAlign(alignment === "justify" ? undefined : "justify");
    };
    Typography.prototype.getFontWeght = function (fontWeight) {
        if (!fontWeight) {
            return undefined;
        }
        if (fontWeight === "bold") {
            var last = this.fontWeights[this.fontWeights.length - 1];
            var boldWeight = +last.weight;
            if (boldWeight >= 600) {
                return boldWeight;
            }
        }
        else {
            var boldWeight = +fontWeight;
            if (boldWeight) {
                return boldWeight;
            }
        }
        return undefined;
    };
    Typography.prototype.applyChanges = function () {
        if (!this.onUpdate) {
            return;
        }
        this.onUpdate({
            fontKey: this.fontKey(),
            fontSize: this.fontSize() ? parseInt(this.fontSize()) : undefined,
            fontWeight: this.fontWeight(),
            fontStyle: this.fontStyle(),
            lineHeight: this.lineHeight() || null,
            letterSpacing: this.letterSpacing() || null,
            colorKey: this.colorKey(),
            shadowKey: this.shadowKey(),
            textAlign: this.textAlign(),
            textTransform: this.textTransform(),
            textDecoration: this.textDecoration()
        });
    };
    __decorate([
        decorators_1.Param(),
        __metadata("design:type", Function)
    ], Typography.prototype, "typography", void 0);
    __decorate([
        decorators_1.Event(),
        __metadata("design:type", Function)
    ], Typography.prototype, "onUpdate", void 0);
    __decorate([
        decorators_1.OnMounted(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], Typography.prototype, "initialize", null);
    Typography = __decorate([
        decorators_1.Component({
            selector: "typography",
            template: typography_html_1.default
        }),
        __metadata("design:paramtypes", [styleService_1.StyleService])
    ], Typography);
    return Typography;
}());
exports.Typography = Typography;
