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
exports.FontSelector = void 0;
var ko = require("knockout");
var fontSelector_html_1 = require("./fontSelector.html");
var decorators_1 = require("@paperbits/common/ko/decorators");
var styleService_1 = require("../../styleService");
var FontSelector = (function () {
    function FontSelector(styleService, styleCompiler) {
        this.styleService = styleService;
        this.styleCompiler = styleCompiler;
        this.loadAvailableFonts = this.loadAvailableFonts.bind(this);
        this.selectFont = this.selectFont.bind(this);
        this.compiledFontStyles = ko.observable();
        this.fonts = ko.observableArray();
        this.selectedFont = ko.observable();
    }
    FontSelector.prototype.loadAvailableFonts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var styles, fonts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.styleCompiler.getFontsStylesCss()];
                    case 1:
                        styles = _a.sent();
                        this.compiledFontStyles(styles);
                        return [4, this.styleService.getVariations("fonts")];
                    case 2:
                        fonts = _a.sent();
                        this.fonts(fonts);
                        return [2];
                }
            });
        });
    };
    FontSelector.prototype.selectFont = function (font) {
        if (this.selectedFont) {
            this.selectedFont(font);
        }
        if (this.onSelect) {
            this.onSelect(font);
        }
    };
    FontSelector.prototype.clearFonts = function () {
        if (this.selectedFont) {
            this.selectedFont(null);
        }
        if (this.onSelect) {
            this.onSelect(null);
        }
    };
    __decorate([
        decorators_1.Param(),
        __metadata("design:type", Function)
    ], FontSelector.prototype, "selectedFont", void 0);
    __decorate([
        decorators_1.Event(),
        __metadata("design:type", Function)
    ], FontSelector.prototype, "onSelect", void 0);
    __decorate([
        decorators_1.OnMounted(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], FontSelector.prototype, "loadAvailableFonts", null);
    FontSelector = __decorate([
        decorators_1.Component({
            selector: "font-selector",
            template: fontSelector_html_1.default
        }),
        __metadata("design:paramtypes", [styleService_1.StyleService, Object])
    ], FontSelector);
    return FontSelector;
}());
exports.FontSelector = FontSelector;
