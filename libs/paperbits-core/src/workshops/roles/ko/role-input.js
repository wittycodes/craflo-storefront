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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleInput = void 0;
const ko = require("knockout");
const role_input_html_1 = require("./role-input.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
const user_1 = require("@paperbits/common/user");
let RoleInput = class RoleInput {
    constructor(roleService) {
        this.roleService = roleService;
        this.availableRoles = ko.observableArray();
        this.selectedRoles = ko.observableArray();
        this.selectedRolesDisplay = ko.observable();
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            const availableRoles = yield this.roleService.getRoles();
            this.availableRoles(availableRoles);
            const selectedRoles = this.selection
                ? availableRoles.filter(x => this.selection.includes(x.key))
                : [user_1.BuiltInRoles.everyone];
            this.selectedRoles(selectedRoles);
            this.updateDisplay(selectedRoles);
        });
    }
    updateDisplay(roles) {
        return this.selectedRolesDisplay(roles.map(x => x.name).sort().join(", "));
    }
    onSelectionChange(roles) {
        this.updateDisplay(roles);
        this.selectedRoles(roles);
        this.selection = roles.map(role => role.key);
        if (this.onChange) {
            this.onChange(this.selection);
        }
    }
};
__decorate([
    decorators_1.Param(),
    __metadata("design:type", Array)
], RoleInput.prototype, "selection", void 0);
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], RoleInput.prototype, "onChange", void 0);
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoleInput.prototype, "initialize", null);
RoleInput = __decorate([
    decorators_1.Component({
        selector: "role-input",
        template: role_input_html_1.default
    }),
    __metadata("design:paramtypes", [Object])
], RoleInput);
exports.RoleInput = RoleInput;
//# sourceMappingURL=role-input.js.map