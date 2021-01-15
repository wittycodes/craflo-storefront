"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollapsiblePanelHandlers = void 0;
const collapsiblePanelModel_1 = require("./collapsiblePanelModel");
class CollapsiblePanelHandlers {
    constructor(viewManager, eventManager) {
        this.viewManager = viewManager;
        this.eventManager = eventManager;
    }
    canAccept(dragSession) {
        return !["section", "row", "column", "collapsiblePanel"].includes(dragSession.sourceBinding.name);
    }
    getWidgetOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            const widgetOrder = {
                name: "collapsiblePanel",
                displayName: "Collapsible panel",
                iconClass: "paperbits-menu-34",
                requires: ["html", "js"],
                createModel: () => __awaiter(this, void 0, void 0, function* () {
                    return new collapsiblePanelModel_1.CollapsiblePanelModel();
                })
            };
            return widgetOrder;
        });
    }
    getContextualEditor(context) {
        const gridCellContextualEditor = {
            color: "#9C27B0",
            hoverCommands: [{
                    color: "#607d8b",
                    position: context.half,
                    tooltip: "Add widget",
                    component: {
                        name: "widget-selector",
                        params: {
                            onRequest: () => context.providers,
                            onSelect: (newWidgetModel) => {
                                let index = context.parentModel.widgets.indexOf(context.model);
                                if (context.half === "bottom") {
                                    index++;
                                }
                                context.parentBinding.model.widgets.splice(index, 0, newWidgetModel);
                                context.parentBinding.applyChanges();
                                this.viewManager.clearContextualEditors();
                            }
                        }
                    }
                }],
            deleteCommand: {
                tooltip: "Delete widget",
                color: "#607d8b",
                callback: () => {
                    context.parentModel.widgets.remove(context.model);
                    context.parentBinding.applyChanges();
                    this.viewManager.clearContextualEditors();
                },
            },
            selectCommands: [{
                    tooltip: "Edit collapsible panel",
                    iconClass: "paperbits-edit-72",
                    position: "top right",
                    color: "#607d8b",
                    callback: () => this.viewManager.openWidgetEditor(context.binding)
                }]
        };
        if (context.model.widgets.length === 0) {
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
        }
        return gridCellContextualEditor;
    }
}
exports.CollapsiblePanelHandlers = CollapsiblePanelHandlers;
//# sourceMappingURL=collapsiblePanelHandlers.js.map