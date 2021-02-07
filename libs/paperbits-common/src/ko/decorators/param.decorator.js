"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Param = void 0;
require("reflect-metadata");
function Param(name) {
    return function (target, propertyKey) {
        let props = Reflect.getMetadata("params", target.constructor);
        if (!props) {
            props = [];
        }
        props.push(propertyKey);
        Reflect.defineMetadata("params", props, target.constructor);
    };
}
exports.Param = Param;
//# sourceMappingURL=param.decorator.js.map