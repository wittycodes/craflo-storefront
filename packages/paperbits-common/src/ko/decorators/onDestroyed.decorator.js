"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnDestroyed = void 0;
require("reflect-metadata");
function OnDestroyed(name) {
    return function (target, propertyKey) {
        let props = Reflect.getMetadata("ondestroyed", target.constructor);
        if (!props) {
            props = [];
        }
        props.push(propertyKey);
        Reflect.defineMetadata("ondestroyed", props, target.constructor);
    };
}
exports.OnDestroyed = OnDestroyed;
//# sourceMappingURL=onDestroyed.decorator.js.map