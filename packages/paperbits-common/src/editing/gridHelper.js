"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridHelper = void 0;
const ko = require("knockout");
const editing_1 = require("../editing");
class GridHelper {
    static getSelfAndParentElements(element) {
        const stack = [];
        while (element) {
            stack.push(element);
            element = element.parentElement;
        }
        return stack;
    }
    static getWidgetStack(element) {
        const elements = this.getSelfAndParentElements(element);
        let lastAdded = null;
        const roots = [];
        elements.reverse().forEach(element => {
            var _a;
            const context = ko.contextFor(element);
            if (!context) {
                return;
            }
            const widgetBinding = context.$data instanceof editing_1.WidgetBinding
                ? context.$data
                : (_a = context.$data) === null || _a === void 0 ? void 0 : _a.widgetBinding;
            if (!widgetBinding || widgetBinding.readonly || lastAdded === widgetBinding) {
                return;
            }
            roots.push({
                element: element,
                binding: widgetBinding
            });
            lastAdded = widgetBinding;
        });
        return roots.reverse();
    }
    static GetSelfAndParentBindings(element) {
        const context = ko.contextFor(element);
        if (!context) {
            return [];
        }
        const bindings = [];
        if (context.$data) {
            const widgetBinding = context.$data instanceof editing_1.WidgetBinding
                ? context.$data
                : context.$data.widgetBinding;
            bindings.push(widgetBinding);
        }
        let current = null;
        context.$parents.forEach(viewModel => {
            if (viewModel && viewModel !== current) {
                bindings.push(viewModel["widgetBinding"]);
                current = viewModel;
            }
        });
        return bindings;
    }
    static GetParentViewModels(element) {
        const context = ko.contextFor(element);
        if (!context) {
            return [];
        }
        const viewModels = [];
        let current = context.$data;
        context.$parents.forEach(viewModel => {
            if (viewModel && viewModel !== current) {
                viewModels.push(viewModel);
                current = viewModel;
            }
        });
        return viewModels;
    }
    static getParentWidgetBinding(element) {
        const viewModels = this.GetParentViewModels(element);
        if (viewModels.length === 0) {
            return null;
        }
        const parentViewModel = viewModels[0];
        return parentViewModel["widgetBinding"];
    }
    static getParentWidgetBindings(element) {
        const bindings = [];
        const parentViewModels = this.GetParentViewModels(element);
        parentViewModels.forEach(x => {
            const binding = x["widgetBinding"];
            if (binding) {
                bindings.push(binding);
            }
        });
        return bindings;
    }
    static getWidgetBinding(element) {
        const bindings = this.GetSelfAndParentBindings(element);
        if (bindings.length > 0) {
            return bindings[0];
        }
        else {
            return null;
        }
    }
    static getModel(element) {
        const widgetModel = GridHelper.getWidgetBinding(element);
        if (widgetModel && widgetModel["model"]) {
            return widgetModel["model"];
        }
        else {
            return null;
        }
    }
}
exports.GridHelper = GridHelper;
//# sourceMappingURL=gridHelper.js.map