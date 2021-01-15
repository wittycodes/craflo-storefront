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
exports.ClickCounterRuntime = void 0;
const click_counter_runtime_html_1 = require("./click-counter-runtime.html");
const decorators_1 = require("@paperbits/common/vue/decorators");
let ClickCounterRuntime = class ClickCounterRuntime {
    constructor() {
        this.clickCount = 0;
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            this.clickCount = this.initialCount;
        });
    }
    dispose() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    increaseCount() {
        this.clickCount = this.clickCount + 1;
    }
};
__decorate([
    decorators_1.Prop(),
    __metadata("design:type", Number)
], ClickCounterRuntime.prototype, "initialCount", void 0);
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClickCounterRuntime.prototype, "initialize", null);
__decorate([
    decorators_1.OnDestroyed(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClickCounterRuntime.prototype, "dispose", null);
ClickCounterRuntime = __decorate([
    decorators_1.RuntimeComponent({
        selector: "click-counter-runtime"
    }),
    decorators_1.Component({
        selector: "click-counter-runtime",
        template: click_counter_runtime_html_1.default
    }),
    __metadata("design:paramtypes", [])
], ClickCounterRuntime);
exports.ClickCounterRuntime = ClickCounterRuntime;
