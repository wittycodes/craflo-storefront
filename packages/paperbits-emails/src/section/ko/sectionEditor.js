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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionEditor = void 0;
var ko = require("knockout");
var Objects = require("@paperbits/common/objects");
var sectionEditor_html_1 = require("./sectionEditor.html");
var decorators_1 = require("@paperbits/common/ko/decorators");
var sectionModel_1 = require("../sectionModel");
var consts_1 = require("@paperbits/common/ko/consts");
var SectionEditor = (function () {
    function SectionEditor() {
        this.background = ko.observable();
    }
    SectionEditor.prototype.initialize = function () {
        var _a, _b;
        this.model.styles = this.model.styles || {};
        this.background((_b = (_a = this.model.styles) === null || _a === void 0 ? void 0 : _a.instance) === null || _b === void 0 ? void 0 : _b.background);
        this.background.extend(consts_1.ChangeRateLimit).subscribe(this.applyChanges);
    };
    SectionEditor.prototype.applyChanges = function () {
        this.onChange(this.model);
    };
    SectionEditor.prototype.onBackgroundUpdate = function (background) {
        Objects.setValue("instance/background", this.model.styles, background);
        this.applyChanges();
    };
    __decorate([
        decorators_1.Param(),
        __metadata("design:type", sectionModel_1.SectionModel)
    ], SectionEditor.prototype, "model", void 0);
    __decorate([
        decorators_1.Event(),
        __metadata("design:type", Function)
    ], SectionEditor.prototype, "onChange", void 0);
    __decorate([
        decorators_1.OnMounted(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], SectionEditor.prototype, "initialize", null);
    SectionEditor = __decorate([
        decorators_1.Component({
            selector: "email-layout-section-editor",
            template: sectionEditor_html_1.default
        }),
        __metadata("design:paramtypes", [])
    ], SectionEditor);
    return SectionEditor;
}());
exports.SectionEditor = SectionEditor;
