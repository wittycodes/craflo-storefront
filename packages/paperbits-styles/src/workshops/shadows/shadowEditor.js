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
exports.ShadowEditor = void 0;
var ko = require("knockout");
var shadowEditor_html_1 = require("./shadowEditor.html");
var decorators_1 = require("@paperbits/common/ko/decorators");
var ShadowEditor = (function () {
    function ShadowEditor() {
        this.loadStyle = this.loadStyle.bind(this);
        this.onStyleChange = this.onStyleChange.bind(this);
        this.styleName = ko.observable();
        this.colorValue = ko.observable();
        this.blur = ko.observable();
        this.inset = ko.observable();
        this.offsetX = ko.observable();
        this.offsetY = ko.observable();
        this.spread = ko.observable();
        this.selectedShadow = ko.observable();
    }
    ShadowEditor.prototype.loadStyle = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.styleName(this.selectedShadow().displayName);
                this.colorValue(this.selectedShadow().color);
                this.blur(+this.selectedShadow().blur);
                this.inset(this.selectedShadow().inset);
                this.offsetX(+this.selectedShadow().offsetX);
                this.offsetY(+this.selectedShadow().offsetY);
                this.spread(+this.selectedShadow().spread);
                this.styleName.subscribe(this.onStyleChange);
                this.colorValue.subscribe(this.onStyleChange);
                this.blur.subscribe(this.onStyleChange);
                this.inset.subscribe(this.onStyleChange);
                this.offsetX.subscribe(this.onStyleChange);
                this.offsetY.subscribe(this.onStyleChange);
                this.spread.subscribe(this.onStyleChange);
                return [2];
            });
        });
    };
    ShadowEditor.prototype.onStyleChange = function () {
        var _this = this;
        var shadow = this.selectedShadow();
        shadow.color = this.colorValue();
        shadow.displayName = this.styleName();
        shadow.blur = +this.blur();
        shadow.inset = this.inset();
        shadow.offsetX = +this.offsetX();
        shadow.offsetY = +this.offsetY();
        shadow.spread = +this.spread();
        clearTimeout(this.selectTimeout);
        this.selectTimeout = setTimeout(function () { return _this.scheduleColorUpdate(shadow); }, 600);
    };
    ShadowEditor.prototype.scheduleColorUpdate = function (shadow) {
        if (this.selectedShadow) {
            this.selectedShadow(shadow);
        }
        if (this.onSelect) {
            this.onSelect(shadow);
        }
    };
    __decorate([
        decorators_1.Param(),
        __metadata("design:type", Function)
    ], ShadowEditor.prototype, "selectedShadow", void 0);
    __decorate([
        decorators_1.Event(),
        __metadata("design:type", Function)
    ], ShadowEditor.prototype, "onSelect", void 0);
    __decorate([
        decorators_1.OnMounted(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], ShadowEditor.prototype, "loadStyle", null);
    ShadowEditor = __decorate([
        decorators_1.Component({
            selector: "shadow-editor",
            template: shadowEditor_html_1.default
        }),
        __metadata("design:paramtypes", [])
    ], ShadowEditor);
    return ShadowEditor;
}());
exports.ShadowEditor = ShadowEditor;
