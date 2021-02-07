"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Computed = void 0;
function Computed() {
    return function (target, propertyKey) {
        Reflect.defineMetadata("computed", propertyKey, target[propertyKey]);
    };
}
exports.Computed = Computed;
//# sourceMappingURL=computed.decorator.js.map