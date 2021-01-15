"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WidgetBindingHandler = void 0;
const ko = require("knockout");
const editing_1 = require("@paperbits/common/editing");
const reactComponentBinder_1 = require("@paperbits/common/react/reactComponentBinder");
const makeArray = (arrayLikeObject) => {
    const result = [];
    for (let i = 0, j = arrayLikeObject.length; i < j; i++) {
        result.push(arrayLikeObject[i]);
    }
    return result;
};
const cloneNodes = (nodesArray, shouldCleanNodes) => {
    const newNodesArray = [];
    for (let i = 0, j = nodesArray.length; i < j; i++) {
        const clonedNode = nodesArray[i].cloneNode(true);
        newNodesArray.push(shouldCleanNodes ? ko.cleanNode(clonedNode) : clonedNode);
    }
    return newNodesArray;
};
const cloneTemplateIntoElement = (componentDefinition, element) => {
    const template = componentDefinition["template"];
    if (!template) {
        return element;
    }
    const clonedNodesArray = cloneNodes(template, false);
    ko.virtualElements.setDomNodeChildren(element, clonedNodesArray);
    return element;
};
class WidgetBindingHandler {
    constructor() {
        let componentLoadingOperationUniqueId = 0;
        ko.bindingHandlers["widget"] = {
            init(element, valueAccessor, ignored1, ignored2, bindingContext) {
                const bindingConfig = ko.utils.unwrapObservable(valueAccessor());
                if (!bindingConfig) {
                    return;
                }
                if (bindingConfig instanceof editing_1.WidgetBinding) {
                    const binding = bindingConfig;
                    let componentBinder;
                    switch (binding.framework) {
                        case "react":
                            componentBinder = new reactComponentBinder_1.ReactComponentBinder();
                            break;
                    }
                    componentBinder.init(element, binding);
                    if (binding.draggable) {
                        ko.applyBindingsToNode(element, { draggable: {} }, null);
                    }
                    return;
                }
                const registration = Reflect.getMetadata("paperbits-component", bindingConfig.constructor);
                if (!registration) {
                    throw new Error(`Could not find component registration for view model: ${bindingConfig}`);
                }
                const componentName = registration.name;
                let currentViewModel;
                let currentLoadingOperationId;
                const disposeAssociatedComponentViewModel = () => {
                    const currentViewModelDispose = currentViewModel && currentViewModel["dispose"];
                    if (currentViewModel) {
                        const binding = currentViewModel["widgetBinding"];
                        if (binding && binding.onDispose) {
                            binding.onDispose();
                        }
                    }
                    if (typeof currentViewModelDispose === "function") {
                        currentViewModelDispose.call(currentViewModel);
                    }
                    currentViewModel = null;
                    currentLoadingOperationId = null;
                };
                const originalChildNodes = makeArray(ko.virtualElements.childNodes(element));
                ko.utils.domNodeDisposal.addDisposeCallback(element, disposeAssociatedComponentViewModel);
                ko.computed(() => {
                    const componentViewModel = ko.utils.unwrapObservable(valueAccessor());
                    if (!componentViewModel) {
                        return;
                    }
                    const loadingOperationId = currentLoadingOperationId = ++componentLoadingOperationUniqueId;
                    const binding = componentViewModel["widgetBinding"];
                    if (binding && binding.onCreate) {
                        binding.onCreate();
                    }
                    ko.components.get(componentName, componentDefinition => {
                        if (currentLoadingOperationId !== loadingOperationId) {
                            return;
                        }
                        disposeAssociatedComponentViewModel();
                        if (!componentDefinition) {
                            throw new Error(`Unknown component "${componentName}".`);
                        }
                        const root = cloneTemplateIntoElement(componentDefinition, element);
                        const childBindingContext = bindingContext["createChildContext"](componentViewModel, undefined, ctx => {
                            ctx["$component"] = componentViewModel;
                            ctx["$componentTemplateNodes"] = originalChildNodes;
                        });
                        currentViewModel = componentViewModel;
                        ko.applyBindingsToDescendants(childBindingContext, root);
                        let nonVirtualElement = element;
                        if (nonVirtualElement.nodeName.startsWith("#")) {
                            do {
                                nonVirtualElement = nonVirtualElement.nextSibling;
                            } while (nonVirtualElement !== null && nonVirtualElement.nodeName.startsWith("#"));
                        }
                        if (nonVirtualElement) {
                            nonVirtualElement["attachedViewModel"] = componentViewModel;
                            const binding = componentViewModel["widgetBinding"];
                            if (binding) {
                                ko.applyBindingsToNode(nonVirtualElement, {
                                    css: {
                                        "block": binding.flow === "block",
                                        "inline-block": binding.flow === "inline",
                                        "placeholder": binding.flow === "none"
                                    }
                                }, null);
                                if (binding.draggable) {
                                    ko.applyBindingsToNode(nonVirtualElement, { draggable: {} }, null);
                                }
                            }
                        }
                    });
                }, null, { disposeWhenNodeIsRemoved: element });
                return { controlsDescendantBindings: false };
            }
        };
        ko.virtualElements.allowedBindings["widget"] = true;
    }
}
exports.WidgetBindingHandler = WidgetBindingHandler;
//# sourceMappingURL=bindingHandlers.widget.js.map