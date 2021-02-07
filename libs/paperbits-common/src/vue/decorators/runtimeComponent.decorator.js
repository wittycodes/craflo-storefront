"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuntimeComponent = void 0;
const vue_1 = require("vue");
function RuntimeComponent(config) {
    return (target) => {
        const toKebabCase = (str) => {
            return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
        };
        const toCamel = (s) => {
            return s.replace(/([-_][a-z])/ig, ($1) => {
                return $1.toUpperCase()
                    .replace("-", "")
                    .replace("_", "");
            });
        };
        const construct = vue_1.default.component(config.selector);
        const attrs = Object.keys(construct["options"]["props"]).map(toKebabCase);
        class RuntimeComponentProxy extends HTMLElement {
            constructor() {
                super();
            }
            static get observedAttributes() {
                return attrs;
            }
            connectedCallback() {
                setTimeout(() => {
                    this.instance = new construct();
                    const attrs = Array.prototype.slice.call(this.attributes);
                    attrs.forEach(attribute => {
                        this.instance[toCamel(attribute.name)] = attribute.value;
                    });
                    this.instance.$mount();
                    this.appendChild(this.instance.$el);
                }, 10);
            }
            attributeChangedCallback(name, oldValue, newValue) {
                if (!this.instance) {
                    return;
                }
                this.instance[toCamel(name)] = newValue;
            }
            disconnectedCallback() {
                this.instance.$destroy();
            }
        }
        customElements.define(config.selector, RuntimeComponentProxy);
    };
}
exports.RuntimeComponent = RuntimeComponent;
//# sourceMappingURL=runtimeComponent.decorator.js.map