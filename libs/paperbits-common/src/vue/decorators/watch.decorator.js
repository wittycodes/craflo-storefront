"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Watch = void 0;
require("reflect-metadata");
function Watch(propertyName) {
    return function (target, propertyKey) {
        Reflect.defineMetadata("watch", propertyName, target[propertyKey]);
    };
}
exports.Watch = Watch;
//# sourceMappingURL=watch.decorator.js.map