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
exports.FormEditor = void 0;
var ko = require("knockout");
var formEditor_html_1 = require("./formEditor.html");
var decorators_1 = require("@paperbits/common/ko/decorators");
var formModel_1 = require("../formModel");
var FormEditor = (function () {
    function FormEditor() {
        var _this = this;
        this.formAction = ko.observable();
        this.formMethod = ko.observable();
        this.formTarget = ko.observable();
        this.acceptCharset = ko.observable();
        this.encType = ko.observable();
        this.identifier = ko.observable();
        this.isInline = ko.observable();
        this.formAction.subscribe((function (newValue) { _this.model.formAction = newValue; _this.onChange(_this.model); }).bind(this));
        this.formMethod.subscribe((function (newValue) { _this.model.formMethod = newValue; _this.onChange(_this.model); }).bind(this));
        this.formTarget.subscribe((function (newValue) { _this.model.formTarget = newValue; _this.onChange(_this.model); }).bind(this));
        this.acceptCharset.subscribe((function (newValue) { _this.model.acceptCharset = newValue; _this.onChange(_this.model); }).bind(this));
        this.encType.subscribe((function (newValue) { _this.model.encType = newValue; _this.onChange(_this.model); }).bind(this));
        this.identifier.subscribe((function (newValue) { _this.model.identifier = newValue; _this.onChange(_this.model); }).bind(this));
        this.isInline.subscribe((function (newValue) { _this.model.isInline = newValue; _this.onChange(_this.model); }).bind(this));
        this.itemNameToAdd = ko.observable("");
        this.itemValueToAdd = ko.observable("");
        this.selectedItems = ko.observableArray([]);
    }
    FormEditor.prototype.initialize = function () {
        this.formAction(this.model.formAction);
        this.formMethod(this.model.formMethod || "get");
        this.formTarget(this.model.formTarget || "_self");
        this.acceptCharset(this.model.acceptCharset);
        this.encType(this.model.encType || "application/x-www-form-urlencoded");
        this.identifier(this.model.identifier);
        this.isInline(this.model.isInline);
    };
    __decorate([
        decorators_1.Param(),
        __metadata("design:type", formModel_1.FormModel)
    ], FormEditor.prototype, "model", void 0);
    __decorate([
        decorators_1.Event(),
        __metadata("design:type", Function)
    ], FormEditor.prototype, "onChange", void 0);
    __decorate([
        decorators_1.OnMounted(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], FormEditor.prototype, "initialize", null);
    FormEditor = __decorate([
        decorators_1.Component({
            selector: "form-editor",
            template: formEditor_html_1.default
        }),
        __metadata("design:paramtypes", [])
    ], FormEditor);
    return FormEditor;
}());
exports.FormEditor = FormEditor;
