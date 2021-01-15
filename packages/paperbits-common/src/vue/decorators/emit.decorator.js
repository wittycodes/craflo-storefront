"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emit = void 0;
function Emit(eventName) {
    return function (target, propertyKey) {
        target[propertyKey] = function (...args) {
            this.$emit(eventName, ...args);
        };
    };
}
exports.Emit = Emit;
//# sourceMappingURL=emit.decorator.js.map