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
exports.SizeEditor = void 0;
var ko = require("knockout");
var sizeEditor_html_1 = require("./sizeEditor.html");
var decorators_1 = require("@paperbits/common/ko/decorators");
var consts_1 = require("@paperbits/common/ko/consts");
var SizeEditor = (function () {
    function SizeEditor() {
        this.sizeConfig = ko.observable();
        this.features = "height,minMaxHeight,width,minMaxWidth";
        this.heightEnabled = ko.observable();
        this.itemHeight = ko.observable();
        this.widthEnabled = ko.observable();
        this.itemWidth = ko.observable();
        this.minMaxHeightEnabled = ko.observable();
        this.minHeight = ko.observable();
        this.maxHeight = ko.observable();
        this.minMaxWidthEnabled = ko.observable();
        this.minWidth = ko.observable();
        this.maxWidth = ko.observable();
    }
    SizeEditor.prototype.init = function () {
        var features = this.features.split(",");
        this.heightEnabled(features.includes("height"));
        this.minMaxHeightEnabled(features.includes("minMaxHeight"));
        this.widthEnabled(features.includes("width"));
        this.minMaxWidthEnabled(features.includes("minMaxWidth"));
        this.updateObservables();
        this.sizeConfig.subscribe(this.updateObservables);
        this.itemHeight.extend(consts_1.ChangeRateLimit).subscribe(this.applyChanges);
        this.minHeight.extend(consts_1.ChangeRateLimit).subscribe(this.applyChanges);
        this.maxHeight.extend(consts_1.ChangeRateLimit).subscribe(this.applyChanges);
        this.itemWidth.extend(consts_1.ChangeRateLimit).subscribe(this.applyChanges);
        this.minWidth.extend(consts_1.ChangeRateLimit).subscribe(this.applyChanges);
        this.maxWidth.extend(consts_1.ChangeRateLimit).subscribe(this.applyChanges);
    };
    SizeEditor.prototype.updateObservables = function () {
        var pluginConfig = this.sizeConfig();
        this.itemHeight(pluginConfig === null || pluginConfig === void 0 ? void 0 : pluginConfig.height);
        this.minHeight(pluginConfig === null || pluginConfig === void 0 ? void 0 : pluginConfig.minHeight);
        this.maxHeight(pluginConfig === null || pluginConfig === void 0 ? void 0 : pluginConfig.maxHeight);
        this.itemWidth(pluginConfig === null || pluginConfig === void 0 ? void 0 : pluginConfig.width);
        this.minWidth(pluginConfig === null || pluginConfig === void 0 ? void 0 : pluginConfig.minWidth);
        this.maxWidth(pluginConfig === null || pluginConfig === void 0 ? void 0 : pluginConfig.maxWidth);
    };
    SizeEditor.prototype.applyChanges = function () {
        if (!this.onUpdate) {
            return;
        }
        var update = {
            height: this.itemHeight(),
            minHeight: this.minHeight(),
            maxHeight: this.maxHeight(),
            width: this.itemWidth(),
            minWidth: this.minWidth(),
            maxWidth: this.maxWidth(),
        };
        this.onUpdate(update);
    };
    __decorate([
        decorators_1.Param(),
        __metadata("design:type", Function)
    ], SizeEditor.prototype, "sizeConfig", void 0);
    __decorate([
        decorators_1.Param(),
        __metadata("design:type", String)
    ], SizeEditor.prototype, "features", void 0);
    __decorate([
        decorators_1.Event(),
        __metadata("design:type", Function)
    ], SizeEditor.prototype, "onUpdate", void 0);
    __decorate([
        decorators_1.OnMounted(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], SizeEditor.prototype, "init", null);
    SizeEditor = __decorate([
        decorators_1.Component({
            selector: "size-editor",
            template: sizeEditor_html_1.default
        }),
        __metadata("design:paramtypes", [])
    ], SizeEditor);
    return SizeEditor;
}());
exports.SizeEditor = SizeEditor;
