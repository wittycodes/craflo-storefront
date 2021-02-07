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
exports.StyleGuide = void 0;
var ko = require("knockout");
var Utils = require("@paperbits/common");
var _ = require("lodash");
var styleGuide_html_1 = require("./styleGuide.html");
var decorators_1 = require("@paperbits/common/ko/decorators");
var styles_1 = require("@paperbits/common/styles");
var ui_1 = require("@paperbits/common/ui");
var styleService_1 = require("../styleService");
var styleUitls_1 = require("../styleUitls");
var StyleGuide = (function () {
    function StyleGuide(styleService, viewManager, eventManager, styleGroups, styleCompiler) {
        this.styleService = styleService;
        this.viewManager = viewManager;
        this.eventManager = eventManager;
        this.styleGroups = styleGroups;
        this.styleCompiler = styleCompiler;
        this.actives = {};
        this.styles = ko.observable();
        this.colors = ko.observableArray([]);
        this.shadows = ko.observableArray([]);
        this.gradients = ko.observableArray([]);
        this.icons = ko.observableArray([]);
        this.fonts = ko.observableArray([]);
        this.buttons = ko.observableArray([]);
        this.cards = ko.observableArray([]);
        this.pictures = ko.observableArray([]);
        this.videoPlayers = ko.observableArray([]);
        this.textBlocks = ko.observableArray([]);
        this.textStyles = ko.observableArray([]);
        this.navBars = ko.observableArray([]);
        this.uiComponents = ko.observableArray([]);
    }
    StyleGuide.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.viewManager.mode = ui_1.ViewManagerMode.selecting;
                this.applyChanges();
                this.ownerDocument = this.viewManager.getHostDocument();
                this.attach();
                return [2];
            });
        });
    };
    StyleGuide.prototype.addFonts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var view;
            var _this = this;
            return __generator(this, function (_a) {
                view = {
                    heading: "Fonts",
                    component: {
                        name: "google-fonts",
                        params: {
                            onSelect: function (font, custom) { return __awaiter(_this, void 0, void 0, function () {
                                var view;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            this.viewManager.closeView();
                                            return [4, this.applyChanges()];
                                        case 1:
                                            _a.sent();
                                            if (!custom) {
                                                return [2];
                                            }
                                            view = {
                                                heading: font.displayName,
                                                component: {
                                                    name: "font-editor",
                                                    params: {
                                                        font: font,
                                                        onChange: function () { return __awaiter(_this, void 0, void 0, function () {
                                                            return __generator(this, function (_a) {
                                                                switch (_a.label) {
                                                                    case 0: return [4, this.styleService.updateStyle(font)];
                                                                    case 1:
                                                                        _a.sent();
                                                                        this.applyChanges();
                                                                        return [2];
                                                                }
                                                            });
                                                        }); }
                                                    }
                                                },
                                                resize: "vertically horizontally"
                                            };
                                            this.viewManager.openViewAsPopup(view);
                                            return [2];
                                    }
                                });
                            }); }
                        }
                    },
                    resize: "vertically horizontally"
                };
                this.viewManager.openViewAsPopup(view);
                return [2];
            });
        });
    };
    StyleGuide.prototype.removeStyle = function (contract) {
        return __awaiter(this, void 0, void 0, function () {
            var parts, componentName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.styleService.removeStyle(contract.key)];
                    case 1:
                        _a.sent();
                        if (!contract.key.startsWith("components/")) return [3, 3];
                        parts = contract.key.split("/");
                        componentName = parts[1];
                        return [4, this.onUpdateStyle(componentName)];
                    case 2:
                        _a.sent();
                        return [3, 4];
                    case 3:
                        this.applyChanges();
                        _a.label = 4;
                    case 4: return [2];
                }
            });
        });
    };
    StyleGuide.prototype.addColor = function () {
        return __awaiter(this, void 0, void 0, function () {
            var variationName, addedItem, colors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        variationName = "" + Utils.identifier();
                        return [4, this.styleService.addColorVariation(variationName)];
                    case 1:
                        addedItem = _a.sent();
                        colors = this.colors();
                        colors.push(addedItem);
                        this.colors(this.sortByDisplayName(colors));
                        this.selectColor(addedItem);
                        return [2];
                }
            });
        });
    };
    StyleGuide.prototype.addGradient = function () {
        return __awaiter(this, void 0, void 0, function () {
            var variationName, addedItem, gradients;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        variationName = "" + Utils.identifier();
                        return [4, this.styleService.addGradientVariation(variationName)];
                    case 1:
                        addedItem = _a.sent();
                        gradients = this.gradients();
                        gradients.push(addedItem);
                        this.gradients(this.sortByDisplayName(gradients));
                        this.selectGradient(addedItem);
                        return [2];
                }
            });
        });
    };
    StyleGuide.prototype.addShadow = function () {
        return __awaiter(this, void 0, void 0, function () {
            var variationName, addedItem, shadows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        variationName = "" + Utils.identifier();
                        return [4, this.styleService.addShadowVariation(variationName)];
                    case 1:
                        addedItem = _a.sent();
                        shadows = this.shadows();
                        shadows.push(addedItem);
                        this.shadows(this.sortByDisplayName(shadows));
                        this.selectShadow(addedItem);
                        return [2];
                }
            });
        });
    };
    StyleGuide.prototype.addIcon = function () {
        return __awaiter(this, void 0, void 0, function () {
            var externalFonts, view;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.styleService.getExternalIconFonts()];
                    case 1:
                        externalFonts = _a.sent();
                        view = {
                            heading: "Add icon",
                            component: {
                                name: "glyph-import",
                                params: {
                                    fonts: externalFonts,
                                    showFontNames: true,
                                    onSelect: function (glyph) { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4, this.styleService.addIcon(glyph)];
                                                case 1:
                                                    _a.sent();
                                                    this.viewManager.closeView();
                                                    this.applyChanges();
                                                    return [2];
                                            }
                                        });
                                    }); }
                                }
                            },
                            resize: {
                                directions: "vertically horizontally",
                                initialWidth: 400
                            }
                        };
                        this.viewManager.openViewAsPopup(view);
                        return [2];
                }
            });
        });
    };
    StyleGuide.prototype.removeColor = function (color) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.styleService.removeStyle(color.key)];
                    case 1:
                        _a.sent();
                        this.applyChanges();
                        return [2];
                }
            });
        });
    };
    StyleGuide.prototype.removeGradient = function (gradient) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.styleService.removeStyle(gradient.key)];
                    case 1:
                        _a.sent();
                        this.applyChanges();
                        return [2];
                }
            });
        });
    };
    StyleGuide.prototype.selectColor = function (color) {
        var _this = this;
        var view = {
            heading: "Color",
            component: {
                name: "color-editor",
                params: {
                    selectedColor: color,
                    onSelect: function (color) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, this.styleService.updateStyle(color)];
                                case 1:
                                    _a.sent();
                                    this.applyChanges();
                                    return [2];
                            }
                        });
                    }); }
                }
            },
            resize: "vertically horizontally"
        };
        this.viewManager.openViewAsPopup(view);
        return true;
    };
    StyleGuide.prototype.selectGradient = function (gradient) {
        var _this = this;
        var view = {
            heading: "Gradient",
            component: {
                name: "gradient-editor",
                params: {
                    selectedGradient: gradient,
                    onSelect: function (gradient) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, this.styleService.updateStyle(gradient)];
                                case 1:
                                    _a.sent();
                                    this.applyChanges();
                                    return [2];
                            }
                        });
                    }); }
                }
            },
            resize: "vertically horizontally"
        };
        this.viewManager.openViewAsPopup(view);
        return true;
    };
    StyleGuide.prototype.selectShadow = function (shadow) {
        var _this = this;
        var view = {
            heading: "Shadow",
            component: {
                name: "shadow-editor",
                params: {
                    selectedShadow: shadow,
                    onSelect: function (shadow) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, this.styleService.updateStyle(shadow)];
                                case 1:
                                    _a.sent();
                                    this.applyChanges();
                                    return [2];
                            }
                        });
                    }); }
                }
            },
            resize: "vertically horizontally"
        };
        this.viewManager.openViewAsPopup(view);
        return true;
    };
    StyleGuide.prototype.selectStyle = function (style) {
        var _this = this;
        var view = {
            heading: style.displayName,
            component: {
                name: "style-editor",
                params: {
                    elementStyle: style,
                    onUpdate: function () { return __awaiter(_this, void 0, void 0, function () {
                        var parts, componentName;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.styleService.updateStyle(style);
                                    if (!style.key.startsWith("components/")) return [3, 2];
                                    parts = style.key.split("/");
                                    componentName = parts[1];
                                    return [4, this.onUpdateStyle(componentName)];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2:
                                    this.applyChanges();
                                    return [2];
                            }
                        });
                    }); }
                }
            },
            resize: "vertically horizontally"
        };
        this.viewManager.openViewAsPopup(view);
        return true;
    };
    StyleGuide.prototype.addTextStyleVariation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var variationName, addedItem, textStyles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        variationName = "" + Utils.identifier().toLowerCase();
                        return [4, this.styleService.addTextStyleVariation(variationName)];
                    case 1:
                        addedItem = _a.sent();
                        textStyles = this.textStyles();
                        textStyles.push(addedItem);
                        this.textStyles(this.sortByDisplayName(textStyles));
                        this.selectStyle(addedItem);
                        return [2];
                }
            });
        });
    };
    StyleGuide.prototype.onSnippetSelected = function (snippet) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.styleService.mergeStyles(snippet.stylesConfig)];
                    case 1:
                        _a.sent();
                        return [4, this.openInEditor(snippet.stylesType.split("/").pop(), snippet)];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    StyleGuide.prototype.openInEditor = function (componentName, snippet) {
        return __awaiter(this, void 0, void 0, function () {
            var variationName, addedStyleKey, addedStyle;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        variationName = "" + Utils.identifier().toLowerCase();
                        return [4, this.styleService.addComponentVariation(componentName, variationName, snippet)];
                    case 1:
                        addedStyleKey = _a.sent();
                        return [4, this.styleService.getStyleByKey(addedStyleKey)];
                    case 2:
                        addedStyle = _a.sent();
                        this.selectStyle(addedStyle);
                        return [4, this.onUpdateStyle(componentName)];
                    case 3:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    StyleGuide.prototype.onUpdateStyle = function (componentName) {
        return __awaiter(this, void 0, void 0, function () {
            var components, old, updated, updatedItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        components = this.uiComponents();
                        old = components.find(function (c) { return c.name === componentName; });
                        if (!old) return [3, 2];
                        return [4, this.getComponentsStyles()];
                    case 1:
                        updated = _a.sent();
                        updatedItem = updated.find(function (c) { return c.name === componentName; });
                        this.uiComponents.replace(old, updatedItem);
                        _a.label = 2;
                    case 2: return [2];
                }
            });
        });
    };
    StyleGuide.prototype.applyChanges = function () {
        return __awaiter(this, void 0, void 0, function () {
            var styles, fonts, colors, gradients, shadows, icons, extendedIcons, textVariations, components, styleManager, styleSheet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.styleService.getStyles()];
                    case 1:
                        styles = _a.sent();
                        return [4, this.styleService.getFonts()];
                    case 2:
                        fonts = _a.sent();
                        this.fonts(fonts.filter(function (x) { return x.key !== "fonts/icons"; }));
                        return [4, this.styleService.getColors()];
                    case 3:
                        colors = _a.sent();
                        this.colors(this.sortByDisplayName(colors));
                        return [4, this.styleService.getGadients()];
                    case 4:
                        gradients = _a.sent();
                        this.gradients(this.sortByDisplayName(gradients));
                        return [4, this.styleService.getShadows()];
                    case 5:
                        shadows = _a.sent();
                        this.shadows(shadows);
                        return [4, this.styleService.getIcons()];
                    case 6:
                        icons = _a.sent();
                        extendedIcons = icons.map(function (icon) { return ({
                            key: icon.key,
                            class: Utils.camelCaseToKebabCase(icon.key.replace("icons/", "icon-")),
                            displayName: icon.displayName,
                            unicode: styleUitls_1.formatUnicode(icon.unicode)
                        }); });
                        this.icons(extendedIcons);
                        return [4, this.styleService.getTextVariations()];
                    case 7:
                        textVariations = _a.sent();
                        this.textStyles(textVariations);
                        return [4, this.getComponentsStyles()];
                    case 8:
                        components = _a.sent();
                        this.uiComponents(components);
                        this.styles(styles);
                        styleManager = new styles_1.StyleManager(this.eventManager);
                        return [4, this.styleCompiler.getStyleSheet()];
                    case 9:
                        styleSheet = _a.sent();
                        styleManager.setStyleSheet(styleSheet);
                        return [2];
                }
            });
        });
    };
    StyleGuide.prototype.getComponentsStyles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var styles, result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.styleService.getStyles()];
                    case 1:
                        styles = _a.sent();
                        result = Object.keys(styles.components)
                            .map(function (componentName) {
                            var groupMetadata = _this.styleGroups.find(function (item) { return item.name === "components_" + componentName; });
                            if (!groupMetadata || !groupMetadata.styleTemplate) {
                                return undefined;
                            }
                            var componentStyles = styles.components[componentName];
                            var states = _this.styleService.getAllowedStates(componentStyles);
                            var variations = Object.keys(componentStyles).map(function (variationName) {
                                var variationContract = componentStyles[variationName];
                                if (!variationContract) {
                                    return null;
                                }
                                if (states && variationName !== "default") {
                                    variationContract.allowedStates = states;
                                }
                                return variationContract;
                            });
                            return {
                                name: componentName,
                                displayName: groupMetadata.groupName,
                                variations: variations.filter(function (x) { return !!x; }),
                                itemTemplate: groupMetadata.styleTemplate
                            };
                        })
                            .filter(function (item) { return item !== undefined; });
                        return [2, result];
                }
            });
        });
    };
    StyleGuide.prototype.sortByDisplayName = function (items) {
        return _.sortBy(items, ["displayName"]);
    };
    StyleGuide.prototype.keyToClass = function (key) {
        return Utils.camelCaseToKebabCase(key).replace("/", "-");
    };
    StyleGuide.prototype.attach = function () {
        this.ownerDocument.addEventListener("mousemove", this.onPointerMove.bind(this), true);
        this.ownerDocument.addEventListener("scroll", this.onWindowScroll.bind(this));
        this.ownerDocument.addEventListener("mousedown", this.onPointerDown, true);
    };
    StyleGuide.prototype.dispose = function () {
        this.ownerDocument.removeEventListener("mousemove", this.onPointerMove.bind(this), true);
        this.ownerDocument.removeEventListener("scroll", this.onWindowScroll.bind(this));
        this.ownerDocument.removeEventListener("mousedown", this.onPointerDown, true);
    };
    StyleGuide.prototype.onWindowScroll = function () {
        if (this.viewManager.mode === ui_1.ViewManagerMode.dragging || this.viewManager.mode === ui_1.ViewManagerMode.pause) {
            return;
        }
        if (!this.scrolling) {
            this.viewManager.clearContextualEditors();
        }
        this.scrolling = true;
        if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
        }
        this.scrollTimeout = setTimeout(this.resetScrolling.bind(this), 400);
    };
    StyleGuide.prototype.resetScrolling = function () {
        this.scrolling = false;
        this.renderHighlightedElements();
    };
    StyleGuide.prototype.renderHighlightedElements = function () {
        if (this.scrolling) {
            return;
        }
        var elements = Utils.elementsFromPoint(this.ownerDocument, this.pointerX, this.pointerY);
        this.rerenderEditors(elements);
    };
    StyleGuide.prototype.isStyleSelectable = function (contextualEditor) {
        if (!contextualEditor) {
            return false;
        }
        return contextualEditor.selectCommands.concat(contextualEditor.deleteCommand).length > 0;
    };
    StyleGuide.prototype.onPointerDown = function (event) {
        if (this.viewManager.mode === ui_1.ViewManagerMode.pause) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        if (event.button !== 0) {
            return;
        }
        if (this.viewManager.mode !== ui_1.ViewManagerMode.selecting &&
            this.viewManager.mode !== ui_1.ViewManagerMode.selected &&
            this.viewManager.mode !== ui_1.ViewManagerMode.configure) {
            return;
        }
        var element = this.activeHighlightedElement;
        if (!element) {
            return;
        }
        var styleable = element["styleable"];
        if (!styleable) {
            return;
        }
        var style = styleable.style;
        if (!style) {
            return;
        }
        var selectedElement = this.viewManager.getSelectedElement();
        if (selectedElement && selectedElement.element === element) {
            var contextualEditor_1 = this.getContextualEditor(element, styleable);
            var editCommand = contextualEditor_1.selectCommands.find(function (command) { return command.name === "edit"; });
            if (editCommand) {
                editCommand.callback();
            }
            return;
        }
        var contextualEditor = this.getContextualEditor(element, styleable);
        if (!this.isStyleSelectable(contextualEditor)) {
            return;
        }
        var config = {
            element: element,
            text: style["displayName"],
            color: contextualEditor.color
        };
        this.viewManager.setSelectedElement(config, contextualEditor);
    };
    StyleGuide.prototype.onPointerMove = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.pointerX = event.clientX;
        this.pointerY = event.clientY;
        this.renderHighlightedElements();
    };
    StyleGuide.prototype.getContextualEditor = function (element, styleable) {
        var _this = this;
        var style = styleable.style;
        var styleContextualEditor = {
            color: "#607d8b",
            deleteCommand: null,
            selectCommands: [],
            element: element
        };
        if ((!style.key.startsWith("globals/") || style.key.startsWith("globals/body/")) &&
            !style.key.endsWith("/default") && style.key.indexOf("/navbar/default/") === -1) {
            styleContextualEditor.deleteCommand = {
                tooltip: "Delete variation",
                color: "#607d8b",
                component: {
                    name: "confirmation",
                    params: {
                        getMessage: function () { return __awaiter(_this, void 0, void 0, function () {
                            var references, styleNames, message;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, this.styleService.checkStyleIsInUse(style.key)];
                                    case 1:
                                        references = _a.sent();
                                        styleNames = references.map(function (x) { return x.displayName; }).join("\", \"");
                                        message = "Are you sure you want to delete this style?";
                                        if (styleNames) {
                                            message += " It is referenced by \"" + styleNames + "\".";
                                        }
                                        return [2, message];
                                }
                            });
                        }); },
                        onConfirm: function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                this.removeStyle(style);
                                this.viewManager.clearContextualEditors();
                                this.viewManager.notifySuccess("Styles", "Style \"" + style.displayName + "\" was deleted.");
                                return [2];
                            });
                        }); },
                        onDecline: function () {
                            _this.viewManager.clearContextualEditors();
                        }
                    }
                }
            };
        }
        if (style.key.startsWith("icons/")) {
            styleContextualEditor.deleteCommand = {
                tooltip: "Delete icon",
                color: "#607d8b",
                component: {
                    name: "confirmation",
                    params: {
                        getMessage: function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2, "Are you sure you want to delete this icon?"];
                            });
                        }); },
                        onConfirm: function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, this.styleService.removeIcon(style.key)];
                                    case 1:
                                        _a.sent();
                                        return [4, this.applyChanges()];
                                    case 2:
                                        _a.sent();
                                        this.viewManager.clearContextualEditors();
                                        this.viewManager.notifySuccess("Styles", "Style \"" + style.displayName + "\" was deleted.");
                                        return [2];
                                }
                            });
                        }); },
                        onDecline: function () {
                            _this.viewManager.clearContextualEditors();
                        }
                    }
                }
            };
        }
        if (!style.key.startsWith("colors/") &&
            !style.key.startsWith("icons/") &&
            !style.key.startsWith("fonts/") &&
            !style.key.startsWith("shadows/") &&
            !style.key.startsWith("gradients/") &&
            !style.key.includes("/components/")) {
            styleContextualEditor.selectCommands.push({
                name: "background",
                tooltip: "Change background",
                iconClass: "paperbits-drop",
                position: "top right",
                color: "#607d8b",
                callback: function () {
                    styleable.toggleBackground();
                }
            });
        }
        if (style.key.startsWith("colors/") || style.key.startsWith("shadows/") || style.key.startsWith("gradients/")) {
            styleContextualEditor.selectCommands.push({
                name: "edit",
                tooltip: "Edit variation",
                iconClass: "paperbits-edit-72",
                position: "top right",
                color: "#607d8b",
                callback: function () {
                    if (style.key.startsWith("gradients/")) {
                        _this.selectGradient(style);
                        return;
                    }
                    style.key.startsWith("colors/") ? _this.selectColor(style) : _this.selectShadow(style);
                }
            });
        }
        else if (!style.key.startsWith("fonts/") && !style.key.startsWith("icons/")) {
            styleContextualEditor.selectCommands.push({
                name: "edit",
                tooltip: "Edit variation",
                iconClass: "paperbits-edit-72",
                position: "top right",
                color: "#607d8b",
                callback: function () {
                    var view = {
                        heading: style.displayName,
                        component: {
                            name: "style-editor",
                            params: {
                                elementStyle: style,
                                onUpdate: function () { return __awaiter(_this, void 0, void 0, function () {
                                    var parts, componentName;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                this.styleService.updateStyle(style);
                                                if (!style.key.startsWith("components/")) return [3, 2];
                                                parts = style.key.split("/");
                                                componentName = parts[1];
                                                return [4, this.onUpdateStyle(componentName)];
                                            case 1:
                                                _a.sent();
                                                _a.label = 2;
                                            case 2:
                                                this.applyChanges();
                                                return [2];
                                        }
                                    });
                                }); }
                            }
                        },
                        resize: "vertically horizontally"
                    };
                    _this.viewManager.openViewAsPopup(view);
                }
            });
        }
        if (style.key.startsWith("fonts/")) {
            styleContextualEditor.selectCommands.push({
                name: "edit",
                tooltip: "Edit font",
                iconClass: "paperbits-edit-72",
                position: "top right",
                color: "#607d8b",
                callback: function () {
                    var view = {
                        heading: style.displayName,
                        component: {
                            name: "font-editor",
                            params: {
                                font: style,
                                onChange: function () { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4, this.styleService.updateStyle(style)];
                                            case 1:
                                                _a.sent();
                                                this.applyChanges();
                                                return [2];
                                        }
                                    });
                                }); }
                            }
                        },
                        resize: "vertically horizontally"
                    };
                    _this.viewManager.openViewAsPopup(view);
                }
            });
        }
        return styleContextualEditor;
    };
    StyleGuide.prototype.rerenderEditors = function (elements) {
        return __awaiter(this, void 0, void 0, function () {
            var highlightedElement, highlightedText, highlightColor, tobeDeleted, i, element, styleable, style, index, active, contextualEditor;
            var _this = this;
            return __generator(this, function (_a) {
                tobeDeleted = Object.keys(this.actives);
                for (i = elements.length - 1; i >= 0; i--) {
                    element = elements[i];
                    styleable = element["styleable"];
                    if (!styleable) {
                        continue;
                    }
                    style = styleable.style;
                    index = tobeDeleted.indexOf(style.key);
                    tobeDeleted.splice(index, 1);
                    highlightedElement = element;
                    highlightedText = style.displayName;
                    active = this.actives[style.key];
                    contextualEditor = this.getContextualEditor(element, styleable);
                    highlightColor = contextualEditor.color;
                    if (!active || element !== active.element) {
                        this.viewManager.setContextualEditor(style.key, contextualEditor);
                        this.actives[style.key] = {
                            element: element
                        };
                    }
                }
                tobeDeleted.forEach(function (x) {
                    _this.viewManager.removeContextualEditor(x);
                    delete _this.actives[x];
                });
                if (this.activeHighlightedElement !== highlightedElement) {
                    this.activeHighlightedElement = highlightedElement;
                    this.viewManager.setHighlight({ element: highlightedElement, text: highlightedText, color: highlightColor });
                }
                return [2];
            });
        });
    };
    __decorate([
        decorators_1.OnMounted(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], StyleGuide.prototype, "initialize", null);
    __decorate([
        decorators_1.OnDestroyed(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], StyleGuide.prototype, "dispose", null);
    StyleGuide = __decorate([
        decorators_1.Component({
            selector: "style-guide",
            template: styleGuide_html_1.default
        }),
        __metadata("design:paramtypes", [styleService_1.StyleService, Object, Object, Array, Object])
    ], StyleGuide);
    return StyleGuide;
}());
exports.StyleGuide = StyleGuide;
