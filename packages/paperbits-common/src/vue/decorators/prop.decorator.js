"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prop = void 0;
function Prop() {
    return function (target, propertyKey) {
        let props = Reflect.getMetadata("props", target.constructor);
        if (!props) {
            props = [];
        }
        props.push(propertyKey);
        Reflect.defineMetadata("props", props, target.constructor);
    };
}
exports.Prop = Prop;
//# sourceMappingURL=prop.decorator.js.map