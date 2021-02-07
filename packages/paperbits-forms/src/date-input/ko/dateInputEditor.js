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
exports.DateInputEditor = void 0;
var ko = require("knockout");
var dateInputEditor_html_1 = require("./dateInputEditor.html");
var styles_1 = require("@paperbits/styles");
var dateInputModel_1 = require("../dateInputModel");
var decorators_1 = require("@paperbits/common/ko/decorators");
var DateInputEditor = (function () {
    function DateInputEditor(styleService) {
        this.styleService = styleService;
        this.label = ko.observable();
        this.name = ko.observable();
        this.value = ko.observable();
        this.required = ko.observable();
        this.readonly = ko.observable();
        this.maxLength = ko.observable();
        this.placeholder = ko.observable();
        this.appearanceStyles = ko.observableArray();
        this.appearanceStyle = ko.observable();
    }
    DateInputEditor.prototype.initialize = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var variations;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.label(this.model.label);
                        this.name(this.model.name);
                        this.value(this.model.value);
                        this.required(this.model.required);
                        this.readonly(this.model.readonly);
                        if (!this.model.styles) return [3, 2];
                        return [4, this.styleService.getComponentVariations("formControl")];
                    case 1:
                        variations = _b.sent();
                        this.appearanceStyles(variations.filter(function (x) { return x.category === "appearance"; }));
                        this.appearanceStyle((_a = this.model.styles) === null || _a === void 0 ? void 0 : _a.appearance);
                        _b.label = 2;
                    case 2:
                        this.appearanceStyle.subscribe(this.applyChanges);
                        this.label.subscribe(this.applyChanges);
                        this.name.subscribe(this.applyChanges);
                        this.value.subscribe(this.applyChanges);
                        this.required.subscribe(this.applyChanges);
                        this.readonly.subscribe(this.applyChanges);
                        this.maxLength.subscribe(this.applyChanges);
                        this.placeholder.subscribe(this.applyChanges);
                        return [2];
                }
            });
        });
    };
    DateInputEditor.prototype.applyChanges = function () {
        this.model.label = this.label();
        this.model.name = this.name();
        this.model.value = this.value();
        this.model.readonly = this.readonly();
        this.model.required = this.required();
        this.model.styles = {
            appearance: this.appearanceStyle()
        };
        this.onChange(this.model);
    };
    __decorate([
        decorators_1.Param(),
        __metadata("design:type", dateInputModel_1.DateInputModel)
    ], DateInputEditor.prototype, "model", void 0);
    __decorate([
        decorators_1.Event(),
        __metadata("design:type", Function)
    ], DateInputEditor.prototype, "onChange", void 0);
    __decorate([
        decorators_1.OnMounted(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], DateInputEditor.prototype, "initialize", null);
    DateInputEditor = __decorate([
        decorators_1.Component({
            selector: "date-input-editor",
            template: dateInputEditor_html_1.default
        }),
        __metadata("design:paramtypes", [styles_1.StyleService])
    ], DateInputEditor);
    return DateInputEditor;
}());
exports.DateInputEditor = DateInputEditor;
