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
exports.ColumnEditor = void 0;
var ko = require("knockout");
var columnEditor_html_1 = require("./columnEditor.html");
var decorators_1 = require("@paperbits/common/ko/decorators");
var columnModel_1 = require("../columnModel");
var ColumnEditor = (function () {
    function ColumnEditor(viewManager) {
        this.viewManager = viewManager;
        this.alignment = ko.observable();
        this.verticalAlignment = ko.observable();
        this.horizontalAlignment = ko.observable();
        this.scrollOnOverlow = ko.observable();
    }
    ColumnEditor.prototype.initialize = function () {
        var alignment = this.model.alignment;
        this.alignment(alignment);
        var directions = this.alignment().split(" ");
        this.verticalAlignment(directions[0]);
        this.horizontalAlignment(directions[1]);
        this.alignment.subscribe(this.applyChanges);
        this.scrollOnOverlow.subscribe(this.applyChanges);
    };
    ColumnEditor.prototype.applyChanges = function () {
        this.model.alignment = this.alignment();
        this.onChange(this.model);
    };
    ColumnEditor.prototype.alignContent = function (alignment) {
        this.alignment(alignment);
    };
    ColumnEditor.prototype.align = function () {
        this.alignment(this.verticalAlignment() + " " + this.horizontalAlignment());
    };
    ColumnEditor.prototype.determineAlignment = function (model) {
        return model.alignment || "top left";
    };
    ColumnEditor.prototype.alignLeft = function () {
        this.horizontalAlignment("left");
        this.align();
    };
    ColumnEditor.prototype.alignRight = function () {
        this.horizontalAlignment("right");
        this.align();
    };
    ColumnEditor.prototype.alignCenter = function () {
        this.horizontalAlignment("center");
        this.align();
    };
    ColumnEditor.prototype.alignTop = function () {
        this.verticalAlignment("top");
        this.align();
    };
    ColumnEditor.prototype.alignBottom = function () {
        this.verticalAlignment("bottom");
        this.align();
    };
    ColumnEditor.prototype.alignMiddle = function () {
        this.verticalAlignment("center");
        this.align();
    };
    __decorate([
        decorators_1.Param(),
        __metadata("design:type", columnModel_1.ColumnModel)
    ], ColumnEditor.prototype, "model", void 0);
    __decorate([
        decorators_1.Event(),
        __metadata("design:type", Function)
    ], ColumnEditor.prototype, "onChange", void 0);
    __decorate([
        decorators_1.OnMounted(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ColumnEditor.prototype, "initialize", null);
    ColumnEditor = __decorate([
        decorators_1.Component({
            selector: "email-layout-column-editor",
            template: columnEditor_html_1.default
        }),
        __metadata("design:paramtypes", [Object])
    ], ColumnEditor);
    return ColumnEditor;
}());
exports.ColumnEditor = ColumnEditor;
