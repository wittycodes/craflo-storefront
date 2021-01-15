"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnHandlers = void 0;
class ColumnHandlers {
    constructor(viewManager, eventManager) {
        this.viewManager = viewManager;
        this.eventManager = eventManager;
    }
    canAccept(dragSession) {
        return !["section", "row", "column"].includes(dragSession.sourceBinding.name);
    }
    getContextualEditor(context) {
        const columnContextualEditor = {
            color: "#9C27B0",
            hoverCommands: [],
            deleteCommand: null,
            selectCommands: [{
                    tooltip: "Edit column",
                    iconClass: "paperbits-edit-72",
                    position: "top right",
                    color: "#9C27B0",
                    callback: () => this.viewManager.openWidgetEditor(context.binding)
                }]
        };
        if (context.model.widgets.length === 0) {
            columnContextualEditor.hoverCommands.push({
                color: "#607d8b",
                position: "center",
                tooltip: "Add widget",
                component: {
                    name: "widget-selector",
                    params: {
                        onRequest: () => context.providers,
                        onSelect: (widget) => {
                            context.model.widgets.push(widget);
                            context.binding.applyChanges();
                            this.eventManager.dispatchEvent("onContentUpdate");
                            this.viewManager.clearContextualEditors();
                        }
                    }
                }
            });
        }
        return columnContextualEditor;
    }
}
exports.ColumnHandlers = ColumnHandlers;
//# sourceMappingURL=columnHandlers.js.map