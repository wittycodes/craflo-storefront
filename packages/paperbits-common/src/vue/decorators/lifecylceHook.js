"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LifecycleHook = void 0;
function LifecycleHook(hookName) {
    return function (target, propertyKey) {
        Reflect.defineMetadata("lifecycle", hookName, target[propertyKey]);
    };
}
exports.LifecycleHook = LifecycleHook;
//# sourceMappingURL=lifecylceHook.js.map