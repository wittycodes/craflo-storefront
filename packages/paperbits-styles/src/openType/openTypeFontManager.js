"use strict";
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
exports.FontManager = void 0;
var opentype = require("opentype.js");
var Utils = require("@paperbits/common/utils");
var Objects = require("@paperbits/common/objects");
var constants_1 = require("../constants");
var FontManager = (function () {
    function FontManager(blobStorage) {
        this.blobStorage = blobStorage;
    }
    FontManager.prototype.getOpenTypeFont = function (glyphs) {
        return new opentype.Font({
            familyName: constants_1.IconsFontFamilyName,
            styleName: constants_1.IconsFontStyleName,
            unitsPerEm: 400,
            ascender: 800,
            descender: -200,
            glyphs: glyphs
        });
    };
    FontManager.prototype.getIconFontContract = function () {
        return {
            displayName: "Icons",
            family: constants_1.IconsFontFamilyName,
            key: "fonts/icons",
            variants: [
                {
                    sourceKey: constants_1.IconsFontFileSourceKey,
                    style: "normal",
                    weight: "400"
                }
            ]
        };
    };
    FontManager.prototype.addGlyph = function (styles, newGlyph) {
        return __awaiter(this, void 0, void 0, function () {
            var font, iconFont, glyphs, advanceWidths, content, arrayBuffer, index, glyphInFont, notdefGlyph, fontArrayBuffer, identifier, icon;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        iconFont = Objects.getObjectAt("fonts/icons", styles);
                        glyphs = [];
                        advanceWidths = [];
                        if (!iconFont) return [3, 4];
                        return [4, this.blobStorage.downloadBlob(constants_1.IconsFontFileSourceKey)];
                    case 1:
                        content = _a.sent();
                        if (!content) return [3, 3];
                        arrayBuffer = content.buffer.slice(content.byteOffset, content.byteLength + content.byteOffset);
                        return [4, opentype.parse(arrayBuffer, null, { lowMemory: true })];
                    case 2:
                        font = _a.sent();
                        for (index = 0; index < font.numGlyphs; index++) {
                            glyphInFont = font.glyphs.get(index);
                            glyphs.push(glyphInFont);
                            advanceWidths.push(glyphInFont.advanceWidth);
                        }
                        _a.label = 3;
                    case 3: return [3, 5];
                    case 4:
                        notdefGlyph = new opentype.Glyph({
                            name: ".notdef",
                            unicode: 0,
                            advanceWidth: 650,
                            path: new opentype.Path()
                        });
                        glyphs.push(notdefGlyph);
                        advanceWidths.push(notdefGlyph.advanceWidth);
                        _a.label = 5;
                    case 5:
                        if (!newGlyph.name) {
                            newGlyph.name = "Icon";
                        }
                        glyphs.push(newGlyph);
                        advanceWidths.push(newGlyph.advanceWidth);
                        font = this.getOpenTypeFont(glyphs);
                        glyphs.forEach(function (x, index) { return x.advanceWidth = advanceWidths[index]; });
                        fontArrayBuffer = font.toArrayBuffer();
                        return [4, this.blobStorage.uploadBlob(constants_1.IconsFontFileSourceKey, new Uint8Array(fontArrayBuffer), "font/ttf")];
                    case 6:
                        _a.sent();
                        iconFont = this.getIconFontContract();
                        identifier = Utils.identifier();
                        icon = {
                            key: "icons/" + identifier,
                            name: newGlyph.name,
                            displayName: newGlyph.name,
                            unicode: newGlyph.unicode
                        };
                        Objects.setValue("icons/" + identifier, styles, icon);
                        Objects.setValue("fonts/icons", styles, iconFont);
                        return [2];
                }
            });
        });
    };
    FontManager.prototype.removeGlyph = function (styles, unicode) {
        return __awaiter(this, void 0, void 0, function () {
            var font, iconFont, glyphs, advanceWidths, content, arrayBuffer, index, glyphInFont, notdefGlyph, fontArrayBuffer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        iconFont = Objects.getObjectAt("fonts/icons", styles);
                        glyphs = [];
                        advanceWidths = [];
                        if (!iconFont) return [3, 4];
                        return [4, this.blobStorage.downloadBlob(constants_1.IconsFontFileSourceKey)];
                    case 1:
                        content = _a.sent();
                        if (!content) return [3, 3];
                        arrayBuffer = content.buffer.slice(content.byteOffset, content.byteLength + content.byteOffset);
                        return [4, opentype.parse(arrayBuffer, null, { lowMemory: true })];
                    case 2:
                        font = _a.sent();
                        for (index = 0; index < font.numGlyphs; index++) {
                            glyphInFont = font.glyphs.get(index);
                            if (glyphInFont.unicode !== unicode) {
                                console.log(glyphInFont.unicode);
                                glyphs.push(glyphInFont);
                                advanceWidths.push(glyphInFont.advanceWidth);
                            }
                        }
                        _a.label = 3;
                    case 3: return [3, 5];
                    case 4:
                        notdefGlyph = new opentype.Glyph({
                            name: ".notdef",
                            unicode: 0,
                            advanceWidth: 650,
                            path: new opentype.Path()
                        });
                        glyphs.push(notdefGlyph);
                        advanceWidths.push(notdefGlyph.advanceWidth);
                        _a.label = 5;
                    case 5:
                        font = this.getOpenTypeFont(glyphs);
                        glyphs.forEach(function (x, index) { return x.advanceWidth = advanceWidths[index]; });
                        fontArrayBuffer = font.toArrayBuffer();
                        return [4, this.blobStorage.uploadBlob(constants_1.IconsFontFileSourceKey, new Uint8Array(fontArrayBuffer), "font/ttf")];
                    case 6:
                        _a.sent();
                        iconFont = this.getIconFontContract();
                        Objects.setValue("fonts/icons", styles, iconFont);
                        return [2];
                }
            });
        });
    };
    FontManager.prototype.normalizeFontWeight = function (value) {
        var weight = parseInt(value);
        if (!weight) {
            return 400;
        }
        return Math.round(Math.round((weight / 100)) * 100);
    };
    FontManager.prototype.parseFontFile = function (file) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var content, info, fontWeight, fontStyle, fileNameParts, extension, identifier, blobKey, fontVariant;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4, Utils.readFileAsByteArray(file)];
                    case 1:
                        content = _c.sent();
                        info = opentype.parse(content);
                        fontWeight = this.normalizeFontWeight(((_b = (_a = info.tables) === null || _a === void 0 ? void 0 : _a.os2) === null || _b === void 0 ? void 0 : _b.usWeightClass) || 400);
                        fontStyle = "normal";
                        fileNameParts = file.name.split(".");
                        extension = fileNameParts.length > 1 ? "." + fileNameParts.pop() : "";
                        identifier = Utils.guid();
                        blobKey = "fonts/" + identifier + extension;
                        return [4, this.blobStorage.uploadBlob(blobKey, content, "font/ttf")];
                    case 2:
                        _c.sent();
                        fontVariant = {
                            weight: fontWeight,
                            style: fontStyle,
                            sourceKey: blobKey
                        };
                        return [2, fontVariant];
                }
            });
        });
    };
    FontManager.prototype.parseFontFiles = function (files) {
        return __awaiter(this, void 0, void 0, function () {
            var variants, identifier, fontContract;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Promise.all(files.map(function (file) { return _this.parseFontFile(file); }))];
                    case 1:
                        variants = _a.sent();
                        identifier = Utils.randomClassName();
                        fontContract = {
                            key: "fonts/" + identifier,
                            family: identifier,
                            displayName: "Custom Font",
                            category: null,
                            version: null,
                            lastModified: (new Date()).toISOString(),
                            variants: variants
                        };
                        return [2, fontContract];
                }
            });
        });
    };
    return FontManager;
}());
exports.FontManager = FontManager;
