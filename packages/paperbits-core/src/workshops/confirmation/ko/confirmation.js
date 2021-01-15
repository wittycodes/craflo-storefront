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
exports.Confirmation = void 0;
const ko = require("knockout");
const confirmation_html_1 = require("./confirmation.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
let Confirmation = class Confirmation {
    constructor() {
        this.message = ko.observable("Are you sure?");
    }
    onMounted() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.getMessage) {
                const message = yield this.getMessage();
                this.message(message);
            }
        });
    }
    confirm() {
        if (this.onConfirm) {
            this.onConfirm();
        }
    }
    decline() {
        if (this.onDecline) {
            this.onDecline();
        }
    }
};
__decorate([
    decorators_1.Param(),
    __metadata("design:type", Function)
], Confirmation.prototype, "getMessage", void 0);
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], Confirmation.prototype, "onConfirm", void 0);
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], Confirmation.prototype, "onDecline", void 0);
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Confirmation.prototype, "onMounted", null);
Confirmation = __decorate([
    decorators_1.Component({
        selector: "confirmation",
        template: confirmation_html_1.default
    }),
    __metadata("design:paramtypes", [])
], Confirmation);
exports.Confirmation = Confirmation;
//# sourceMappingURL=confirmation.js.map