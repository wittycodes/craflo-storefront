"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DragSource = void 0;
class DragSource {
    constructor(element, config, dragManager) {
        this.element = element;
        this.configuration = config;
        this.dragManager = dragManager;
        this.onPointerDown = this.onPointerDown.bind(this);
        element.addEventListener("mousedown", this.onPointerDown);
        element["dragSource"] = this;
    }
    onPointerDown(event) {
        if (event.buttons !== 1 || event["handled"]) {
            return;
        }
        event["handled"] = true;
        const targetElement = event.target;
        this.beginDrag(targetElement, event.clientX, event.clientY);
    }
    beginDrag(targetElement, clientX, clientY) {
        if (this.configuration.preventDragging && this.configuration.preventDragging(targetElement)) {
            return;
        }
        const rect = this.element.getBoundingClientRect();
        this.initialOffsetX = clientX - rect.left;
        this.initialOffsetY = clientY - rect.top;
        this.initialPointerX = clientX;
        this.initialPointerY = clientY;
        this.dragManager.onPointerDown(this);
    }
}
exports.DragSource = DragSource;
//# sourceMappingURL=dragSource.js.map