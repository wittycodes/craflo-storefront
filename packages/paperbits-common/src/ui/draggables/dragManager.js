"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DragManager = void 0;
const Utils = require("../../utils");
const draggables_1 = require("../../ui/draggables");
const viewManager_1 = require("../viewManager");
const startDraggingTime = 300;
const frictionCoeff = 0.85;
const bounceCoeff = 0.4;
class DragManager {
    constructor(eventManager, viewManager) {
        this.eventManager = eventManager;
        this.viewManager = viewManager;
        this.startDragging = this.startDragging.bind(this);
        this.completeDragging = this.completeDragging.bind(this);
        this.onPointerMove = this.onPointerMove.bind(this);
        this.onPointerDown = this.onPointerDown.bind(this);
        this.onPointerUp = this.onPointerUp.bind(this);
        this.setAcceptor = this.setAcceptor.bind(this);
        this.registerDragSource = this.registerDragSource.bind(this);
        this.registerDragTarget = this.registerDragTarget.bind(this);
        this.resetDraggedElementPosition = this.resetDraggedElementPosition.bind(this);
        this.inertia = this.inertia.bind(this);
        this.eventManager.addEventListener("onPointerMove", this.onPointerMove);
        this.eventManager.addEventListener("onPointerUp", this.onPointerUp);
    }
    onPointerMove(event) {
        if (this.viewManager.mode == viewManager_1.ViewManagerMode.preview) {
            return;
        }
        if (!this.isDragged) {
            return;
        }
        if (event.which !== 1) {
            this.cancelDragging();
            return;
        }
        this.previousX = this.positionX;
        this.previousY = this.positionY;
        this.pointerX = event.clientX;
        this.pointerY = event.clientY;
        this.positionX = this.pointerX - this.initialOffsetX;
        this.positionY = this.pointerY - this.initialOffsetY;
        if (!this.source.configuration.sticky) {
            if (this.positionX > this.bounds.width - this.draggedClientRect.width) {
                this.positionX = this.bounds.width - this.draggedClientRect.width;
            }
            if (this.positionX < 0) {
                this.positionX = 0;
            }
            if (this.positionY > this.bounds.height - this.draggedClientRect.height) {
                this.positionY = this.bounds.height - this.draggedClientRect.height;
            }
            if (this.positionY < 0) {
                this.positionY = 0;
            }
            this.velocityX = this.positionX - this.previousX;
            this.velocityY = this.positionY - this.previousY;
        }
        if (this.target && this.target.element.classList.contains("accepting")) {
            this.target.element.classList.remove("accepting");
        }
        this.resetDraggedElementPosition();
    }
    resetDraggedElementPosition() {
        this.dragged.style.left = this.positionX + "px";
        this.dragged.style.top = this.positionY + "px";
    }
    startDragging(source) {
        this.velocityX = 0;
        this.velocityY = 0;
        this.isDragged = true;
        this.dragged = source.element;
        this.sourceData = source.configuration.sourceData;
        this.source = source;
        this.initialOffsetX = this.source.initialOffsetX;
        this.initialOffsetY = this.source.initialOffsetY;
        this.pointerX = this.source.initialPointerX;
        this.pointerY = this.source.initialPointerY;
        this.positionX = this.pointerX - this.initialOffsetX;
        this.positionY = this.pointerY - this.initialOffsetY;
        this.bounds = {
            top: 0,
            left: 0,
            width: document.body.clientWidth,
            height: document.body.clientHeight
        };
        if (source.configuration.sticky) {
            this.dragged.style.width = this.dragged.clientWidth + "px";
            this.dragged.style.height = this.dragged.clientHeight + "px";
        }
        if (source.configuration.ondragstart) {
            const replacement = source.configuration.ondragstart(source.configuration.sourceData, source.element);
            if (replacement) {
                this.dragged = replacement;
            }
        }
        if (!this.dragged.parentElement) {
            document.body.appendChild(this.dragged);
        }
        this.dragged.classList.add("dragged");
        this.draggedClientRect = source.element.getBoundingClientRect();
        this.resetDraggedElementPosition();
        this.viewManager.mode = viewManager_1.ViewManagerMode.dragging;
    }
    cancelDragging() {
        if (this.viewManager.mode == viewManager_1.ViewManagerMode.preview) {
            return;
        }
        this.target = null;
        this.completeDragging();
    }
    completeDragging() {
        this.isDragged = false;
        if (this.target) {
            this.target.element.classList.remove("accepting");
            const quadrant = Utils.pointerToClientQuadrant(this.pointerX, this.pointerY, this.target.element);
            if (this.target.config.ondrop) {
                this.target.config.ondrop(this.sourceData, this.target.config.targetData, quadrant);
            }
            if (this.target.config.ondropbefore && this.acceptBefore) {
                this.target.config.ondropbefore(this.source.configuration.sourceData, this.source.element);
            }
            if (this.target.config.ondropafter && !this.acceptBefore) {
                this.target.config.ondropafter(this.source.configuration.sourceData, this.source.element);
            }
        }
        this.dragged.classList.remove("dragged");
        if (this.source.configuration.ondragend) {
            this.source.configuration.ondragend(this.source.configuration.sourceData, this.source.element);
            this.eventManager.dispatchEvent("virtualDragEnd");
        }
        if (this.source.configuration.sticky) {
            this.dragged.style.removeProperty("left");
            this.dragged.style.removeProperty("top");
            this.dragged.style.removeProperty("width");
            this.dragged.style.removeProperty("height");
        }
        else if (this.source.configuration.inertia) {
            this.inertia();
        }
        this.sourceData = null;
        this.source = null;
        this.target = null;
    }
    onPointerUp(event) {
        if (this.viewManager.mode == viewManager_1.ViewManagerMode.preview) {
            return;
        }
        clearTimeout(this.startDraggingTimeout);
        if (!this.isDragged) {
            return;
        }
        this.completeDragging();
    }
    registerDragSource(element, config) {
        new draggables_1.DragSource(element, config, this);
    }
    registerDragTarget(element, config) {
        new draggables_1.DragTarget(element, config, this);
    }
    onPointerDown(source) {
        if (this.viewManager.mode == viewManager_1.ViewManagerMode.preview) {
            return;
        }
        if (source.configuration.sticky) {
            clearTimeout(this.startDraggingTimeout);
            this.startDraggingTimeout = setTimeout(() => this.startDragging(source), startDraggingTime);
        }
        else {
            this.startDragging(source);
        }
    }
    setAcceptor(acceptor, before) {
        this.target = acceptor;
        if (!this.target.element.classList.contains("accepting")) {
            this.target.element.classList.add("accepting");
        }
        this.acceptBefore = before;
    }
    inertia() {
        if (this.isDragged) {
            return;
        }
        if (Math.abs(this.velocityX) > 0.005 || Math.abs(this.velocityY) > 0.005) {
            requestAnimationFrame(this.inertia);
        }
        this.positionX += this.velocityX;
        this.positionY += this.velocityY;
        this.velocityX *= frictionCoeff;
        this.velocityY *= frictionCoeff;
        if (this.positionX > this.bounds.width - this.draggedClientRect.width) {
            this.velocityX *= -bounceCoeff;
            this.positionX = this.bounds.width - this.draggedClientRect.width;
        }
        if (this.positionX < 0) {
            this.velocityX *= -bounceCoeff;
            this.positionX = 0;
        }
        if (this.positionY > this.bounds.height - this.draggedClientRect.height) {
            this.velocityY *= -bounceCoeff;
            this.positionY = this.bounds.height - this.draggedClientRect.height;
        }
        if (this.positionY < 0) {
            this.velocityY *= -bounceCoeff;
            this.positionY = 0;
        }
        this.resetDraggedElementPosition();
    }
}
exports.DragManager = DragManager;
//# sourceMappingURL=dragManager.js.map