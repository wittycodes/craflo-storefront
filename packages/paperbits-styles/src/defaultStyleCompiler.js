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
exports.DefaultStyleCompiler = void 0;
var Utils = require("@paperbits/common/utils");
var Objects = require("@paperbits/common/objects");
var styleUitls_1 = require("./styleUitls");
var breakpoints_1 = require("@paperbits/common/styles/breakpoints");
var plugins_1 = require("./plugins");
var gridStylePlugin_1 = require("./plugins/grid/gridStylePlugin");
var gridCellStylePlugin_1 = require("./plugins/grid/gridCellStylePlugin");
var styles_1 = require("@paperbits/common/styles");
var jssCompiler_1 = require("./jssCompiler");
var constants_1 = require("./constants");
var DefaultStyleCompiler = (function () {
    function DefaultStyleCompiler(styleService, permalinkResolver) {
        this.styleService = styleService;
        this.permalinkResolver = permalinkResolver;
        this.pluginsToRefresh = ["border", "background", "shadow", "animation", "typography"];
        this.plugins = {};
    }
    DefaultStyleCompiler.prototype.isResponsive = function (variation) {
        if (!variation) {
            throw new Error("Parameter \"variation\" not specified.");
        }
        return Object.keys(variation).some(function (props) { return Object.keys(breakpoints_1.BreakpointValues).includes(props); });
    };
    DefaultStyleCompiler.prototype.setStyles = function (styles) {
        this.styles = styles;
    };
    DefaultStyleCompiler.prototype.getStyles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.styles && !this.styleService) {
                            console.error("Styles provider is not set!");
                        }
                        _a = this.styles;
                        if (_a) return [3, 2];
                        return [4, this.styleService.getStyles()];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        result = _a;
                        Objects.cleanupObject(result, true);
                        return [2, result];
                }
            });
        });
    };
    DefaultStyleCompiler.prototype.initializePlugins = function () {
        return __awaiter(this, void 0, void 0, function () {
            var themeContract;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getStyles()];
                    case 1:
                        themeContract = _a.sent();
                        if (Object.keys(this.plugins).length > 0) {
                            if (themeContract) {
                                this.pluginsToRefresh.map(function (pluginName) {
                                    var plugin = _this.plugins[pluginName];
                                    if (plugin.setThemeContract) {
                                        plugin.setThemeContract(themeContract);
                                    }
                                    else {
                                        console.error("Plugin " + pluginName + " does not support setThemeContract");
                                    }
                                });
                            }
                            return [2];
                        }
                        this.plugins["padding"] = new plugins_1.PaddingStylePlugin();
                        this.plugins["margin"] = new plugins_1.MarginStylePlugin();
                        this.plugins["border"] = new plugins_1.BorderStylePlugin(themeContract);
                        this.plugins["borderRadius"] = new plugins_1.BorderRadiusStylePlugin();
                        this.plugins["background"] = new plugins_1.BackgroundStylePlugin(themeContract, this.permalinkResolver);
                        this.plugins["shadow"] = new plugins_1.ShadowStylePlugin(themeContract);
                        this.plugins["animation"] = new plugins_1.AnimationStylePlugin(themeContract);
                        this.plugins["typography"] = new plugins_1.TypographyStylePlugin(themeContract);
                        this.plugins["list"] = new plugins_1.ListStylePlugin();
                        this.plugins["components"] = new plugins_1.ComponentsStylePlugin(this);
                        this.plugins["states"] = new plugins_1.StatesStylePlugin(this);
                        this.plugins["grid"] = new gridStylePlugin_1.GridStylePlugin();
                        this.plugins["grid-cell"] = new gridCellStylePlugin_1.GridCellStylePlugin();
                        this.plugins["container"] = new plugins_1.ContainerStylePlugin();
                        this.plugins["size"] = new plugins_1.SizeStylePlugin();
                        this.plugins["transform"] = new plugins_1.TransformStylePlugin();
                        this.plugins["transition"] = new plugins_1.TransitionStylePlugin();
                        this.plugins["stickTo"] = new plugins_1.StickToStylePlugin();
                        return [2];
                }
            });
        });
    };
    DefaultStyleCompiler.prototype.getStyleSheet = function () {
        return __awaiter(this, void 0, void 0, function () {
            var styleSheet, themeContract, fontsPlugin, fontFaces, _i, _a, componentName, componentConfig, componentStyle, variations, _b, variations_1, variationName, variationStyle, _c, _d, variationName, textStyle, _e, _f, variationName, contentStyle, _g, _h, tagName, tagConfig, defaultComponentStyle, variations, _j, variations_2, variationName, componentName, variationStyle, _k, _l, colorName, colorStyleSelector, colorStyle, iconBaseStyle, iconNames, _m, iconNames_1, iconName, icon, formattedUnicode, iconStyleSelector, iconStyle, pseudoStyle;
            var _o;
            return __generator(this, function (_p) {
                switch (_p.label) {
                    case 0: return [4, this.initializePlugins()];
                    case 1:
                        _p.sent();
                        styleSheet = new styles_1.StyleSheet("global");
                        return [4, this.getStyles()];
                    case 2:
                        themeContract = _p.sent();
                        fontsPlugin = new plugins_1.FontsStylePlugin(this.permalinkResolver, themeContract);
                        return [4, fontsPlugin.contractToFontFaces()];
                    case 3:
                        fontFaces = _p.sent();
                        (_o = styleSheet.fontFaces).push.apply(_o, fontFaces);
                        if (!themeContract.components) return [3, 11];
                        _i = 0, _a = Object.keys(themeContract.components);
                        _p.label = 4;
                    case 4:
                        if (!(_i < _a.length)) return [3, 11];
                        componentName = _a[_i];
                        componentConfig = themeContract.components[componentName];
                        return [4, this.getVariationStyle(componentConfig["default"], componentName)];
                    case 5:
                        componentStyle = _p.sent();
                        variations = Object.keys(componentConfig);
                        _b = 0, variations_1 = variations;
                        _p.label = 6;
                    case 6:
                        if (!(_b < variations_1.length)) return [3, 9];
                        variationName = variations_1[_b];
                        if (variationName === "default") {
                            return [3, 8];
                        }
                        return [4, this.getVariationStyle(componentConfig[variationName], componentName, variationName)];
                    case 7:
                        variationStyle = _p.sent();
                        componentStyle.modifierStyles.push(variationStyle);
                        _p.label = 8;
                    case 8:
                        _b++;
                        return [3, 6];
                    case 9:
                        styleSheet.styles.push(componentStyle);
                        _p.label = 10;
                    case 10:
                        _i++;
                        return [3, 4];
                    case 11:
                        if (!themeContract.utils) return [3, 19];
                        _c = 0, _d = Object.keys(themeContract.utils.text);
                        _p.label = 12;
                    case 12:
                        if (!(_c < _d.length)) return [3, 15];
                        variationName = _d[_c];
                        return [4, this.getVariationStyle(themeContract.utils.text[variationName], "text", variationName)];
                    case 13:
                        textStyle = _p.sent();
                        styleSheet.styles.push(textStyle);
                        _p.label = 14;
                    case 14:
                        _c++;
                        return [3, 12];
                    case 15:
                        _e = 0, _f = Object.keys(themeContract.utils.content);
                        _p.label = 16;
                    case 16:
                        if (!(_e < _f.length)) return [3, 19];
                        variationName = _f[_e];
                        return [4, this.getVariationStyle(themeContract.utils.content[variationName], "content", variationName)];
                    case 17:
                        contentStyle = _p.sent();
                        styleSheet.styles.push(contentStyle);
                        _p.label = 18;
                    case 18:
                        _e++;
                        return [3, 16];
                    case 19:
                        if (!themeContract.globals) return [3, 27];
                        _g = 0, _h = Object.keys(themeContract.globals);
                        _p.label = 20;
                    case 20:
                        if (!(_g < _h.length)) return [3, 27];
                        tagName = _h[_g];
                        tagConfig = themeContract.globals[tagName];
                        return [4, this.getVariationStyle(tagConfig["default"], tagName, "default", true)];
                    case 21:
                        defaultComponentStyle = _p.sent();
                        variations = Object.keys(tagConfig);
                        if (!defaultComponentStyle && variations.length <= 1) {
                            return [3, 26];
                        }
                        _j = 0, variations_2 = variations;
                        _p.label = 22;
                    case 22:
                        if (!(_j < variations_2.length)) return [3, 25];
                        variationName = variations_2[_j];
                        if (variationName === "default") {
                            return [3, 24];
                        }
                        componentName = Utils.camelCaseToKebabCase(tagName === "body" ? "text" : tagName);
                        return [4, this.getVariationStyle(tagConfig[variationName], componentName, variationName, true)];
                    case 23:
                        variationStyle = _p.sent();
                        if (variationStyle) {
                            if (componentName === "text") {
                                defaultComponentStyle.nestedStyles.push(variationStyle);
                            }
                            else {
                                defaultComponentStyle.modifierStyles.push(variationStyle);
                            }
                        }
                        _p.label = 24;
                    case 24:
                        _j++;
                        return [3, 22];
                    case 25:
                        styleSheet.globalStyles.push(defaultComponentStyle);
                        _p.label = 26;
                    case 26:
                        _g++;
                        return [3, 20];
                    case 27:
                        if (themeContract.colors) {
                            for (_k = 0, _l = Object.keys(themeContract.colors); _k < _l.length; _k++) {
                                colorName = _l[_k];
                                colorStyleSelector = "colors-" + Utils.camelCaseToKebabCase(colorName);
                                colorStyle = new styles_1.Style(colorStyleSelector);
                                colorStyle.addRule(new styles_1.StyleRule("color", themeContract.colors[colorName].value));
                                styleSheet.styles.push(colorStyle);
                            }
                        }
                        if (themeContract.icons) {
                            iconBaseStyle = this.getIconFontStyle();
                            styleSheet.styles.push(iconBaseStyle);
                            iconNames = Object.keys(themeContract.icons);
                            for (_m = 0, iconNames_1 = iconNames; _m < iconNames_1.length; _m++) {
                                iconName = iconNames_1[_m];
                                icon = themeContract.icons[iconName];
                                formattedUnicode = styleUitls_1.formatUnicode(icon.unicode);
                                iconStyleSelector = "icon-" + Utils.camelCaseToKebabCase(iconName);
                                iconStyle = new styles_1.Style(iconStyleSelector);
                                pseudoStyle = new styles_1.Style("before");
                                pseudoStyle.addRule(new styles_1.StyleRule("content", "'\\\\" + formattedUnicode + "'"));
                                iconStyle.pseudoStyles.push(pseudoStyle);
                                styleSheet.styles.push(iconStyle);
                            }
                        }
                        return [2, styleSheet];
                }
            });
        });
    };
    DefaultStyleCompiler.prototype.compileCss = function () {
        return __awaiter(this, void 0, void 0, function () {
            var styleSheet, compiler, css;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getStyleSheet()];
                    case 1:
                        styleSheet = _a.sent();
                        compiler = new jssCompiler_1.JssCompiler();
                        css = compiler.compile(styleSheet);
                        return [2, css];
                }
            });
        });
    };
    DefaultStyleCompiler.prototype.getVariationStyle = function (variationConfig, componentName, variationName, isGlobal) {
        if (variationName === void 0) { variationName = null; }
        if (isGlobal === void 0) { isGlobal = false; }
        return __awaiter(this, void 0, void 0, function () {
            var selector, resultStyle, mediaQueries, _i, _a, pluginName, plugin, pluginConfig, rules, pseudoStyles, nestedStyles, _b, _c, breakpoint, breakpointConfig, pluginRules_1, pseudoStyles_1, nestedStyles_1, selector_1, mediaQuery, style, pluginRules, pseudoStyles, nestedStyles;
            var _d, _e, _f, _g, _h, _j, _k, _l, _m;
            return __generator(this, function (_o) {
                switch (_o.label) {
                    case 0: return [4, this.initializePlugins()];
                    case 1:
                        _o.sent();
                        selector = variationName ? (componentName + "-" + variationName).replace("-default", "") : componentName;
                        resultStyle = new styles_1.Style(selector);
                        if (!variationName) {
                            variationName = "default";
                        }
                        mediaQueries = {};
                        _i = 0, _a = Object.keys(variationConfig);
                        _o.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3, 17];
                        pluginName = _a[_i];
                        if (pluginName === "allowedStates") {
                            return [3, 16];
                        }
                        plugin = this.plugins[pluginName];
                        if (!plugin) {
                            return [3, 16];
                        }
                        pluginConfig = variationConfig[pluginName];
                        if (!!this.isResponsive(pluginConfig)) return [3, 6];
                        return [4, plugin.configToStyleRules(pluginConfig)];
                    case 3:
                        rules = _o.sent();
                        resultStyle.addRules(rules);
                        return [4, plugin.configToPseudoStyles(pluginConfig)];
                    case 4:
                        pseudoStyles = _o.sent();
                        (_d = resultStyle.pseudoStyles).push.apply(_d, pseudoStyles);
                        return [4, plugin.configToNestedStyles(pluginConfig)];
                    case 5:
                        nestedStyles = _o.sent();
                        if (isGlobal) {
                            (_e = resultStyle.nestedGlobalStyles).push.apply(_e, nestedStyles);
                        }
                        else {
                            (_f = resultStyle.nestedStyles).push.apply(_f, nestedStyles);
                        }
                        (_g = resultStyle.nestedStyles).push.apply(_g, nestedStyles);
                        return [3, 16];
                    case 6:
                        _b = 0, _c = Object.keys(breakpoints_1.BreakpointValues);
                        _o.label = 7;
                    case 7:
                        if (!(_b < _c.length)) return [3, 16];
                        breakpoint = _c[_b];
                        breakpointConfig = pluginConfig[breakpoint];
                        if (!breakpointConfig) {
                            return [3, 15];
                        }
                        if (!(breakpoint === "xs")) return [3, 11];
                        return [4, plugin.configToStyleRules(breakpointConfig)];
                    case 8:
                        pluginRules_1 = _o.sent();
                        resultStyle.addRules(pluginRules_1);
                        return [4, plugin.configToPseudoStyles(breakpointConfig)];
                    case 9:
                        pseudoStyles_1 = _o.sent();
                        (_h = resultStyle.pseudoStyles).push.apply(_h, pseudoStyles_1);
                        return [4, plugin.configToNestedStyles(breakpointConfig)];
                    case 10:
                        nestedStyles_1 = _o.sent();
                        (_j = resultStyle.nestedStyles).push.apply(_j, nestedStyles_1);
                        return [3, 15];
                    case 11:
                        selector_1 = isGlobal
                            ? componentName
                            : (componentName + "-" + breakpoint + "-" + variationName).replace("-default", "");
                        mediaQuery = mediaQueries[breakpoint];
                        style = void 0;
                        if (!mediaQuery) {
                            mediaQuery = new styles_1.StyleMediaQuery(breakpoints_1.BreakpointValues[breakpoint]);
                            mediaQueries[breakpoint] = mediaQuery;
                            resultStyle.nestedMediaQueries.push(mediaQuery);
                            style = new styles_1.Style(selector_1);
                            mediaQuery.styles.push(style);
                        }
                        else {
                            style = mediaQuery.styles[0];
                        }
                        return [4, plugin.configToStyleRules(breakpointConfig)];
                    case 12:
                        pluginRules = _o.sent();
                        (_k = style.rules).push.apply(_k, pluginRules);
                        return [4, plugin.configToPseudoStyles(breakpointConfig)];
                    case 13:
                        pseudoStyles = _o.sent();
                        (_l = style.pseudoStyles).push.apply(_l, pseudoStyles);
                        return [4, plugin.configToNestedStyles(breakpointConfig)];
                    case 14:
                        nestedStyles = _o.sent();
                        (_m = style.nestedStyles).push.apply(_m, nestedStyles);
                        _o.label = 15;
                    case 15:
                        _b++;
                        return [3, 7];
                    case 16:
                        _i++;
                        return [3, 2];
                    case 17: return [2, resultStyle];
                }
            });
        });
    };
    DefaultStyleCompiler.prototype.getVariationClassNames = function (variations, componentName, variationName) {
        if (variationName === void 0) { variationName = null; }
        var classNames = [];
        if (!variationName) {
            variationName = "default";
        }
        for (var _i = 0, _a = Object.keys(variations); _i < _a.length; _i++) {
            var pluginName = _a[_i];
            var pluginConfig = variations[pluginName];
            if (this.isResponsive(pluginConfig)) {
                for (var _b = 0, _c = Object.keys(breakpoints_1.BreakpointValues); _b < _c.length; _b++) {
                    var breakpoint = _c[_b];
                    var breakpointConfig = pluginConfig[breakpoint];
                    if (breakpointConfig) {
                        var className = void 0;
                        if (breakpoint === "xs") {
                            className = (componentName + "-" + variationName).replace("-default", "");
                        }
                        else {
                            className = (componentName + "-" + breakpoint + "-" + variationName).replace("-default", "");
                        }
                        classNames.push(className);
                    }
                }
            }
            else {
                var className = (componentName + "-" + variationName).replace("-default", "");
                classNames.push(className);
            }
        }
        return classNames;
    };
    DefaultStyleCompiler.prototype.getStateStyle = function (states, stateName) {
        return __awaiter(this, void 0, void 0, function () {
            var stateStyle, _i, _a, pluginName, plugin, pluginConfig, pluginRules, nestedStyles;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        stateStyle = new styles_1.Style(stateName);
                        _i = 0, _a = Object.keys(states);
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3, 5];
                        pluginName = _a[_i];
                        plugin = this.plugins[pluginName];
                        if (!plugin) return [3, 4];
                        pluginConfig = states[pluginName];
                        return [4, plugin.configToStyleRules(pluginConfig)];
                    case 2:
                        pluginRules = _c.sent();
                        stateStyle.addRules(pluginRules);
                        return [4, plugin.configToNestedStyles(pluginConfig)];
                    case 3:
                        nestedStyles = _c.sent();
                        (_b = stateStyle.nestedStyles).push.apply(_b, nestedStyles);
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3, 1];
                    case 5: return [2, stateStyle];
                }
            });
        });
    };
    DefaultStyleCompiler.prototype.getIconFontStyle = function () {
        var iconBaseStyle = new styles_1.Style("icon");
        iconBaseStyle.addRule(new styles_1.StyleRule("display", "inline-block"));
        iconBaseStyle.addRule(new styles_1.StyleRule("font-family", constants_1.IconsFontFamilyName));
        iconBaseStyle.addRule(new styles_1.StyleRule("font-style", constants_1.IconsFontStyleName));
        iconBaseStyle.addRule(new styles_1.StyleRule("font-weight", constants_1.IconsFontWeight));
        iconBaseStyle.addRule(new styles_1.StyleRule("font-size", "1em"));
        iconBaseStyle.addRule(new styles_1.StyleRule("vertical-align", "middle"));
        iconBaseStyle.addRule(new styles_1.StyleRule("speak", "none"));
        iconBaseStyle.addRule(new styles_1.StyleRule("text-transform", "none"));
        iconBaseStyle.addRule(new styles_1.StyleRule("-webkit-font-smoothing", "antialiased"));
        iconBaseStyle.addRule(new styles_1.StyleRule("-moz-osx-font-smoothing", "grayscale"));
        return iconBaseStyle;
    };
    DefaultStyleCompiler.prototype.getIconFontStylesCss = function () {
        return __awaiter(this, void 0, void 0, function () {
            var themeContract, fontsPlugin, fontFaces, iconFontFace, styleSheet, iconBaseStyle, iconNames, _i, iconNames_2, iconName, icon, formattedUnicode, iconStyleSelector, iconStyle, pseudoStyle, compiler, css;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getStyles()];
                    case 1:
                        themeContract = _a.sent();
                        fontsPlugin = new plugins_1.FontsStylePlugin(this.permalinkResolver, themeContract);
                        return [4, fontsPlugin.contractToFontFaces()];
                    case 2:
                        fontFaces = _a.sent();
                        iconFontFace = fontFaces.find(function (x) { return x.fontFamily === constants_1.IconsFontFamilyName; });
                        styleSheet = new styles_1.StyleSheet();
                        styleSheet.fontFaces.push(iconFontFace);
                        iconBaseStyle = this.getIconFontStyle();
                        styleSheet.styles.push(iconBaseStyle);
                        if (themeContract.icons) {
                            iconNames = Object.keys(themeContract.icons);
                            for (_i = 0, iconNames_2 = iconNames; _i < iconNames_2.length; _i++) {
                                iconName = iconNames_2[_i];
                                icon = themeContract.icons[iconName];
                                formattedUnicode = styleUitls_1.formatUnicode(icon.unicode);
                                iconStyleSelector = "icon-" + Utils.camelCaseToKebabCase(iconName);
                                iconStyle = new styles_1.Style(iconStyleSelector);
                                pseudoStyle = new styles_1.Style("before");
                                pseudoStyle.addRule(new styles_1.StyleRule("content", "'\\\\" + formattedUnicode + "'"));
                                iconStyle.pseudoStyles.push(pseudoStyle);
                                styleSheet.styles.push(iconStyle);
                            }
                        }
                        compiler = new jssCompiler_1.JssCompiler();
                        css = compiler.compile(styleSheet);
                        return [2, css];
                }
            });
        });
    };
    DefaultStyleCompiler.prototype.getFontsStylesCss = function () {
        return __awaiter(this, void 0, void 0, function () {
            var themeContract, fontsPlugin, fontFaces, styleSheet, compiler, css;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.getStyles()];
                    case 1:
                        themeContract = _b.sent();
                        fontsPlugin = new plugins_1.FontsStylePlugin(this.permalinkResolver, themeContract);
                        return [4, fontsPlugin.contractToFontFaces()];
                    case 2:
                        fontFaces = _b.sent();
                        styleSheet = new styles_1.StyleSheet();
                        (_a = styleSheet.fontFaces).push.apply(_a, fontFaces);
                        compiler = new jssCompiler_1.JssCompiler();
                        css = compiler.compile(styleSheet);
                        return [2, css];
                }
            });
        });
    };
    DefaultStyleCompiler.prototype.getClassNameByColorKey = function (colorKey) {
        return Utils.camelCaseToKebabCase(colorKey.replaceAll("/", "-"));
    };
    DefaultStyleCompiler.prototype.getClassNamesForLocalStylesAsync = function (styleConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var classNames, _i, _a, category, categoryConfig, _b, _c, breakpoint, className_1, styleKey, className;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        classNames = [];
                        _i = 0, _a = Object.keys(styleConfig);
                        _d.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3, 12];
                        category = _a[_i];
                        categoryConfig = styleConfig[category];
                        if (!categoryConfig) {
                            return [3, 11];
                        }
                        if (!this.isResponsive(categoryConfig)) return [3, 9];
                        _b = 0, _c = Object.keys(categoryConfig);
                        _d.label = 2;
                    case 2:
                        if (!(_b < _c.length)) return [3, 8];
                        breakpoint = _c[_b];
                        className_1 = void 0;
                        if (!(breakpoint === "xs")) return [3, 4];
                        return [4, this.getClassNameByStyleKeyAsync(categoryConfig[breakpoint])];
                    case 3:
                        className_1 = _d.sent();
                        return [3, 6];
                    case 4: return [4, this.getClassNameByStyleKeyAsync(categoryConfig[breakpoint], breakpoint)];
                    case 5:
                        className_1 = _d.sent();
                        _d.label = 6;
                    case 6:
                        if (className_1) {
                            classNames.push(className_1);
                        }
                        _d.label = 7;
                    case 7:
                        _b++;
                        return [3, 2];
                    case 8: return [3, 11];
                    case 9:
                        styleKey = categoryConfig;
                        return [4, this.getClassNameByStyleKeyAsync(styleKey)];
                    case 10:
                        className = _d.sent();
                        if (className) {
                            classNames.push(className);
                        }
                        _d.label = 11;
                    case 11:
                        _i++;
                        return [3, 1];
                    case 12: return [2, classNames.join(" ")];
                }
            });
        });
    };
    DefaultStyleCompiler.prototype.getStyleModelAsync = function (localStyles, styleManager) {
        return __awaiter(this, void 0, void 0, function () {
            var classNames, variationStyle, key, _i, _a, category, categoryConfig, pluginBag, instanceClassName, instanceClassNames, pluginBag, _b, _c, breakpoint, className, styleKey, className, localStyleSheet, result;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        classNames = [];
                        _i = 0, _a = Object.keys(localStyles);
                        _d.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3, 15];
                        category = _a[_i];
                        categoryConfig = localStyles[category];
                        if (!categoryConfig) {
                            return [3, 14];
                        }
                        if (!(category === "instance")) return [3, 4];
                        pluginBag = categoryConfig;
                        instanceClassName = pluginBag.key || Utils.randomClassName();
                        pluginBag.key = instanceClassName;
                        key = pluginBag.key;
                        return [4, this.getVariationStyle(pluginBag, instanceClassName)];
                    case 2:
                        variationStyle = _d.sent();
                        return [4, this.getVariationClassNames(pluginBag, instanceClassName)];
                    case 3:
                        instanceClassNames = _d.sent();
                        classNames.push.apply(classNames, instanceClassNames);
                        return [3, 14];
                    case 4:
                        if (!this.isResponsive(categoryConfig)) return [3, 12];
                        pluginBag = categoryConfig;
                        _b = 0, _c = Object.keys(pluginBag);
                        _d.label = 5;
                    case 5:
                        if (!(_b < _c.length)) return [3, 11];
                        breakpoint = _c[_b];
                        className = void 0;
                        if (!(breakpoint === "xs")) return [3, 7];
                        return [4, this.getClassNameByStyleKeyAsync(pluginBag[breakpoint])];
                    case 6:
                        className = _d.sent();
                        return [3, 9];
                    case 7: return [4, this.getClassNameByStyleKeyAsync(pluginBag[breakpoint], breakpoint)];
                    case 8:
                        className = _d.sent();
                        _d.label = 9;
                    case 9:
                        if (className) {
                            classNames.push(className);
                        }
                        _d.label = 10;
                    case 10:
                        _b++;
                        return [3, 5];
                    case 11: return [3, 14];
                    case 12:
                        styleKey = categoryConfig;
                        return [4, this.getClassNameByStyleKeyAsync(styleKey)];
                    case 13:
                        className = _d.sent();
                        if (className) {
                            classNames.push(className);
                        }
                        _d.label = 14;
                    case 14:
                        _i++;
                        return [3, 1];
                    case 15:
                        localStyleSheet = new styles_1.StyleSheet(key);
                        if (variationStyle) {
                            localStyleSheet.styles.push(variationStyle);
                        }
                        result = {
                            key: key,
                            classNames: classNames.join(" "),
                            styleSheet: localStyleSheet,
                            styleManager: styleManager
                        };
                        return [2, result];
                }
            });
        });
    };
    DefaultStyleCompiler.prototype.getClassNameByStyleKeyAsync = function (key, breakpoint) {
        return __awaiter(this, void 0, void 0, function () {
            var segments, category, component, componentVariation, classNames, className, styles, style;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!key) {
                            throw new Error("Parameter \"key\" not specified.");
                        }
                        segments = key.split("/");
                        category = segments[0];
                        component = segments[1];
                        componentVariation = segments[2];
                        if (category === "globals" && component !== "body" && component !== "ul") {
                            return [2, null];
                        }
                        classNames = [];
                        if (component === "body") {
                            component = "text";
                        }
                        else {
                            classNames.push(Utils.camelCaseToKebabCase(component));
                        }
                        if (componentVariation) {
                            className = void 0;
                            if (breakpoint) {
                                className = component + "-" + breakpoint + "-" + componentVariation;
                            }
                            else {
                                className = component + "-" + componentVariation;
                            }
                            className = Utils.camelCaseToKebabCase(className);
                            classNames.push(className);
                        }
                        return [4, this.getStyles()];
                    case 1:
                        styles = _a.sent();
                        style = Objects.getObjectAt(key, styles);
                        if (style && style["class"]) {
                            classNames.push(style["class"][breakpoint || "xs"]);
                        }
                        return [2, classNames.join(" ")];
                }
            });
        });
    };
    DefaultStyleCompiler.prototype.styleToCss = function (style) {
        if (!style) {
            return "";
        }
        var styleSheet = new styles_1.StyleSheet();
        styleSheet.styles.push(style);
        var compiler = new jssCompiler_1.JssCompiler();
        var css = compiler.compile(styleSheet);
        return css;
    };
    return DefaultStyleCompiler;
}());
exports.DefaultStyleCompiler = DefaultStyleCompiler;
