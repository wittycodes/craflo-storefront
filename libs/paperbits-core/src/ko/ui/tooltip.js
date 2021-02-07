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
exports.Tooltip = void 0;
const tooltip_html_1 = require("./tooltip.html");
const ko = require("knockout");
const decorators_1 = require("@paperbits/common/ko/decorators");
let Tooltip = class Tooltip {
    constructor() {
        this.observableText = ko.observable();
    }
    init() {
        if (this.text) {
            this.observableText(this.text);
        }
    }
};
__decorate([
    decorators_1.Param(),
    __metadata("design:type", Object)
], Tooltip.prototype, "text", void 0);
__decorate([
    decorators_1.Param(),
    __metadata("design:type", Object)
], Tooltip.prototype, "observableText", void 0);
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Tooltip.prototype, "init", null);
Tooltip = __decorate([
    decorators_1.Component({
        selector: "tooltip",
        template: tooltip_html_1.default
    }),
    __metadata("design:paramtypes", [])
], Tooltip);
exports.Tooltip = Tooltip;
//# sourceMappingURL=tooltip.js.map