"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowHandlers = void 0;
class RowHandlers {
    constructor(viewManager) {
        this.viewManager = viewManager;
    }
    getContextualEditor(context) {
        const rowContextualEditor = {
            color: "#29c4a9",
            hoverCommands: [{
                    color: "#29c4a9",
                    position: context.half,
                    tooltip: "Add row",
                    component: {
                        name: "row-layout-selector",
                        params: {
                            onSelect: (newRowModel) => {
                                let index = context.parentModel.widgets.indexOf(context.model);
                                if (context.half === "bottom") {
                                    index++;
                                }
                                context.parentModel.widgets.splice(index, 0, newRowModel);
                                context.parentBinding.applyChanges();
                                this.viewManager.clearContextualEditors();
                            }
                        }
                    },
                }],
            selectCommands: null,
            deleteCommand: {
                tooltip: "Delete row",
                color: "#29c4a9",
                callback: () => {
                    context.parentModel.widgets.remove(context.model);
                    context.parentBinding.applyChanges();
                    this.viewManager.clearContextualEditors();
                }
            }
        };
        return rowContextualEditor;
    }
}
exports.RowHandlers = RowHandlers;
//# sourceMappingURL=rowHandlers.js.map