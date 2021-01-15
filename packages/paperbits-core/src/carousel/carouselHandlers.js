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
exports.CarouselHandlers = void 0;
const carouselModel_1 = require("./carouselModel");
class CarouselHandlers {
    constructor(viewManager, eventManager) {
        this.viewManager = viewManager;
        this.eventManager = eventManager;
    }
    getWidgetOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            const widgetOrder = {
                name: "carousel",
                displayName: "Carousel",
                iconClass: "paperbits-slider",
                requires: [],
                createModel: () => __awaiter(this, void 0, void 0, function* () {
                    const model = new carouselModel_1.CarouselModel();
                    model.carouselItems.push(new carouselModel_1.CarouselItemModel());
                    model.carouselItems.push(new carouselModel_1.CarouselItemModel());
                    model.carouselItems.push(new carouselModel_1.CarouselItemModel());
                    model.styles.instance = {
                        size: {
                            xl: {
                                minHeight: 300
                            },
                            lg: {
                                minHeight: 300
                            },
                            md: {
                                minHeight: 300
                            },
                            sm: {
                                minHeight: 300
                            },
                            xs: {
                                minHeight: 300
                            }
                        }
                    };
                    return model;
                })
            };
            return widgetOrder;
        });
    }
    getContextualEditor(context) {
        const carouselContextualEditor = {
            color: "#2b87da",
            hoverCommands: null,
            deleteCommand: {
                tooltip: "Delete carousel",
                color: "#607d8b",
                callback: () => {
                    context.parentModel.widgets.remove(context.model);
                    context.parentBinding.applyChanges();
                    this.viewManager.clearContextualEditors();
                    this.eventManager.dispatchEvent("onContentUpdate");
                }
            },
            selectCommands: [{
                    tooltip: "Add slide",
                    iconClass: "paperbits-circle-add",
                    position: "top right",
                    color: "#607d8b",
                    callback: () => {
                        context.model["carouselItems"].push(new carouselModel_1.CarouselItemModel());
                        context.parentBinding.applyChanges();
                        this.viewManager.clearContextualEditors();
                        this.eventManager.dispatchEvent("onContentUpdate");
                    }
                },
                {
                    tooltip: "Edit carousel",
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
                    callback: () => context.switchToParent()
                }]
        };
        return carouselContextualEditor;
    }
}
exports.CarouselHandlers = CarouselHandlers;
//# sourceMappingURL=carouselHandlers.js.map