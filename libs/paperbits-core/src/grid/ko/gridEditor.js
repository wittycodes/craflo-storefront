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
exports.GridEditor = void 0;
const Utils = require("@paperbits/common/utils");
const ui_1 = require("@paperbits/common/ui");
const editing_1 = require("@paperbits/common/editing");
const content_1 = require("../../content");
class GridEditor {
    constructor(viewManager, widgetService, eventManager) {
        this.viewManager = viewManager;
        this.widgetService = widgetService;
        this.eventManager = eventManager;
        this.rerenderEditors = this.rerenderEditors.bind(this);
        this.onPointerDown = this.onPointerDown.bind(this);
        this.attach = this.attach.bind(this);
        this.detach = this.detach.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onPointerMove = this.onPointerMove.bind(this);
        this.onWindowScroll = this.onWindowScroll.bind(this);
        this.actives = {};
    }
    isModelBeingEdited(binding) {
        const view = this.viewManager.getOpenView();
        if (!view) {
            return false;
        }
        if (view.component.name !== binding.editor) {
            return false;
        }
        return true;
    }
    getContextualEditor(element, half) {
        const bindings = editing_1.GridHelper.getParentWidgetBindings(element);
        const providers = bindings
            .filter(x => !!x.provides)
            .map(x => x.provides)
            .reduce((acc, val) => acc.concat(val), []);
        let model;
        let binding;
        if (element) {
            model = editing_1.GridHelper.getModel(element);
            binding = editing_1.GridHelper.getWidgetBinding(element);
        }
        let parentModel;
        const parentBinding = editing_1.GridHelper.getParentWidgetBinding(element);
        if (parentBinding) {
            parentModel = parentBinding.model;
        }
        const context = {
            parentModel: parentModel,
            parentBinding: parentBinding,
            model: model,
            binding: binding,
            half: half,
            providers: providers,
            switchToParent: () => {
                const stack = editing_1.GridHelper.getWidgetStack(element);
                if (stack.length <= 1) {
                    return;
                }
                const stackItem = stack[1];
                if (!stackItem) {
                    return;
                }
                const contextualEditor = this.getContextualEditor(stackItem.element, "top");
                if (!contextualEditor) {
                    return;
                }
                const config = {
                    element: stackItem.element,
                    text: stackItem.binding.displayName,
                    color: contextualEditor.color
                };
                this.viewManager.setSelectedElement(config, contextualEditor);
                this.selectedContextualEditor = contextualEditor;
            }
        };
        let contextualEditor;
        if (context.binding.handler) {
            const handler = this.widgetService.getWidgetHandler(context.binding.handler);
            if (handler.getContextualEditor) {
                contextualEditor = handler.getContextualEditor(context);
            }
        }
        if (!contextualEditor) {
            contextualEditor = this.getWidgetContextualEditor(context);
        }
        contextualEditor.element = element;
        contextualEditor.selectCommands = contextualEditor.selectCommands || null;
        contextualEditor.hoverCommands = contextualEditor.hoverCommands || null;
        contextualEditor.deleteCommand = contextualEditor.deleteCommand || null;
        return contextualEditor;
    }
    isModelSelected(binding) {
        const selectedElement = this.viewManager.getSelectedElement();
        if (!selectedElement) {
            return false;
        }
        const selectedBinding = editing_1.GridHelper.getWidgetBinding(selectedElement.element);
        if (binding !== selectedBinding) {
            return false;
        }
        return true;
    }
    onPointerDown(event) {
        if (event.ctrlKey) {
            return;
        }
        if (this.viewManager.mode === ui_1.ViewManagerMode.pause) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        if (event.which !== 1) {
            return;
        }
        if (this.viewManager.mode !== ui_1.ViewManagerMode.selecting &&
            this.viewManager.mode !== ui_1.ViewManagerMode.selected &&
            this.viewManager.mode !== ui_1.ViewManagerMode.configure) {
            return;
        }
        const element = this.activeHighlightedElement;
        const bindings = editing_1.GridHelper.getParentWidgetBindings(element);
        const windgetIsInContent = bindings.some(x => x.model instanceof content_1.ContentModel || x.name === "email-layout");
        const host = this.viewManager.getHost();
        const layoutEditing = host.name === "layout-host";
        if ((!windgetIsInContent && !layoutEditing)) {
            event.preventDefault();
            event.stopPropagation();
            this.eventManager.dispatchEvent("InactiveLayoutHint");
            return;
        }
        const widgetBinding = editing_1.GridHelper.getWidgetBinding(element);
        if (!widgetBinding) {
            return;
        }
        if (widgetBinding.readonly) {
            return;
        }
        if (widgetBinding.editor !== "html-editor") {
            event.preventDefault();
        }
        if (this.isModelBeingEdited(widgetBinding)) {
            return;
        }
        if (this.isModelSelected(widgetBinding)) {
            if (widgetBinding.editor) {
                this.viewManager.openWidgetEditor(widgetBinding);
            }
        }
        else {
            event.preventDefault();
            if (element["dragSource"]) {
                element["dragSource"].beginDrag(element, this.pointerX, this.pointerY);
            }
            const contextualEditor = this.getContextualEditor(element, "top");
            if (!contextualEditor) {
                return;
            }
            const config = {
                element: this.activeHighlightedElement,
                text: widgetBinding["displayName"],
                color: contextualEditor.color
            };
            this.viewManager.setSelectedElement(config, contextualEditor);
            this.selectedContextualEditor = contextualEditor;
        }
    }
    onPointerMove(event) {
        if (this.viewManager.mode === ui_1.ViewManagerMode.pause) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        this.pointerX = event.clientX;
        this.pointerY = event.clientY;
        const elements = this.getUnderlyingElements();
        if (elements.length === 0) {
            return;
        }
        switch (this.viewManager.mode) {
            case ui_1.ViewManagerMode.selecting:
            case ui_1.ViewManagerMode.selected:
            case ui_1.ViewManagerMode.configure:
                this.renderHighlightedElements();
                break;
            case ui_1.ViewManagerMode.dragging:
                this.renderDropHandlers();
                break;
        }
    }
    renderDropHandlers() {
        const dragSession = this.viewManager.getDragSession();
        if (!dragSession) {
            return;
        }
        const elements = this.getUnderlyingElements();
        if (elements.length === 0) {
            return;
        }
        const stack = editing_1.GridHelper.getWidgetStack(elements[1]);
        const acceptingParentElement = stack.find(x => {
            if (!x.binding.handler) {
                return false;
            }
            const handler = this.widgetService.getWidgetHandler(x.binding.handler);
            if (handler && handler.canAccept && handler.canAccept(dragSession)) {
                return true;
            }
            return false;
        });
        if (!acceptingParentElement || elements.some(element => element.classList.contains("dragged-origin"))) {
            delete dragSession.targetElement;
            delete dragSession.targetBinding;
            this.viewManager.setSplitter(null);
            return;
        }
        dragSession.targetElement = acceptingParentElement.element;
        dragSession.targetBinding = editing_1.GridHelper.getWidgetBinding(acceptingParentElement.element);
        const siblingElement = stack.find(x => x.element.parentElement === acceptingParentElement.element);
        if (siblingElement) {
            const quadrant = Utils.pointerToClientQuadrant(this.pointerX, this.pointerY, siblingElement.element);
            const sourceElementFlow = dragSession.sourceBinding.flow || "inline";
            dragSession.insertIndex = acceptingParentElement.binding.model.widgets.indexOf(siblingElement.binding.model);
            const hoveredElementFlow = siblingElement.binding.flow || "inline";
            if (sourceElementFlow === "inline" && hoveredElementFlow === "inline") {
                if (quadrant.horizontal === "right") {
                    dragSession.insertIndex++;
                }
                this.viewManager.setSplitter({
                    element: siblingElement.element,
                    side: quadrant.horizontal,
                    where: "outside"
                });
            }
            else {
                if (quadrant.vertical === "bottom") {
                    dragSession.insertIndex++;
                }
                this.viewManager.setSplitter({
                    element: siblingElement.element,
                    side: quadrant.vertical,
                    where: "outside"
                });
            }
        }
        else {
            const quadrant = Utils.pointerToClientQuadrant(this.pointerX, this.pointerY, acceptingParentElement.element);
            if (acceptingParentElement.binding.model.widgets.length === 0) {
                dragSession.insertIndex = 0;
                this.viewManager.setSplitter({
                    element: acceptingParentElement.element,
                    side: quadrant.vertical,
                    where: "inside"
                });
                return;
            }
            else {
                const children = Array.prototype.slice.call(acceptingParentElement.element.children);
                if (quadrant.vertical === "top") {
                    dragSession.insertIndex = 0;
                    const child = children[0];
                    this.viewManager.setSplitter({
                        element: child,
                        side: "top",
                        where: "outside"
                    });
                }
                else {
                    dragSession.insertIndex = children.length;
                    const child = children[dragSession.insertIndex];
                    this.viewManager.setSplitter({
                        element: child,
                        side: "bottom",
                        where: "outside"
                    });
                }
            }
        }
    }
    onDelete() {
        if (this.viewManager.mode === ui_1.ViewManagerMode.selected && this.selectedContextualEditor && this.selectedContextualEditor.deleteCommand) {
            this.selectedContextualEditor.deleteCommand.callback();
        }
    }
    onWindowScroll() {
        if (this.viewManager.mode === ui_1.ViewManagerMode.dragging || this.viewManager.mode === ui_1.ViewManagerMode.pause) {
            return;
        }
        if (!this.scrolling) {
            this.viewManager.clearContextualEditors();
        }
        this.scrolling = true;
        if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
        }
        this.scrollTimeout = setTimeout(this.resetScrolling.bind(this), 400);
    }
    resetScrolling() {
        this.scrolling = false;
        this.renderHighlightedElements();
    }
    getUnderlyingElements() {
        const elements = Utils.elementsFromPoint(this.ownerDocument, this.pointerX, this.pointerY);
        const index = elements.findIndex(x => x.classList.contains("backdrop"));
        if (index >= 0) {
            elements.splice(index);
        }
        return elements;
    }
    renderHighlightedElements() {
        if (this.scrolling) {
            return;
        }
        const elements = this.getUnderlyingElements();
        if (elements.length > 0) {
            if (elements.some(x => x.classList.contains("editor") ||
                x.classList.contains("balloon") ||
                x.nodeName === "BUTTON")) {
                return;
            }
        }
        this.rerenderEditors(this.pointerX, this.pointerY, elements);
    }
    getWidgetContextualEditor(context) {
        const widgetContextualEditor = {
            color: "#607d8b",
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
            selectCommands: context.binding.editor && context.binding.applyChanges && [{
                    tooltip: "Edit widget",
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
        return widgetContextualEditor;
    }
    rerenderEditors(pointerX, pointerY, elements) {
        return __awaiter(this, void 0, void 0, function* () {
            let highlightedElement;
            let highlightedText;
            let highlightColor;
            const tobeDeleted = Object.keys(this.actives);
            let current = null;
            for (let i = elements.length - 1; i >= 0; i--) {
                const element = elements[i];
                const widgetBinding = editing_1.GridHelper.getWidgetBinding(element);
                if (!widgetBinding) {
                    continue;
                }
                if (!widgetBinding || widgetBinding.readonly || widgetBinding === current) {
                    continue;
                }
                const index = tobeDeleted.indexOf(widgetBinding.name);
                tobeDeleted.splice(index, 1);
                highlightedElement = element;
                highlightedText = widgetBinding.displayName;
                current = widgetBinding;
                const quadrant = Utils.pointerToClientQuadrant(pointerX, pointerY, element);
                const half = quadrant.vertical;
                const active = this.actives[widgetBinding.name];
                const contextualEditor = this.getContextualEditor(element, half);
                highlightColor = contextualEditor.color;
                if (!active || element !== active.element || half !== active.half) {
                    this.viewManager.setContextualEditor(widgetBinding.name, contextualEditor);
                    this.actives[widgetBinding.name] = {
                        element: element,
                        half: quadrant.vertical
                    };
                }
            }
            tobeDeleted.forEach(x => {
                this.viewManager.removeContextualEditor(x);
                delete this.actives[x];
            });
            if (this.activeHighlightedElement !== highlightedElement) {
                this.activeHighlightedElement = highlightedElement;
                this.viewManager.setHighlight({ element: highlightedElement, text: highlightedText, color: highlightColor });
            }
        });
    }
    attach(ownerDocument) {
        this.ownerDocument = ownerDocument;
        this.ownerDocument.addEventListener("mousemove", this.onPointerMove, true);
        this.ownerDocument.addEventListener("scroll", this.onWindowScroll);
        this.ownerDocument.addEventListener("mousedown", this.onPointerDown, true);
        this.eventManager.addEventListener("onDelete", this.onDelete);
    }
    detach() {
        this.ownerDocument.removeEventListener("mousemove", this.onPointerMove, true);
        this.ownerDocument.removeEventListener("scroll", this.onWindowScroll);
        this.ownerDocument.removeEventListener("mousedown", this.onPointerDown, true);
        this.eventManager.removeEventListener("onDelete", this.onDelete);
    }
}
exports.GridEditor = GridEditor;
//# sourceMappingURL=gridEditor.js.map