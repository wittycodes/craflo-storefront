"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = exports.Encapsulation = void 0;
require("reflect-metadata");
const ko = require("knockout");
require("../templateEngines/stringTemplateEngine");
var Encapsulation;
(function (Encapsulation) {
    Encapsulation["none"] = "none";
    Encapsulation["shadowDom"] = "shadowDom";
})(Encapsulation = exports.Encapsulation || (exports.Encapsulation = {}));
function Component(config) {
    return function (target) {
        ko.components.register(config.selector, {
            template: config.template,
            viewModel: target,
            synchronous: false,
            encapsulation: config.encapsulation
        });
        if (config.childTemplates) {
            Object.keys(config.childTemplates).forEach(templateName => {
                if (ko["templates"][templateName]) {
                    throw new Error(`Template "${templateName}" already defined.`);
                }
                ko["templates"][templateName] = config.childTemplates[templateName];
            });
        }
        Reflect.defineMetadata("paperbits-component", {
            name: config.selector,
            constructor: target
        }, target);
    };
}
exports.Component = Component;
//# sourceMappingURL=component.decorator.js.map