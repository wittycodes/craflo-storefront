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
exports.CardHandlers = void 0;
const cardModel_1 = require("./cardModel");
const textblockModel_1 = require("./../textblock/textblockModel");
class CardHandlers {
    constructor(viewManager, eventManager) {
        this.viewManager = viewManager;
        this.eventManager = eventManager;
    }
    canAccept(dragSession) {
        return !["section", "row", "column", "card"].includes(dragSession.sourceBinding.name);
    }
    getContextualEditor(context) {
        const cardContextualEditor = {
            color: "#4c5866",
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
                tooltip: "Delete card",
                color: "#4c5866",
                callback: () => {
                    context.parentModel.widgets.remove(context.model);
                    context.parentBinding.applyChanges();
                    this.viewManager.clearContextualEditors();
                    this.eventManager.dispatchEvent("onContentUpdate");
                }
            },
            selectCommands: [{
                    tooltip: "Edit card",
                    iconClass: "paperbits-edit-72",
                    position: "top right",
                    color: "#4c5866",
                    callback: () => this.viewManager.openWidgetEditor(context.binding)
                },
                {
                    tooltip: "Switch to parent",
                    iconClass: "paperbits-enlarge-vertical",
                    position: "top right",
                    color: "#4c5866",
                    callback: () => {
                        context.switchToParent();
                    }
                }]
        };
        if (context.model.widgets.length === 0) {
            cardContextualEditor.hoverCommands.push({
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
        return cardContextualEditor;
    }
    getWidgetOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            const widgetOrder = {
                name: "card",
                displayName: "Card",
                iconClass: "paperbits-polaroid",
                requires: ["html"],
                createModel: () => __awaiter(this, void 0, void 0, function* () {
                    const textblock = new textblockModel_1.TextblockModel([
                        {
                            type: "heading1",
                            content: [{ type: "text", text: "Card" }]
                        },
                        {
                            type: "paragraph",
                            content: [{ type: "text", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor..." }]
                        }
                    ]);
                    const model = new cardModel_1.CardModel();
                    model.widgets.push(textblock);
                    return model;
                })
            };
            return widgetOrder;
        });
    }
}
exports.CardHandlers = CardHandlers;
//# sourceMappingURL=cardHandlers.js.map