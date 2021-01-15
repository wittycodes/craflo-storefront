"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionHandlers = void 0;
const blocks_1 = require("@paperbits/common/blocks");
class SectionHandlers {
    constructor(viewManager, eventManager) {
        this.viewManager = viewManager;
        this.eventManager = eventManager;
    }
    getContextualEditor(context) {
        const sectionContextualEditor = {
            color: "#2b87da",
            hoverCommands: [{
                    position: context.half,
                    tooltip: "Add section",
                    color: "#2b87da",
                    component: {
                        name: "grid-layout-selector",
                        params: {
                            heading: "Add section",
                            onSelect: (section) => {
                                const sectionHalf = context.half;
                                let index = context.parentModel.widgets.indexOf(context.model);
                                if (sectionHalf === "bottom") {
                                    index++;
                                }
                                context.parentModel.widgets.splice(index, 0, section);
                                context.parentBinding.applyChanges();
                                this.viewManager.clearContextualEditors();
                                this.eventManager.dispatchEvent("onContentUpdate");
                            }
                        }
                    }
                }],
            deleteCommand: {
                tooltip: "Delete section",
                color: "#2b87da",
                callback: () => {
                    context.parentModel.widgets.remove(context.model);
                    context.parentBinding.applyChanges();
                    this.viewManager.clearContextualEditors();
                    this.eventManager.dispatchEvent("onContentUpdate");
                }
            },
            selectCommands: [{
                    tooltip: "Edit section",
                    iconClass: "paperbits-edit-72",
                    position: "top right",
                    color: "#2b87da",
                    callback: () => this.viewManager.openWidgetEditor(context.binding)
                }, {
                    tooltip: "Add to library",
                    iconClass: "paperbits-simple-add",
                    position: "top right",
                    color: "#2b87da",
                    callback: () => {
                        const view = {
                            heading: "Add to library",
                            component: {
                                name: "add-block-dialog",
                                params: {
                                    blockModel: context.model,
                                    blockType: blocks_1.BlockType.saved
                                }
                            },
                            resize: "vertically horizontally"
                        };
                        this.viewManager.openViewAsPopup(view);
                    }
                }]
        };
        if (context.model.widgets.length === 0) {
            sectionContextualEditor.hoverCommands.push({
                position: "center",
                tooltip: "Add row",
                color: "#29c4a9",
                component: {
                    name: "grid-layout-selector",
                    params: {
                        heading: "Add row",
                        onSelect: (newRowModel) => {
                            const sectionModel = context.model;
                            const sectionBinding = context.binding;
                            sectionModel.widgets.push(newRowModel);
                            sectionBinding.applyChanges();
                            this.viewManager.clearContextualEditors();
                            this.eventManager.dispatchEvent("onContentUpdate");
                        }
                    }
                }
            });
        }
        return sectionContextualEditor;
    }
}
exports.SectionHandlers = SectionHandlers;
//# sourceMappingURL=sectionHandlers.js.map