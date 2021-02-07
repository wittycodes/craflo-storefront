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
exports.TextStyleSelector = void 0;
const ko = require("knockout");
const textStyleSelector_html_1 = require("./textStyleSelector.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
let TextStyleSelector = class TextStyleSelector {
    constructor() {
        this.styles = ko.observableArray();
    }
    setTextStyle(style) {
        if (this.onSelect) {
            this.onSelect(style);
        }
    }
};
__decorate([
    decorators_1.Param(),
    __metadata("design:type", Function)
], TextStyleSelector.prototype, "styles", void 0);
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], TextStyleSelector.prototype, "onSelect", void 0);
TextStyleSelector = __decorate([
    decorators_1.Component({
        selector: "text-style-selector",
        template: textStyleSelector_html_1.default
    }),
    __metadata("design:paramtypes", [])
], TextStyleSelector);
exports.TextStyleSelector = TextStyleSelector;
//# sourceMappingURL=textStyleSelector.js.map