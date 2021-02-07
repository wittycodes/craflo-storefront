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
exports.Divider = void 0;
const ko = require("knockout");
const divider_html_1 = require("./divider.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
let Divider = class Divider {
    constructor() {
        this.styles = ko.observable();
    }
};
Divider = __decorate([
    decorators_1.Component({
        selector: "divider",
        template: divider_html_1.default
    }),
    __metadata("design:paramtypes", [])
], Divider);
exports.Divider = Divider;
//# sourceMappingURL=dividerViewModel.js.map