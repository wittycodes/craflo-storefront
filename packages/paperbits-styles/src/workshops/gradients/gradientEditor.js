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
exports.GradientEditor = void 0;
var ko = require("knockout");
var gradientEditor_html_1 = require("./gradientEditor.html");
var decorators_1 = require("@paperbits/common/ko/decorators");
var contracts_1 = require("../../contracts");
var linearGradientViewModel_1 = require("./linearGradientViewModel");
var styles_1 = require("@paperbits/common/styles");
var consts_1 = require("@paperbits/common/ko/consts");
var GradientEditor = (function () {
    function GradientEditor() {
        this.gradientPreview = ko.observable();
        this.gradientPreviewColorStops = ko.observable();
        this.gradientViewModel = ko.observable();
        this.selectedGradient = ko.observable();
        this.direction = ko.observable();
    }
    GradientEditor.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.gradientViewModel(new linearGradientViewModel_1.LinearGradientViewModel(this.selectedGradient()));
                this.direction(parseFloat(this.gradientViewModel().direction()));
                this.direction.extend(consts_1.ChangeRateLimit).subscribe(function (deg) {
                    _this.gradientViewModel().direction(deg + "deg");
                });
                this.gradientPreviewColorStops.extend(consts_1.ChangeRateLimit).subscribe(this.applyChanges);
                this.attachFunction();
                this.updatePreview();
                this.updateColorStopsPreview();
                return [2];
            });
        });
    };
    GradientEditor.prototype.attachFunction = function () {
        return __awaiter(this, void 0, void 0, function () {
            var gradient;
            var _this = this;
            return __generator(this, function (_a) {
                gradient = this.gradientViewModel();
                gradient.displayName.extend(consts_1.ChangeRateLimit).subscribe(function () {
                    _this.applyChanges();
                });
                gradient.direction.extend(consts_1.ChangeRateLimit).subscribe(this.applyChanges);
                return [2];
            });
        });
    };
    GradientEditor.prototype.addColor = function () {
        return __awaiter(this, void 0, void 0, function () {
            var newColor;
            return __generator(this, function (_a) {
                newColor = new linearGradientViewModel_1.ColorStopViewModel({
                    color: "#000000",
                    length: 0
                });
                newColor.color.extend(consts_1.ChangeRateLimit).subscribe(this.applyChanges);
                newColor.length.extend(consts_1.ChangeRateLimit).subscribe(this.applyChanges);
                this.gradientViewModel().colorStops.push(newColor);
                this.applyChanges();
                return [2];
            });
        });
    };
    GradientEditor.prototype.applyChanges = function () {
        return __awaiter(this, void 0, void 0, function () {
            var gradient;
            return __generator(this, function (_a) {
                this.updatePreview();
                if (this.onSelect) {
                    gradient = this.gradientViewModel().toContract();
                    this.onSelect(gradient);
                }
                return [2];
            });
        });
    };
    GradientEditor.prototype.updatePreview = function () {
        return __awaiter(this, void 0, void 0, function () {
            var previewGradient, style, styleSheet;
            return __generator(this, function (_a) {
                previewGradient = this.gradientViewModel().toContract();
                style = new styles_1.Style("gradient-preview");
                style.addRules([new styles_1.StyleRule("backgroundImage", contracts_1.getLinearGradientString(previewGradient))]);
                styleSheet = new styles_1.StyleSheet();
                styleSheet.styles.push(style);
                this.gradientPreview(styleSheet);
                return [2];
            });
        });
    };
    GradientEditor.prototype.updateColorStopsPreview = function () {
        return __awaiter(this, void 0, void 0, function () {
            var colorStopsGradient, colorStopsPreviewStyle, colorStopsPreviewStyleSheet;
            return __generator(this, function (_a) {
                colorStopsGradient = this.gradientViewModel().toContract();
                colorStopsPreviewStyle = new styles_1.Style("gradient-preview-color-stops");
                colorStopsGradient.direction = "90deg";
                colorStopsPreviewStyle.addRules([new styles_1.StyleRule("backgroundImage", contracts_1.getLinearGradientString(colorStopsGradient))]);
                colorStopsPreviewStyleSheet = new styles_1.StyleSheet();
                colorStopsPreviewStyleSheet.styles.push(colorStopsPreviewStyle);
                this.gradientPreviewColorStops(colorStopsPreviewStyleSheet);
                return [2];
            });
        });
    };
    GradientEditor.prototype.changeColor = function (obIndex, colorValue) {
        var index = obIndex();
        if (!colorValue) {
            this.gradientViewModel().colorStops.splice(index, 1);
        }
        else {
            this.gradientViewModel().colorStops()[index].color(colorValue);
        }
        this.updateColorStopsPreview();
    };
    GradientEditor.prototype.onColorStopChange = function () {
        this.updateColorStopsPreview();
    };
    __decorate([
        decorators_1.Param(),
        __metadata("design:type", Function)
    ], GradientEditor.prototype, "selectedGradient", void 0);
    __decorate([
        decorators_1.Event(),
        __metadata("design:type", Function)
    ], GradientEditor.prototype, "onSelect", void 0);
    __decorate([
        decorators_1.OnMounted(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], GradientEditor.prototype, "initialize", null);
    GradientEditor = __decorate([
        decorators_1.Component({
            selector: "gradient-editor",
            template: gradientEditor_html_1.default
        }),
        __metadata("design:paramtypes", [])
    ], GradientEditor);
    return GradientEditor;
}());
exports.GradientEditor = GradientEditor;
