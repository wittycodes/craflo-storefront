"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridBindingHandler = void 0;
const ko = require("knockout");
const ui_1 = require("@paperbits/common/ui");
const editing_1 = require("@paperbits/common/editing");
class GridBindingHandler {
    constructor(viewManager, eventManager, widgetService, gridEditor) {
        ko.bindingHandlers["grid"] = {
            init(gridElement) {
                gridEditor.attach(gridElement.ownerDocument);
                ko.utils.domNodeDisposal.addDisposeCallback(gridElement, () => {
                    gridEditor.detach();
                });
            }
        };
        ko.virtualElements.allowedBindings["grid"] = true;
        ko.bindingHandlers["draggable"] = {
            init(element) {
                GridBindingHandler.attachWidgetDragEvents(element, viewManager, eventManager, widgetService);
            }
        };
    }
    static attachWidgetDragEvents(sourceElement, viewManager, eventManager, widgetService) {
        let placeholderElement;
        const onDragStart = () => {
            if (viewManager.mode === ui_1.ViewManagerMode.configure) {
                return;
            }
            const placeholderWidth = sourceElement.clientWidth - 1 + "px";
            const placeholderHeight = sourceElement.clientHeight - 1 + "px";
            const sourceBinding = editing_1.GridHelper.getWidgetBinding(sourceElement);
            const sourceModel = editing_1.GridHelper.getModel(sourceElement);
            const sourceParentBinding = editing_1.GridHelper.getParentWidgetBinding(sourceElement);
            const sourceParentModel = sourceParentBinding.model;
            placeholderElement = sourceElement.ownerDocument.createElement("div");
            placeholderElement.style.height = placeholderHeight;
            placeholderElement.style.width = placeholderWidth;
            placeholderElement.classList.add("dragged-origin");
            sourceElement.parentNode.insertBefore(placeholderElement, sourceElement.nextSibling);
            viewManager.beginDrag({
                sourceElement: sourceElement,
                sourceModel: sourceModel,
                sourceBinding: sourceBinding,
                sourceParentModel: sourceParentModel,
                sourceParentBinding: sourceParentBinding,
            });
            return sourceElement;
        };
        const onDragEnd = () => {
            const dragSession = viewManager.getDragSession();
            const acceptorElement = dragSession.targetElement;
            const acceptorBinding = dragSession.targetBinding;
            if (acceptorElement) {
                const parentModel = dragSession.sourceParentModel;
                const model = dragSession.sourceModel;
                parentModel.widgets.remove(model);
            }
            if (acceptorBinding && acceptorBinding.handler) {
                const widgetHandler = widgetService.getWidgetHandler(acceptorBinding.handler);
                if (widgetHandler.canAccept && widgetHandler.canAccept(dragSession)) {
                    if (widgetHandler.onDragDrop) {
                        widgetHandler.onDragDrop(dragSession);
                    }
                    else {
                        dragSession.targetBinding.model.widgets.splice(dragSession.insertIndex, 0, dragSession.sourceModel);
                        dragSession.targetBinding.applyChanges();
                        dragSession.sourceParentBinding.applyChanges();
                    }
                }
            }
            placeholderElement.remove();
            eventManager.dispatchEvent("virtualDragEnd");
        };
        const preventDragging = () => {
            return viewManager.mode === ui_1.ViewManagerMode.configure;
        };
        ko.applyBindingsToNode(sourceElement, {
            dragsource: {
                sticky: true,
                ondragstart: onDragStart,
                ondragend: onDragEnd,
                preventDragging: preventDragging
            }
        }, null);
    }
}
exports.GridBindingHandler = GridBindingHandler;
//# sourceMappingURL=bindingHandlers.grid.js.map