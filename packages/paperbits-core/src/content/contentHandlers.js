"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentHandlers = void 0;
class ContentHandlers {
    constructor(viewManager) {
        this.viewManager = viewManager;
    }
    canAccept(dragSession) {
        return dragSession.sourceBinding.name === "section";
    }
    getContextualEditor(context) {
        const contextualEditor = {};
        if (context.model.widgets.length === 0) {
            contextualEditor.hoverCommands = [{
                    color: "#2b87da",
                    position: "center",
                    tooltip: "Add section",
                    component: {
                        name: "grid-layout-selector",
                        params: {
                            heading: "Add section",
                            onSelect: (model) => {
                                context.model.widgets.push(model);
                                context.binding.applyChanges();
                                this.viewManager.clearContextualEditors();
                            }
                        }
                    }
                }];
        }
        return contextualEditor;
    }
}
exports.ContentHandlers = ContentHandlers;
//# sourceMappingURL=contentHandlers.js.map