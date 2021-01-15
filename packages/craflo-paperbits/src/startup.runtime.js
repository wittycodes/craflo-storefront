"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./polyfills");
require("./themes/website/scripts");
const injection_1 = require("@paperbits/common/injection");
const core_runtime_module_1 = require("@paperbits/core/core.runtime.module");
const demo_runtime_module_1 = require("./modules/demo.runtime.module");
document.addEventListener("DOMContentLoaded", () => {
    const injector = new injection_1.InversifyInjector();
    injector.bindModule(new core_runtime_module_1.CoreRuntimeModule());
    injector.bindModule(new demo_runtime_module_1.DemoRuntimeModule());
    injector.resolve("autostart");
});
