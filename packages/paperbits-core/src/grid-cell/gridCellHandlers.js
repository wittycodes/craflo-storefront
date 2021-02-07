"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridCellHandlers = void 0;
class GridCellHandlers {
    constructor(viewManager, eventManager) {
        this.viewManager = viewManager;
        this.eventManager = eventManager;
    }
    canAccept(dragSession) {
        return !["section", "row", "column"].includes(dragSession.sourceBinding.name);
    }
    getContextualEditor(context) {
        const gridCellContextualEditor = {
            color: "#9C27B0",
            hoverCommands: [],
            deleteCommand: null,
            selectCommands: [{
                    tooltip: "Edit grid cell",
                    iconClass: "paperbits-edit-72",
                    position: "top right",
                    color: "#9C27B0",
                    callback: () => this.viewManager.openWidgetEditor(context.binding)
                },
                {
                    tooltip: "Switch to parent",
                    iconClass: "paperbits-enlarge-vertical",
                    position: "top right",
                    color: "#9C27B0",
                    callback: () => {
                        context.switchToParent();
                    }
                }]
        };
        if (context.model.widgets.length !== 0) {
            return gridCellContextualEditor;
        }
        gridCellContextualEditor.hoverCommands.push({
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
        return gridCellContextualEditor;
    }
}
exports.GridCellHandlers = GridCellHandlers;
//# sourceMappingURL=gridCellHandlers.js.map