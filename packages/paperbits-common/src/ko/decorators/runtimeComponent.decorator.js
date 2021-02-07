"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuntimeComponent = void 0;
const ko = require("knockout");
function RuntimeComponent(config) {
    return (target) => {
        class RuntimeComponentProxy extends HTMLElement {
            constructor() {
                super();
            }
            static get observedAttributes() {
                return ["params"];
            }
            connectedCallback() {
                const element = this;
                setTimeout(() => {
                    const params = element.getAttribute("params");
                    const paramsObservable = ko.observable(params);
                    ko.applyBindingsToNode(element, {
                        component: {
                            name: config.selector,
                            viewModel: target,
                            params: paramsObservable
                        }
                    }, null);
                }, 10);
            }
            attributeChangedCallback(name, oldValue, newValue) {
                const element = this;
                const isBound = !!ko.contextFor(element);
                if (!isBound) {
                    return;
                }
                this.disconnectedCallback();
                this.connectedCallback();
            }
            disconnectedCallback() {
                ko.cleanNode(this);
            }
        }
        customElements.define(config.selector, RuntimeComponentProxy);
    };
}
exports.RuntimeComponent = RuntimeComponent;
//# sourceMappingURL=runtimeComponent.decorator.js.map