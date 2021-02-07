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
exports.Tray = void 0;
const ko = require("knockout");
const tray_html_1 = require("./tray.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
let Tray = class Tray {
    constructor(trayCommands, roleService, viewManager, settingsProvider) {
        this.trayCommands = trayCommands;
        this.roleService = roleService;
        this.viewManager = viewManager;
        this.settingsProvider = settingsProvider;
        this.buttons = ko.observableArray(trayCommands);
        this.availableRoles = ko.observableArray();
        this.selectedRoles = ko.observableArray();
        this.localizationEnabled = ko.observable();
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            this.buttons(this.trayCommands);
            const roles = yield this.roleService.getRoles();
            this.availableRoles(roles.slice(1));
            this.selectedRoles(this.viewManager.getViewRoles());
            const localizationEnabled = yield this.settingsProvider.getSetting("localizationEnabled");
            this.localizationEnabled(!!localizationEnabled);
        });
    }
    onRoleSelect(roles) {
        this.selectedRoles(roles);
        this.viewManager.setViewRoles(roles);
    }
};
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Tray.prototype, "initialize", null);
Tray = __decorate([
    decorators_1.Component({
        selector: "tray",
        template: tray_html_1.default
    }),
    __metadata("design:paramtypes", [Array, Object, Object, Object])
], Tray);
exports.Tray = Tray;
//# sourceMappingURL=tray.js.map