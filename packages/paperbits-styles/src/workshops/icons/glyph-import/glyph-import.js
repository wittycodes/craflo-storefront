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
exports.GlyphImport = void 0;
var ko = require("knockout");
var opentype = require("opentype.js");
var glyph_import_html_1 = require("./glyph-import.html");
var decorators_1 = require("@paperbits/common/ko/decorators");
var consts_1 = require("@paperbits/common/ko/consts");
var GlyphImport = (function () {
    function GlyphImport() {
        this.working = ko.observable(true);
        this.glyphs = ko.observableArray([]);
        this.allGlyphs = [];
        this.pages = ko.observableArray();
        this.fonts = ko.observableArray();
        this.searchPattern = ko.observable("");
        this.selectGlyph = this.selectGlyph.bind(this);
        this.showFontNames = ko.observable();
        this.categories = ko.observable();
    }
    GlyphImport.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadWidgetOrders()];
                    case 1:
                        _a.sent();
                        this.searchPattern
                            .extend(consts_1.ChangeRateLimit)
                            .subscribe(this.searchIcons);
                        return [2];
                }
            });
        });
    };
    GlyphImport.prototype.loadWidgetOrders = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fonts, groups, _i, fonts_1, font, fontUrl, openTypeFont, glyphs, index, glyph;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.working(true);
                        fonts = this.fonts();
                        groups = [];
                        _i = 0, fonts_1 = fonts;
                        _a.label = 1;
                    case 1:
                        if (!(_i < fonts_1.length)) return [3, 4];
                        font = fonts_1[_i];
                        fontUrl = font.variants[0].file;
                        return [4, opentype.load(fontUrl, null, { lowMemory: false })];
                    case 2:
                        openTypeFont = _a.sent();
                        glyphs = [];
                        this.parseLigatures(openTypeFont);
                        for (index = 0; index < openTypeFont.numGlyphs; index++) {
                            glyph = openTypeFont.glyphs.get(index);
                            if (!glyph.unicode || glyph.unicode.toString().length < 4) {
                                continue;
                            }
                            glyphs.push({
                                font: openTypeFont,
                                glyph: glyph,
                                name: glyph.name
                            });
                        }
                        groups.push({
                            name: font.displayName,
                            font: openTypeFont,
                            items: glyphs
                        });
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3, 1];
                    case 4:
                        this.originalCategories = groups;
                        this.searchIcons();
                        return [2];
                }
            });
        });
    };
    GlyphImport.prototype.searchIcons = function (pattern) {
        if (pattern === void 0) { pattern = ""; }
        this.working(true);
        pattern = pattern.toLowerCase();
        var filteredCategories = this.originalCategories
            .map(function (category) { return ({
            name: category.name,
            font: category.font,
            items: category.items.filter(function (glyph) { return glyph.name.toLowerCase().includes(pattern); })
        }); })
            .filter(function (category) { return category.items.length > 0; });
        this.categories(filteredCategories);
        this.working(false);
    };
    GlyphImport.prototype.selectGlyph = function (glyphItem) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.onSelect) {
                    this.onSelect(glyphItem.glyph);
                }
                return [2];
            });
        });
    };
    GlyphImport.prototype.parseLigatures = function (font) {
        if (!font.tables.gsub) {
            return;
        }
        var glyphIndexMap = font.tables.cmap.glyphIndexMap;
        var reverseGlyphIndexMap = {};
        Object.keys(glyphIndexMap).forEach(function (key) {
            var value = glyphIndexMap[key];
            reverseGlyphIndexMap[value] = key;
        });
        font.tables.gsub.lookups.forEach(function (lookup) {
            lookup.subtables.forEach(function (subtable) {
                if (subtable.coverage.format === 1) {
                    subtable.ligatureSets.forEach(function (set, i) {
                        set.forEach(function (ligature) {
                            var coverage1 = subtable.coverage.glyphs[i];
                            coverage1 = reverseGlyphIndexMap[coverage1];
                            coverage1 = parseInt(coverage1);
                            var components = ligature.components.map(function (component) {
                                component = reverseGlyphIndexMap[component];
                                component = parseInt(component);
                                return String.fromCharCode(component);
                            });
                            var name = String.fromCharCode(coverage1) + components.join("");
                            var glyph = font.glyphs.get(ligature.ligGlyph);
                            glyph.name = name;
                        });
                    });
                }
                else {
                    subtable.ligatureSets.forEach(function (set, i) {
                        set.forEach(function (ligature) {
                            var coverage2 = [];
                            subtable.coverage.ranges.forEach(function (coverage) {
                                for (var i_1 = coverage.start; i_1 <= coverage.end; i_1++) {
                                    var character = reverseGlyphIndexMap[i_1];
                                    character = parseInt(character);
                                    coverage2.push(String.fromCharCode(character));
                                }
                            });
                            var components = ligature.components.map(function (component) {
                                component = reverseGlyphIndexMap[component];
                                component = parseInt(component);
                                return String.fromCharCode(component);
                            });
                            var name = coverage2[i] + components.join("");
                            var glyph = font.glyphs.get(ligature.ligGlyph);
                            glyph.name = name;
                        });
                    });
                }
            });
        });
    };
    __decorate([
        decorators_1.Param(),
        __metadata("design:type", Function)
    ], GlyphImport.prototype, "fonts", void 0);
    __decorate([
        decorators_1.Param(),
        __metadata("design:type", Function)
    ], GlyphImport.prototype, "searchPattern", void 0);
    __decorate([
        decorators_1.Param(),
        __metadata("design:type", Function)
    ], GlyphImport.prototype, "showFontNames", void 0);
    __decorate([
        decorators_1.Event(),
        __metadata("design:type", Function)
    ], GlyphImport.prototype, "onSelect", void 0);
    __decorate([
        decorators_1.OnMounted(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], GlyphImport.prototype, "initialize", null);
    GlyphImport = __decorate([
        decorators_1.Component({
            selector: "glyph-import",
            template: glyph_import_html_1.default
        }),
        __metadata("design:paramtypes", [])
    ], GlyphImport);
    return GlyphImport;
}());
exports.GlyphImport = GlyphImport;
