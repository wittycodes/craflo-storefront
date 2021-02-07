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
exports.MapRuntime = void 0;
const ko = require("knockout");
const map_runtime_html_1 = require("./map-runtime.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
let MapRuntime = class MapRuntime {
    constructor() {
        this.caption = ko.observable();
        this.layout = ko.observable();
        this.location = ko.observable();
        this.zoom = ko.observable();
        this.mapType = ko.observable();
        this.apiKey = ko.observable();
    }
};
__decorate([
    decorators_1.Param(),
    __metadata("design:type", Function)
], MapRuntime.prototype, "caption", void 0);
__decorate([
    decorators_1.Param(),
    __metadata("design:type", Function)
], MapRuntime.prototype, "layout", void 0);
__decorate([
    decorators_1.Param(),
    __metadata("design:type", Function)
], MapRuntime.prototype, "location", void 0);
__decorate([
    decorators_1.Param(),
    __metadata("design:type", Function)
], MapRuntime.prototype, "zoom", void 0);
__decorate([
    decorators_1.Param(),
    __metadata("design:type", Function)
], MapRuntime.prototype, "mapType", void 0);
__decorate([
    decorators_1.Param(),
    __metadata("design:type", Function)
], MapRuntime.prototype, "apiKey", void 0);
MapRuntime = __decorate([
    decorators_1.RuntimeComponent({
        selector: "map-runtime"
    }),
    decorators_1.Component({
        selector: "map-runtime",
        template: map_runtime_html_1.default
    }),
    __metadata("design:paramtypes", [])
], MapRuntime);
exports.MapRuntime = MapRuntime;
//# sourceMappingURL=map-runtime.js.map