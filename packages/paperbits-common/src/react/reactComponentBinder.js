"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactComponentBinder = void 0;
const React = require("react");
const ReactDOM = require("react-dom");
class ReactComponentBinder {
    init(element, binding) {
        const reactElement = React.createElement(binding.viewModelClass, {});
        const viewModelInstance = ReactDOM.render(reactElement, element);
        binding.viewModelInstance = viewModelInstance;
        binding.applyChanges(binding.model);
    }
}
exports.ReactComponentBinder = ReactComponentBinder;
//# sourceMappingURL=reactComponentBinder.js.map