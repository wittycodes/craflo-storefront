"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = void 0;
require("reflect-metadata");
const vue_1 = require("vue");
function Component(config) {
    return function (target) {
        const props = Reflect.getMetadata("props", target);
        const vueComponentConfig = {
            template: config.template,
            props: props,
            data: () => Component.prototype.getInstance(target),
            methods: {},
            computed: {},
            watch: {}
        };
        const propertyNames = Object.getOwnPropertyNames(target.prototype);
        propertyNames.forEach(name => {
            const method = target.prototype[name];
            if (typeof method !== "function" || name === "constructor") {
                return;
            }
            const lifecycleHook = Reflect.getMetadata("lifecycle", method);
            if (lifecycleHook) {
                vueComponentConfig[lifecycleHook] = method;
                return;
            }
            const computedPropertyName = Reflect.getMetadata("computed", method);
            if (computedPropertyName) {
                vueComponentConfig.computed[computedPropertyName] = method;
                return;
            }
            const watchPropertyName = Reflect.getMetadata("watch", method);
            if (watchPropertyName) {
                vueComponentConfig.watch[watchPropertyName] = method;
                return;
            }
            vueComponentConfig.methods[name] = method;
        });
        vue_1.default.component(config.selector, vueComponentConfig);
    };
}
exports.Component = Component;
//# sourceMappingURL=component.decorator.js.map