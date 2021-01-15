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
exports.YoutubePlayerViewModel = void 0;
const ko = require("knockout");
const youtubePlayer_html_1 = require("./youtubePlayer.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
let YoutubePlayerViewModel = class YoutubePlayerViewModel {
    constructor() {
        this.sourceUrl = ko.observable();
        this.styles = ko.observable();
    }
};
YoutubePlayerViewModel = __decorate([
    decorators_1.Component({
        selector: "youtube-player",
        template: youtubePlayer_html_1.default
    }),
    __metadata("design:paramtypes", [])
], YoutubePlayerViewModel);
exports.YoutubePlayerViewModel = YoutubePlayerViewModel;
//# sourceMappingURL=youtubePlayer.js.map