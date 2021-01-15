"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClickCounterRuntimeModule = void 0;
const click_counter_runtime_1 = require("./click-counter-runtime");
class ClickCounterRuntimeModule {
    register(injector) {
        injector.bind("clickCounterRuntime", click_counter_runtime_1.ClickCounterRuntime);
    }
}
exports.ClickCounterRuntimeModule = ClickCounterRuntimeModule;
