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
const ko = require("knockout");
const row_html_1 = require("./row.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
let RowViewModel = class RowViewModel {
    constructor() {
        this.widgets = ko.observableArray();
        this.alignSm = ko.observable();
        this.alignMd = ko.observable();
        this.alignLg = ko.observable();
        this.justifySm = ko.observable();
        this.justifyMd = ko.observable();
        this.justifyLg = ko.observable();
        this.css = ko.computed(() => {
            let css = "";
            if (this.alignSm()) {
                css += " " + this.alignSm() + "-sm";
            }
            if (this.alignMd()) {
                css += " " + this.alignMd() + "-md";
            }
            if (this.alignLg()) {
                css += " " + this.alignLg() + "-lg";
            }
            if (this.justifySm()) {
                css += " " + this.justifySm() + "-sm";
            }
            if (this.justifyMd()) {
                css += " " + this.justifyMd() + "-md";
            }
            if (this.justifyLg()) {
                css += " " + this.justifyLg() + "-lg";
            }
            return css;
        });
    }
};
RowViewModel = __decorate([
    decorators_1.Component({
        selector: "layout-row",
        template: row_html_1.default
    }),
    __metadata("design:paramtypes", [])
], RowViewModel);
exports.RowViewModel = RowViewModel;
//# sourceMappingURL=rowViewModel.js.map