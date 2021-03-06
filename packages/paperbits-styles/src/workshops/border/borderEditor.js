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
exports.BorderEditor = void 0;
var ko = require("knockout");
var borderEditor_html_1 = require("./borderEditor.html");
var decorators_1 = require("@paperbits/common/ko/decorators");
var __1 = require("../..");
var BorderEditor = (function () {
    function BorderEditor(styleService) {
        this.styleService = styleService;
        this.borderColor = ko.observable();
        this.borderColorKey = ko.observable();
        this.borderLineStyle = ko.observable();
        this.borderStyle = ko.observable();
        this.borderLineWidth = ko.observable();
        this.colors = ko.observableArray();
        this.borderLineStyles = ko.observableArray([
            { name: "Solid", value: "solid" },
            { name: "Dashed", value: "dashed" }
        ]);
    }
    BorderEditor.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var style, themeContract, colors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        style = this.borderStyle();
                        this.borderLineWidth(1);
                        this.borderLineStyle("solid");
                        if (style) {
                            this.borderLineWidth(style.width);
                            this.borderLineStyle(style.style);
                            this.borderColorKey(style.colorKey);
                        }
                        return [4, this.styleService.getStyles()];
                    case 1:
                        themeContract = _a.sent();
                        colors = Object.keys(themeContract.colors).map(function (key) {
                            var colorContract = themeContract.colors[key];
                            return colorContract;
                        });
                        this.colors(colors);
                        this.borderLineWidth.subscribe(this.applyChanges);
                        this.borderLineStyle.subscribe(this.applyChanges);
                        return [2];
                }
            });
        });
    };
    BorderEditor.prototype.selectColor = function (color) {
        this.borderColorKey(color ? color.key : null);
        this.applyChanges();
    };
    BorderEditor.prototype.clearColor = function () {
        this.borderColorKey(null);
        this.applyChanges();
    };
    BorderEditor.prototype.applyChanges = function () {
        var colorKey = this.borderColorKey();
        var borderLineStyle = this.borderLineStyle();
        var borderLineWidth = this.borderLineWidth();
        var borderStyle;
        if (colorKey && borderLineStyle && borderLineWidth) {
            borderStyle = {
                width: borderLineWidth,
                style: borderLineStyle,
                colorKey: colorKey
            };
        }
        this.onChange(borderStyle);
    };
    __decorate([
        decorators_1.Param(),
        __metadata("design:type", Function)
    ], BorderEditor.prototype, "borderStyle", void 0);
    __decorate([
        decorators_1.Event(),
        __metadata("design:type", Function)
    ], BorderEditor.prototype, "onChange", void 0);
    __decorate([
        decorators_1.OnMounted(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], BorderEditor.prototype, "initialize", null);
    BorderEditor = __decorate([
        decorators_1.Component({
            selector: "border-editor",
            template: borderEditor_html_1.default
        }),
        __metadata("design:paramtypes", [__1.StyleService])
    ], BorderEditor);
    return BorderEditor;
}());
exports.BorderEditor = BorderEditor;
