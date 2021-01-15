"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnMounted = void 0;
require("reflect-metadata");
function OnMounted(name) {
    return function (target, propertyKey) {
        let props = Reflect.getMetadata("onmounted", target.constructor);
        if (!props) {
            props = [];
        }
        props.push(propertyKey);
        Reflect.defineMetadata("onmounted", props, target.constructor);
    };
}
exports.OnMounted = OnMounted;
//# sourceMappingURL=onMounted.decorator.js.map