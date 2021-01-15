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
exports.RoleSelector = void 0;
const ko = require("knockout");
const role_selector_html_1 = require("./role-selector.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
let RoleSelector = class RoleSelector {
    constructor() {
        this.availableRoles = ko.observableArray();
        this.selectedRoles = ko.observableArray();
    }
    selectRole(role) {
        const roles = [role];
        this.selectedRoles(roles);
        if (this.onSelect) {
            this.onSelect(roles);
        }
    }
    isSelected(role) {
        return this.selectedRoles().some(x => x.key === role.key);
    }
};
__decorate([
    decorators_1.Param(),
    __metadata("design:type", Function)
], RoleSelector.prototype, "availableRoles", void 0);
__decorate([
    decorators_1.Param(),
    __metadata("design:type", Function)
], RoleSelector.prototype, "selectedRoles", void 0);
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], RoleSelector.prototype, "onSelect", void 0);
RoleSelector = __decorate([
    decorators_1.Component({
        selector: "role-selector",
        template: role_selector_html_1.default
    }),
    __metadata("design:paramtypes", [])
], RoleSelector);
exports.RoleSelector = RoleSelector;
//# sourceMappingURL=role-selector.js.map