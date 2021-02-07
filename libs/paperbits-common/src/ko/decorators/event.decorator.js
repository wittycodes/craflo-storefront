"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
require("reflect-metadata");
function Event(name) {
    return function (target, propertyKey) {
        let props = Reflect.getMetadata("events", target.constructor);
        if (!props) {
            props = [];
        }
        props.push(propertyKey);
        Reflect.defineMetadata("events", props, target.constructor);
    };
}
exports.Event = Event;
//# sourceMappingURL=event.decorator.js.map