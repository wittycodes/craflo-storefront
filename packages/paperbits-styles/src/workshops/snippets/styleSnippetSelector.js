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
exports.StyleSnippetSelector = void 0;
var ko = require("knockout");
var _ = require("lodash");
var styleSnippetSelector_html_1 = require("./styleSnippetSelector.html");
var decorators_1 = require("@paperbits/common/ko/decorators");
var styleSnippetService_1 = require("../../styleSnippetService");
var styleItem_1 = require("../../models/styleItem");
var defaultStyleCompiler_1 = require("../../defaultStyleCompiler");
var utils_1 = require("@paperbits/common/utils");
var objects_1 = require("@paperbits/common/objects");
var StyleSnippetSelector = (function () {
    function StyleSnippetSelector(styleSnippetService, mediaPermalinkResolver, styleGroups) {
        this.styleSnippetService = styleSnippetService;
        this.mediaPermalinkResolver = mediaPermalinkResolver;
        this.styleGroups = styleGroups;
        this.snippetStyleCompiler = new defaultStyleCompiler_1.DefaultStyleCompiler(undefined, this.mediaPermalinkResolver);
        this.loadSnippets = this.loadSnippets.bind(this);
        this.selectSnippet = this.selectSnippet.bind(this);
        this.snippets = ko.observableArray();
        this.existingSnippetKeys = [];
        this.selectedSnippet = ko.observable();
        this.working = ko.observable(true);
    }
    StyleSnippetSelector.prototype.loadSnippets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var snippetsByType, loadedSnippets, _i, _a, it_1, item, subTheme, styleItem, compiller, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!this.snippetType) {
                            return [2];
                        }
                        this.working(true);
                        if (!!this.isThemeSelected) return [3, 2];
                        return [4, this.initSnippetService()];
                    case 1:
                        _d.sent();
                        _d.label = 2;
                    case 2: return [4, this.styleSnippetService.getStyleByKey(this.snippetType)];
                    case 3:
                        snippetsByType = _d.sent();
                        this.itemTemplate = this.getSnippetTypeTemplate(this.snippetType);
                        loadedSnippets = [];
                        _i = 0, _a = Object.values(snippetsByType);
                        _d.label = 4;
                    case 4:
                        if (!(_i < _a.length)) return [3, 9];
                        it_1 = _a[_i];
                        item = it_1;
                        return [4, this.loadThemeForItem(item)];
                    case 5:
                        subTheme = _d.sent();
                        styleItem = new styleItem_1.StyleItem(item, subTheme, this.snippetType);
                        compiller = this.getStyleCompiler(subTheme);
                        _b = styleItem;
                        return [4, compiller.compileCss()];
                    case 6:
                        _b.stylesContent = _d.sent();
                        _c = styleItem;
                        return [4, compiller.getClassNameByStyleKeyAsync(item.key)];
                    case 7:
                        _c.classNames = _d.sent();
                        loadedSnippets.push(styleItem);
                        _d.label = 8;
                    case 8:
                        _i++;
                        return [3, 4];
                    case 9:
                        this.snippets(loadedSnippets);
                        this.working(false);
                        return [2];
                }
            });
        });
    };
    StyleSnippetSelector.prototype.getSnippetTypeTemplate = function (snippetType) {
        var group = this.styleGroups.find(function (item) { return item.name === snippetType.replaceAll("/", "_"); });
        return group ? group.selectorTemplate : "";
    };
    StyleSnippetSelector.prototype.initSnippetService = function () {
        return __awaiter(this, void 0, void 0, function () {
            var selected, items, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        selected = this.styleSnippetService.getSelectedThemeName();
                        if (!!selected) return [3, 3];
                        return [4, this.styleSnippetService.getThemesNames()];
                    case 1:
                        items = _b.sent();
                        _a = this;
                        return [4, this.styleSnippetService.selectCurrentTheme(items[0])];
                    case 2:
                        _a.isThemeSelected = _b.sent();
                        _b.label = 3;
                    case 3: return [2];
                }
            });
        });
    };
    StyleSnippetSelector.prototype.loadThemeForItem = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var parts, isComponent, stylesKeys, defaultKey, defaultItem, defaultKeys, subTheme, _i, stylesKeys_1, stylesKey, styleValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parts = item.key.split("/");
                        isComponent = parts[0] === "components";
                        stylesKeys = this.getAllStyleKeys(item);
                        if (!(isComponent && parts[2] !== "default")) return [3, 2];
                        defaultKey = parts[0] + "/" + parts[1] + "/default";
                        return [4, this.styleSnippetService.getStyleByKey(defaultKey)];
                    case 1:
                        defaultItem = _a.sent();
                        defaultKeys = this.getAllStyleKeys(defaultItem);
                        stylesKeys.push.apply(stylesKeys, defaultKeys);
                        _a.label = 2;
                    case 2:
                        subTheme = {};
                        stylesKeys = stylesKeys.filter(function (item, index, source) { return source.indexOf(item) === index; });
                        _i = 0, stylesKeys_1 = stylesKeys;
                        _a.label = 3;
                    case 3:
                        if (!(_i < stylesKeys_1.length)) return [3, 6];
                        stylesKey = stylesKeys_1[_i];
                        return [4, this.styleSnippetService.getStyleByKey(stylesKey)];
                    case 4:
                        styleValue = _a.sent();
                        if (styleValue) {
                            this.mergeNestedObj(subTheme, stylesKey, styleValue);
                        }
                        else {
                            console.warn("styleKey not found: ", stylesKey);
                        }
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3, 3];
                    case 6: return [2, subTheme];
                }
            });
        });
    };
    StyleSnippetSelector.prototype.mergeNestedObj = function (source, path, value) {
        var keys = path.split("/");
        var lastKey = keys.pop();
        var lastObj = keys.reduce(function (source, key) { return source[key] = source[key] || {}; }, source);
        lastObj[lastKey] = value;
    };
    StyleSnippetSelector.prototype.getStyleCompiler = function (stylesConfig) {
        this.snippetStyleCompiler.setStyles(stylesConfig);
        return this.snippetStyleCompiler;
    };
    StyleSnippetSelector.prototype.getAllStyleKeys = function (source) {
        var _this = this;
        var result = [];
        if (Array.isArray(source)) {
            source.every(function (x) { return result.push.apply(result, _this.getAllStyleKeys(x)); });
        }
        else if (typeof source === "object") {
            var propertyNames = Object.keys(source);
            for (var _i = 0, propertyNames_1 = propertyNames; _i < propertyNames_1.length; _i++) {
                var propertyName = propertyNames_1[_i];
                var propertyValue = source[propertyName];
                if (propertyName.toLowerCase().endsWith("key")) {
                    result.push(propertyValue);
                }
                else {
                    if (typeof propertyValue === "object")
                        result.push.apply(result, this.getAllStyleKeys(propertyValue));
                }
            }
        }
        return result;
    };
    StyleSnippetSelector.prototype.selectSnippet = function (snippet) {
        return __awaiter(this, void 0, void 0, function () {
            var current;
            return __generator(this, function (_a) {
                current = this.selectedSnippet();
                if (current) {
                    current.hasFocus(false);
                }
                snippet.hasFocus(true);
                this.selectedSnippet(snippet);
                return [2];
            });
        });
    };
    StyleSnippetSelector.prototype.addSnippet = function () {
        if (!this.onSelect) {
            return;
        }
        var selectedItem = _.cloneDeep(this.selectedSnippet());
        var source = selectedItem.stylesConfig;
        selectedItem.stylesConfig = source;
        var allKeys = this.getAllStyleKeys(source).filter(function (item, index, source) { return source.indexOf(item) === index; });
        var refKeys = {};
        for (var _i = 0, allKeys_1 = allKeys; _i < allKeys_1.length; _i++) {
            var path = allKeys_1[_i];
            var newKey = utils_1.identifier();
            var oldValue = objects_1.getObjectAt(path, source);
            var keys = path.split("/");
            var lastKey = keys.pop();
            var lastObj = keys.reduce(function (source, key) { return source[key] = source[key] || {}; }, source);
            oldValue.key = oldValue.key.replace(lastKey, newKey);
            oldValue.displayName = oldValue.displayName + " - " + newKey;
            lastObj[newKey] = oldValue;
            delete lastObj[lastKey];
            refKeys[path] = keys.join("/") + "/" + newKey;
        }
        this.syncStyleKeys(source, refKeys);
        selectedItem.key = refKeys[selectedItem.key];
        selectedItem.itemConfig = objects_1.getObjectAt(selectedItem.key, source);
        var selectedItemKeys = selectedItem.key.split("/");
        delete selectedItem.stylesConfig[selectedItemKeys[0]];
        this.onSelect(selectedItem);
    };
    StyleSnippetSelector.prototype.syncStyleKeys = function (source, changeTable) {
        var _this = this;
        if (Array.isArray(source)) {
            source.every(function (x) { return _this.syncStyleKeys(x, changeTable); });
        }
        else if (typeof source === "object") {
            var propertyNames = Object.keys(source);
            for (var _i = 0, propertyNames_2 = propertyNames; _i < propertyNames_2.length; _i++) {
                var propertyName = propertyNames_2[_i];
                var propertyValue = source[propertyName];
                if (propertyName.toLowerCase().endsWith("key")) {
                    var newValue = changeTable[propertyValue];
                    if (newValue) {
                        source[propertyName] = newValue;
                    }
                }
                else {
                    if (typeof propertyValue === "object") {
                        this.syncStyleKeys(propertyValue, changeTable);
                    }
                }
            }
        }
    };
    __decorate([
        decorators_1.Param(),
        __metadata("design:type", String)
    ], StyleSnippetSelector.prototype, "snippetType", void 0);
    __decorate([
        decorators_1.Event(),
        __metadata("design:type", Function)
    ], StyleSnippetSelector.prototype, "onSelect", void 0);
    __decorate([
        decorators_1.OnMounted(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], StyleSnippetSelector.prototype, "loadSnippets", null);
    StyleSnippetSelector = __decorate([
        decorators_1.Component({
            selector: "style-snippet-selector",
            template: styleSnippetSelector_html_1.default
        }),
        __metadata("design:paramtypes", [styleSnippetService_1.StyleSnippetService, Object, Array])
    ], StyleSnippetSelector);
    return StyleSnippetSelector;
}());
exports.StyleSnippetSelector = StyleSnippetSelector;
