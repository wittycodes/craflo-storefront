"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuntimeComponent = void 0;
const ReactDOM = require("react-dom");
const react_1 = require("react");
function RuntimeComponent(config) {
    return (target) => {
        class RuntimeComponentProxy extends HTMLElement {
            constructor() {
                super();
            }
            connectedCallback() {
                const element = this;
                setTimeout(() => {
                    const reactElement = react_1.createElement(target, {});
                    ReactDOM.render(reactElement, element);
                }, 10);
            }
            disconnectedCallback() {
            }
        }
        customElements.define(config.selector, RuntimeComponentProxy);
    };
}
exports.RuntimeComponent = RuntimeComponent;
