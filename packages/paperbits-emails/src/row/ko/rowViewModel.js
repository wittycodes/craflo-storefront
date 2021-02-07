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
exports.RowViewModel = void 0;
var ko = require("knockout");
var row_html_1 = require("./row.html");
var decorators_1 = require("@paperbits/common/ko/decorators");
var RowViewModel = (function () {
    function RowViewModel() {
        var _this = this;
        this.widgets = ko.observableArray();
        this.alignSm = ko.observable();
        this.alignMd = ko.observable();
        this.alignLg = ko.observable();
        this.justifySm = ko.observable();
        this.justifyMd = ko.observable();
        this.justifyLg = ko.observable();
        this.css = ko.computed(function () {
            var css = "";
            if (_this.alignSm()) {
                css += " " + _this.alignSm() + "-sm";
            }
            if (_this.alignMd()) {
                css += " " + _this.alignMd() + "-md";
            }
            if (_this.alignLg()) {
                css += " " + _this.alignLg() + "-lg";
            }
            if (_this.justifySm()) {
                css += " " + _this.justifySm() + "-sm";
            }
            if (_this.justifyMd()) {
                css += " " + _this.justifyMd() + "-md";
            }
            if (_this.justifyLg()) {
                css += " " + _this.justifyLg() + "-lg";
            }
            return css;
        });
    }
    RowViewModel = __decorate([
        decorators_1.Component({
            selector: "email-layout-row",
            template: row_html_1.default
        }),
        __metadata("design:paramtypes", [])
    ], RowViewModel);
    return RowViewModel;
}());
exports.RowViewModel = RowViewModel;
