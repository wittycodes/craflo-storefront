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
exports.StyleService = void 0;
var _ = require("lodash");
var Utils = require("@paperbits/common/utils");
var Objects = require("@paperbits/common/objects");
var Constants = require("@paperbits/common/constants");
var constants_1 = require("./constants");
var stylesPath = "styles";
var StyleService = (function () {
    function StyleService(objectStorage, styleHandlers, fontManager, httpClient) {
        this.objectStorage = objectStorage;
        this.styleHandlers = styleHandlers;
        this.fontManager = fontManager;
        this.httpClient = httpClient;
    }
    StyleService.prototype.sortByDisplayName = function (items) {
        return _.sortBy(items, ["displayName"]);
    };
    StyleService.prototype.getStyles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var stylesObject;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.objectStorage.getObject(stylesPath)];
                    case 1:
                        stylesObject = _a.sent();
                        if (!stylesObject) {
                            throw new Error("Data doesn't contain styles.");
                        }
                        this.styleHandlers.forEach(function (styleHandler) {
                            if (styleHandler.migrate) {
                                styleHandler.migrate(stylesObject.components[styleHandler.key]);
                            }
                            if (stylesObject.components[styleHandler.key]) {
                                return;
                            }
                            stylesObject.components[styleHandler.key] = styleHandler.getDefaultStyle();
                        });
                        return [2, stylesObject];
                }
            });
        });
    };
    StyleService.prototype.getStyleByKey = function (styleKey) {
        return __awaiter(this, void 0, void 0, function () {
            var styles, style, defaultStyle;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!styleKey) {
                            throw new Error("Parameter \"styleKey\" not specified.");
                        }
                        styleKey = styleKey.trim();
                        if (!constants_1.StylePrimitives.some(function (x) { return styleKey.startsWith(x + "/"); })) {
                            throw new Error("Unknown style premitive: \"" + styleKey + "\".");
                        }
                        return [4, this.getStyles()];
                    case 1:
                        styles = _a.sent();
                        style = Objects.getObjectAt(styleKey, styles);
                        if (style) {
                            return [2, style];
                        }
                        defaultStyle = this.styleHandlers
                            .map(function (handler) { return handler.getDefaultStyle(styleKey); })
                            .find(function (x) { return !!x; });
                        if (defaultStyle) {
                            return [2, defaultStyle];
                        }
                        throw new Error("Neither style nor default can be fetched by key \"" + styleKey + "\".");
                }
            });
        });
    };
    StyleService.prototype.addColorVariation = function (variationName) {
        return __awaiter(this, void 0, void 0, function () {
            var styles, newVariation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getStyles()];
                    case 1:
                        styles = _a.sent();
                        newVariation = Objects.clone(styles["colors"]["default"]);
                        newVariation.key = "colors/" + variationName;
                        newVariation.displayName = "< Unnamed >";
                        Objects.setValue("colors/" + variationName, styles, newVariation);
                        this.updateStyles(styles);
                        return [2, newVariation];
                }
            });
        });
    };
    StyleService.prototype.getColors = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.getPrimitives("colors")];
            });
        });
    };
    StyleService.prototype.addGradientVariation = function (variationName) {
        return __awaiter(this, void 0, void 0, function () {
            var styles, gradient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getStyles()];
                    case 1:
                        styles = _a.sent();
                        gradient = {
                            key: "gradients/" + variationName,
                            displayName: "Gradient",
                            direction: "45deg",
                            colorStops: [{
                                    color: "#87E0FD",
                                    length: 0
                                },
                                {
                                    color: "#05ABE0",
                                    length: 100
                                }]
                        };
                        gradient.displayName = "< Unnamed >";
                        Objects.setValue("gradients/" + variationName, styles, gradient);
                        this.updateStyles(styles);
                        return [2, gradient];
                }
            });
        });
    };
    StyleService.prototype.getPrimitives = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var styles, primitives;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getStyles()];
                    case 1:
                        styles = _a.sent();
                        primitives = styles[type]
                            ? Object
                                .values(styles[type])
                                .filter(function (primitive) { return !!primitive; })
                            : [];
                        return [2, this.sortByDisplayName(primitives)];
                }
            });
        });
    };
    StyleService.prototype.getGadients = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.getPrimitives("gradients")];
            });
        });
    };
    StyleService.prototype.addShadowVariation = function (variationName) {
        return __awaiter(this, void 0, void 0, function () {
            var styles, newVariation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getStyles()];
                    case 1:
                        styles = _a.sent();
                        newVariation = { blur: 1, spread: 1, color: "rgba(0, 0, 0, 0.1)", inset: false, offsetX: 1, offsetY: 1 };
                        newVariation.key = "shadows/" + variationName;
                        newVariation.displayName = "< Unnamed >";
                        Objects.setValue("shadows/" + variationName, styles, newVariation);
                        this.updateStyles(styles);
                        return [2, newVariation];
                }
            });
        });
    };
    StyleService.prototype.getShadows = function () {
        return __awaiter(this, void 0, void 0, function () {
            var shadows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getPrimitives("shadows")];
                    case 1:
                        shadows = _a.sent();
                        return [2, shadows.filter(function (x) { return x !== null && x.key !== "shadows/none"; })];
                }
            });
        });
    };
    StyleService.prototype.rewriteVariationKeysRecursively = function (variation, parentKey) {
        var _this = this;
        variation["key"] = parentKey;
        if (!variation["components"]) {
            return;
        }
        Object.keys(variation["components"]).forEach(function (componentKey) {
            var subComponent = variation["components"][componentKey];
            Object.keys(subComponent).forEach(function (subComponentVariationKey) {
                var subComponentVariation = subComponent[subComponentVariationKey];
                var key = parentKey + "/components/" + componentKey + "/" + subComponentVariationKey;
                _this.rewriteVariationKeysRecursively(subComponentVariation, key);
            });
        });
    };
    StyleService.prototype.addComponentVariation = function (componentName, variationName, snippet) {
        return __awaiter(this, void 0, void 0, function () {
            var styles, defaultVariation, variation, key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getStyles()];
                    case 1:
                        styles = _a.sent();
                        defaultVariation = snippet.variations.find(function (x) { return x.key === "components/" + componentName + "/default"; });
                        if (!defaultVariation) {
                            throw new Error("Default variation for component \"" + componentName + "\" not found.");
                        }
                        variation = Objects.clone(defaultVariation);
                        key = "components/" + componentName + "/" + variationName;
                        this.rewriteVariationKeysRecursively(variation, key);
                        variation.key = key;
                        variation.displayName = "< Unnamed >";
                        variation.category = "appearance";
                        styles.components[componentName][variationName] = variation;
                        this.updateStyles(styles);
                        return [2, variation.key];
                }
            });
        });
    };
    StyleService.prototype.addTextStyleVariation = function (variationName) {
        return __awaiter(this, void 0, void 0, function () {
            var styles, variation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getStyles()];
                    case 1:
                        styles = _a.sent();
                        variation = {
                            key: "globals/body/" + variationName,
                            displayName: "< Unnamed >"
                        };
                        styles.globals["body"][variationName] = variation;
                        this.updateStyles(styles);
                        return [2, variation];
                }
            });
        });
    };
    StyleService.prototype.updateStyles = function (updatedStyles) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.objectStorage.updateObject(stylesPath, updatedStyles);
                return [2];
            });
        });
    };
    StyleService.prototype.mergeStyles = function (appendStyles) {
        return __awaiter(this, void 0, void 0, function () {
            var styles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getStyles()];
                    case 1:
                        styles = _a.sent();
                        return [4, this.updateStyles(_.merge(styles, appendStyles))];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    StyleService.prototype.updateStyle = function (style) {
        return __awaiter(this, void 0, void 0, function () {
            var styles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!style) {
                            throw new Error("Style cannot be empty.");
                        }
                        if (!style.key) {
                            throw new Error("Style doesn't have key.");
                        }
                        return [4, this.getStyles()];
                    case 1:
                        styles = _a.sent();
                        Objects.setValue(style.key, styles, style);
                        return [4, this.updateStyles(styles)];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    StyleService.prototype.getVariations = function (categoryName, subCategoryName) {
        return __awaiter(this, void 0, void 0, function () {
            var styles, categoryStyles, category, states, variations;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!categoryName) {
                            throw new Error("Parameter \"categoryName\" not specified.");
                        }
                        return [4, this.getStyles()];
                    case 1:
                        styles = _a.sent();
                        if (subCategoryName) {
                            categoryStyles = styles[categoryName][subCategoryName];
                        }
                        else {
                            categoryStyles = styles[categoryName];
                        }
                        category = Object.keys(categoryStyles);
                        states = this.getAllowedStates(categoryStyles);
                        variations = category.map(function (variationName) {
                            var variationContract = categoryStyles[variationName];
                            if (states && variationName !== "default") {
                                variationContract["allowedStates"] = states;
                            }
                            return variationContract;
                        });
                        return [2, variations.filter(function (variation) { return !!variation; })];
                }
            });
        });
    };
    StyleService.prototype.getAllowedStates = function (styles) {
        var states = styles["default"]["allowedStates"];
        if (states) {
            return states;
        }
        return undefined;
    };
    StyleService.prototype.getComponentVariations = function (componentName) {
        return __awaiter(this, void 0, void 0, function () {
            var styles, componentStyles, states, variations;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!componentName) {
                            throw new Error("Parameter \"componentName\" not specified.");
                        }
                        return [4, this.getStyles()];
                    case 1:
                        styles = _a.sent();
                        componentStyles = styles.components[componentName];
                        states = this.getAllowedStates(componentStyles);
                        variations = Object.keys(componentStyles).map(function (variationName) {
                            var variationContract = componentStyles[variationName];
                            if (states && variationName !== "default") {
                                variationContract.allowedStates = states;
                            }
                            return variationContract;
                        });
                        return [2, variations];
                }
            });
        });
    };
    StyleService.prototype.removeStyle = function (styleKey) {
        return __awaiter(this, void 0, void 0, function () {
            var styles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!styleKey) {
                            throw new Error("Parameter \"styleKey\" not specified.");
                        }
                        return [4, this.getStyles()];
                    case 1:
                        styles = _a.sent();
                        Objects.setValue(styleKey, styles, null);
                        return [4, this.objectStorage.updateObject("" + stylesPath, styles)];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    StyleService.prototype.checkStyleIsInUse = function (styleKey) {
        return __awaiter(this, void 0, void 0, function () {
            var styles, style, referencedStyles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!styleKey) {
                            throw new Error("Parameter \"styleKey\" not specified.");
                        }
                        return [4, this.getStyles()];
                    case 1:
                        styles = _a.sent();
                        style = Objects.getObjectAt(styleKey, styles);
                        referencedStyles = Utils.findNodesRecursively(function (node) {
                            var found = false;
                            if (node !== style && node.displayName) {
                                var res = Utils.findNodesRecursively(function (styleNode) {
                                    var f = false;
                                    Object.keys(styleNode).forEach(function (y) {
                                        if (styleNode[y] === styleKey) {
                                            f = true;
                                        }
                                    });
                                    return f;
                                }, node);
                                if (res.length > 0) {
                                    found = true;
                                }
                            }
                            return found;
                        }, styles);
                        return [2, referencedStyles];
                }
            });
        });
    };
    StyleService.prototype.addIcon = function (glyph) {
        return __awaiter(this, void 0, void 0, function () {
            var styles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getStyles()];
                    case 1:
                        styles = _a.sent();
                        return [4, this.fontManager.addGlyph(styles, glyph)];
                    case 2:
                        _a.sent();
                        return [4, this.updateStyles(styles)];
                    case 3:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    StyleService.prototype.removeIcon = function (iconKey) {
        return __awaiter(this, void 0, void 0, function () {
            var styles, icon;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getStyles()];
                    case 1:
                        styles = _a.sent();
                        icon = Objects.getObjectAt(iconKey, styles);
                        if (!icon) return [3, 4];
                        return [4, this.fontManager.removeGlyph(styles, icon.unicode)];
                    case 2:
                        _a.sent();
                        return [4, this.removeStyle(iconKey)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2];
                }
            });
        });
    };
    StyleService.prototype.getIcons = function () {
        return __awaiter(this, void 0, void 0, function () {
            var icons;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getPrimitives("icons")];
                    case 1:
                        icons = _a.sent();
                        return [2, icons];
                }
            });
        });
    };
    StyleService.prototype.getIconFont = function () {
        return __awaiter(this, void 0, void 0, function () {
            var styles, iconFont;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getStyles()];
                    case 1:
                        styles = _a.sent();
                        iconFont = Objects.getObjectAt("fonts/icons", styles);
                        return [2, iconFont];
                }
            });
        });
    };
    StyleService.prototype.getExternalIconFonts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var iconFontsUrl, response, iconFontsData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        iconFontsUrl = Constants.iconsFontsLibraryUrl;
                        return [4, this.httpClient.send({
                                url: iconFontsUrl,
                                method: "GET"
                            })];
                    case 1:
                        response = _a.sent();
                        if (response.statusCode !== 200) {
                            return [2, []];
                        }
                        iconFontsData = response.toObject();
                        return [2, iconFontsData.fonts];
                }
            });
        });
    };
    StyleService.prototype.getFonts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fonts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getPrimitives("fonts")];
                    case 1:
                        fonts = _a.sent();
                        return [2, fonts];
                }
            });
        });
    };
    StyleService.prototype.getFont = function (fontKey) {
        return __awaiter(this, void 0, void 0, function () {
            var fonts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getPrimitives("fonts")];
                    case 1:
                        fonts = _a.sent();
                        return [2, fonts.find(function (x) { return x.key === fontKey; })];
                }
            });
        });
    };
    StyleService.prototype.getTextVariations = function () {
        return __awaiter(this, void 0, void 0, function () {
            var textStylesVariations;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getVariations("globals", "body")];
                    case 1:
                        textStylesVariations = _a.sent();
                        return [2, this.sortByDisplayName(textStylesVariations)];
                }
            });
        });
    };
    return StyleService;
}());
exports.StyleService = StyleService;
