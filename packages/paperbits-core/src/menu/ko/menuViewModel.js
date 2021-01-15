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
exports.MenuViewModel = void 0;
const ko = require("knockout");
const menu_html_1 = require("./menu.html");
const horizontalMenu_html_1 = require("./horizontalMenu.html");
const verticalMenu_html_1 = require("./verticalMenu.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
let MenuViewModel = class MenuViewModel {
    constructor() {
        this.nodes = ko.observableArray([]);
        this.layout = ko.observable("vertical");
        this.roles = ko.observableArray();
        this.styles = ko.observable();
        this.isEmpty = ko.pureComputed(() => {
            return false;
        });
        this.css = ko.pureComputed(() => {
            return {
                "nav-horizontal": this.layout() === "horizontal",
                "nav-vertical": this.layout() === "vertical",
                "nav-full": this.layout() === "sitemap"
            };
        });
    }
};
MenuViewModel = __decorate([
    decorators_1.Component({
        selector: "menu",
        template: menu_html_1.default,
        childTemplates: {
            horizontalMenu: horizontalMenu_html_1.default,
            verticalMenu: verticalMenu_html_1.default
        }
    }),
    __metadata("design:paramtypes", [])
], MenuViewModel);
exports.MenuViewModel = MenuViewModel;
//# sourceMappingURL=menuViewModel.js.map