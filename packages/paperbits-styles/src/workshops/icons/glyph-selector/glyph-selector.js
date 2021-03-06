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
exports.GlyphSelector = void 0;
var ko = require("knockout");
var Utils = require("@paperbits/common");
var glyph_selector_html_1 = require("./glyph-selector.html");
var decorators_1 = require("@paperbits/common/ko/decorators");
var consts_1 = require("@paperbits/common/ko/consts");
var styleService_1 = require("../../../styleService");
var styleUitls_1 = require("../../../styleUitls");
var GlyphSelector = (function () {
    function GlyphSelector(styleService, styleCompiler) {
        this.styleService = styleService;
        this.styleCompiler = styleCompiler;
        this.working = ko.observable(true);
        this.fonts = ko.observableArray();
        this.searchPattern = ko.observable("");
        this.compiledFontStyles = ko.observable();
        this.icons = ko.observableArray();
    }
    GlyphSelector.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fontStyles, icons, iconViewModels;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.styleCompiler.getIconFontStylesCss()];
                    case 1:
                        fontStyles = _a.sent();
                        this.compiledFontStyles(fontStyles);
                        this.searchPattern
                            .extend(consts_1.ChangeRateLimit)
                            .subscribe(this.searchIcons);
                        return [4, this.styleService.getIcons()];
                    case 2:
                        icons = _a.sent();
                        iconViewModels = icons.map(function (icon) { return ({
                            key: icon.key,
                            class: Utils.camelCaseToKebabCase(icon.key.replace("icons/", "icon-")),
                            displayName: icon.displayName,
                            unicode: styleUitls_1.formatUnicode(icon.unicode)
                        }); });
                        this.allIcons = iconViewModels;
                        this.icons(iconViewModels);
                        this.working(false);
                        return [2];
                }
            });
        });
    };
    GlyphSelector.prototype.searchIcons = function (pattern) {
        if (pattern === void 0) { pattern = ""; }
        this.working(true);
        pattern = pattern.toLowerCase();
        var filteredIcons = this.allIcons.filter(function (icon) { return icon.displayName.toLowerCase().includes(pattern); });
        this.icons(filteredIcons);
        this.working(false);
    };
    GlyphSelector.prototype.selectIcon = function (icon) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.onSelect) {
                    this.onSelect(icon);
                }
                return [2];
            });
        });
    };
    GlyphSelector.prototype.selectNone = function () {
        if (this.onSelect) {
            this.onSelect(null);
        }
    };
    __decorate([
        decorators_1.Param(),
        __metadata("design:type", Function)
    ], GlyphSelector.prototype, "fonts", void 0);
    __decorate([
        decorators_1.Param(),
        __metadata("design:type", Function)
    ], GlyphSelector.prototype, "searchPattern", void 0);
    __decorate([
        decorators_1.Param(),
        __metadata("design:type", Function)
    ], GlyphSelector.prototype, "showFontNames", void 0);
    __decorate([
        decorators_1.Event(),
        __metadata("design:type", Function)
    ], GlyphSelector.prototype, "onSelect", void 0);
    __decorate([
        decorators_1.OnMounted(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], GlyphSelector.prototype, "initialize", null);
    GlyphSelector = __decorate([
        decorators_1.Component({
            selector: "glyph-selector",
            template: glyph_selector_html_1.default
        }),
        __metadata("design:paramtypes", [styleService_1.StyleService, Object])
    ], GlyphSelector);
    return GlyphSelector;
}());
exports.GlyphSelector = GlyphSelector;
