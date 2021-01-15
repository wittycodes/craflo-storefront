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
exports.ClickCounterRuntimeModule = exports.AngularAppModule = void 0;
const core_1 = require("@angular/core");
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
const platform_browser_1 = require("@angular/platform-browser");
const elements_1 = require("@angular/elements");
const click_counter_runtime_1 = require("./click-counter-runtime");
let AngularAppModule = class AngularAppModule {
    constructor(angularInjector) {
        this.angularInjector = angularInjector;
        const elementConstructor = elements_1.createCustomElement(click_counter_runtime_1.ClickCounterRuntime, { injector: this.angularInjector });
        customElements.define("click-counter-runtime", elementConstructor);
    }
};
AngularAppModule = __decorate([
    core_1.NgModule({
        declarations: [click_counter_runtime_1.ClickCounterRuntime],
        imports: [platform_browser_1.BrowserModule],
        entryComponents: [click_counter_runtime_1.ClickCounterRuntime]
    }),
    __metadata("design:paramtypes", [core_1.Injector])
], AngularAppModule);
exports.AngularAppModule = AngularAppModule;
class ClickCounterRuntimeModule {
    register(paperbitsInjector) {
        platform_browser_dynamic_1.platformBrowserDynamic()
            .bootstrapModule(AngularAppModule)
            .catch(error => console.log(error));
    }
}
exports.ClickCounterRuntimeModule = ClickCounterRuntimeModule;
