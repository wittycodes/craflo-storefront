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
const ko = require("knockout");
const section_html_1 = require("./section.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
let SectionViewModel = class SectionViewModel {
    constructor() {
        this.widgets = ko.observableArray();
        this.styles = ko.observable();
    }
};
SectionViewModel = __decorate([
    decorators_1.Component({
        selector: "layout-section",
        template: section_html_1.default
    }),
    __metadata("design:paramtypes", [])
], SectionViewModel);
exports.SectionViewModel = SectionViewModel;
//# sourceMappingURL=sectionViewModel.js.map