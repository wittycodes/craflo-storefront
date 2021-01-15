"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarouselItemHandlers = void 0;
class CarouselItemHandlers {
    constructor(viewManager, eventManager) {
        this.viewManager = viewManager;
        this.eventManager = eventManager;
    }
    getContextualEditor(context) {
        const contextualEditor = {
            color: "#2b87da",
            hoverCommands: [],
            deleteCommand: null,
            selectCommands: [{
                    tooltip: "Edit carousel slide",
                    iconClass: "paperbits-edit-72",
                    position: "top right",
                    color: "#607d8b",
                    callback: () => this.viewManager.openWidgetEditor(context.binding)
                },
                {
                    tooltip: "Switch to parent",
                    iconClass: "paperbits-enlarge-vertical",
                    position: "top right",
                    color: "#607d8b",
                    callback: () => {
                        context.switchToParent();
                    }
                }]
        };
        if (context.parentModel["carouselItems"].length > 1) {
            contextualEditor.deleteCommand = {
                tooltip: "Delete slide",
                color: "#607d8b",
                callback: () => {
                    context.parentModel["carouselItems"].remove(context.model);
                    context.parentBinding.applyChanges();
                    this.viewManager.clearContextualEditors();
                    this.eventManager.dispatchEvent("onContentUpdate");
                }
            };
        }
        if (context.model.widgets.length === 0) {
            contextualEditor.hoverCommands.push({
                color: "#607d8b",
                position: "center",
                tooltip: "Set slide layout",
                component: {
                    name: "grid-layout-selector",
                    params: {
                        heading: "Set slide layout",
                        onSelect: (section) => {
                            context.model.widgets = section.widgets;
                            context.binding.applyChanges();
                            this.viewManager.clearContextualEditors();
                            this.eventManager.dispatchEvent("onContentUpdate");
                        }
                    }
                }
            });
        }
        return contextualEditor;
    }
}
exports.CarouselItemHandlers = CarouselItemHandlers;
//# sourceMappingURL=carouselItemHandlers.js.map