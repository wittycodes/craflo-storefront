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
exports.BrowserNotSupported = void 0;
const decorators_1 = require("@paperbits/common/ko/decorators");
let BrowserNotSupported = class BrowserNotSupported {
    constructor() {
    }
};
BrowserNotSupported = __decorate([
    decorators_1.Component({
        selector: "browser-not-supported",
        template: "<div><h1>The app does not support this version of your browser, please update or use a different browser.</h1></div>"
    }),
    __metadata("design:paramtypes", [])
], BrowserNotSupported);
exports.BrowserNotSupported = BrowserNotSupported;
//# sourceMappingURL=browserNotSupported.js.map