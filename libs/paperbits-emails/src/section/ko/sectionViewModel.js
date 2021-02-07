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
exports.SectionViewModel = void 0;
var ko = require("knockout");
var section_html_1 = require("./section.html");
var decorators_1 = require("@paperbits/common/ko/decorators");
var SectionViewModel = (function () {
    function SectionViewModel() {
        this.widgets = ko.observableArray();
        this.container = ko.observable();
        this.snapTo = ko.observable();
        this.background = ko.observable();
        this.styles = ko.observable();
    }
    SectionViewModel = __decorate([
        decorators_1.Component({
            selector: "email-layout-section",
            template: section_html_1.default
        }),
        __metadata("design:paramtypes", [])
    ], SectionViewModel);
    return SectionViewModel;
}());
exports.SectionViewModel = SectionViewModel;
