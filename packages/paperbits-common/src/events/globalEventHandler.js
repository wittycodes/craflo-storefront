"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalEventHandler = void 0;
const keyboard_1 = require("../keyboard");
class GlobalEventHandler {
    constructor(eventManager) {
        this.eventManager = eventManager;
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onCtrlS = this.onCtrlS.bind(this);
        this.onCtrlO = this.onCtrlO.bind(this);
        this.onEscape = this.onEscape.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDragDrop = this.onDragDrop.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onPaste = this.onPaste.bind(this);
        this.onPointerMove = this.onPointerMove.bind(this);
        this.onPointerDown = this.onPointerDown.bind(this);
        this.onPointerUp = this.onPointerUp.bind(this);
        this.onError = this.onError.bind(this);
        this.onUnhandledRejection = this.onUnhandledRejection.bind(this);
        this.addDragStartListener = this.addDragStartListener.bind(this);
        this.addDragEnterListener = this.addDragEnterListener.bind(this);
        this.addDragDropListener = this.addDragDropListener.bind(this);
        this.addDragEndListener = this.addDragEndListener.bind(this);
        this.addDragLeaveListener = this.addDragLeaveListener.bind(this);
        this.addDragLeaveScreenListener = this.addDragLeaveScreenListener.bind(this);
        this.addKeyDownListener = this.addKeyDownListener.bind(this);
        this.addKeyUpListener = this.addKeyUpListener.bind(this);
        this.documents = [];
    }
    appendDocument(doc) {
        if (this.documents.indexOf(doc) > -1) {
            return;
        }
        this.documents.push(doc);
        doc.addEventListener("keydown", this.onKeyDown, true);
        doc.addEventListener("keyup", this.onKeyUp, true);
        doc.addEventListener("dragenter", this.onDragEnter, true);
        doc.addEventListener("dragstart", this.onDragStart, true);
        doc.addEventListener("dragover", this.onDragOver, true);
        doc.addEventListener("dragleave", this.onDragLeave.bind(this));
        doc.addEventListener("drop", this.onDragDrop, true);
        doc.addEventListener("dragend", this.onDragEnd, true);
        doc.addEventListener("paste", this.onPaste, true);
        doc.addEventListener("mousemove", this.onPointerMove, true);
        doc.addEventListener("mousedown", this.onPointerDown, true);
        doc.addEventListener("mouseup", this.onPointerUp, true);
        doc.defaultView.window.addEventListener("error", this.onError, true);
        doc.defaultView.window.addEventListener("unhandledrejection", this.onUnhandledRejection, true);
    }
    removeDocument(doc) {
        this.documents.remove(doc);
        doc.removeEventListener("keydown", this.onKeyDown, true);
        doc.removeEventListener("keyup", this.onKeyUp, true);
        doc.removeEventListener("dragenter", this.onDragEnter, true);
        doc.removeEventListener("dragstart", this.onDragStart, true);
        doc.removeEventListener("dragover", this.onDragOver, true);
        doc.removeEventListener("dragleave", this.onDragLeave.bind(this));
        doc.removeEventListener("drop", this.onDragDrop, true);
        doc.removeEventListener("dragend", this.onDragEnd, true);
        doc.removeEventListener("paste", this.onPaste, true);
        doc.removeEventListener("mousemove", this.onPointerMove, true);
        doc.removeEventListener("mousedown", this.onPointerDown, true);
        doc.removeEventListener("mouseup", this.onPointerUp, true);
        doc.defaultView.window.removeEventListener("error", this.onError, true);
        doc.defaultView.window.removeEventListener("unhandledrejection", this.onUnhandledRejection, true);
    }
    onKeyDown(event) {
        this.eventManager.dispatchEvent("onKeyDown", event);
        if (event.ctrlKey && event.keyCode === keyboard_1.Keys.S) {
            event.preventDefault();
            this.onCtrlS();
        }
        if (event.ctrlKey && event.keyCode === keyboard_1.Keys.O) {
            event.preventDefault();
            this.onCtrlO();
        }
        if (event.ctrlKey && event.keyCode === keyboard_1.Keys.P) {
            event.preventDefault();
            this.onCtrlP();
        }
        if (event.keyCode === keyboard_1.Keys.Delete) {
            this.onDelete();
        }
        if (event.keyCode === keyboard_1.Keys.Esc) {
            event.preventDefault();
            this.onEscape();
        }
    }
    onKeyUp(event) {
        this.eventManager.dispatchEvent("onKeyUp", event);
    }
    onCtrlS() {
        this.eventManager.dispatchEvent("onSaveChanges");
    }
    onCtrlO() {
        this.eventManager.dispatchEvent("onLoadData");
    }
    onCtrlP() {
        this.eventManager.dispatchEvent("onPublish");
    }
    onEscape() {
        this.eventManager.dispatchEvent("onEscape");
    }
    onDelete() {
        this.eventManager.dispatchEvent("onDelete");
    }
    onPointerMove(event) {
        this.eventManager.dispatchEvent("onPointerMove", event);
    }
    onPointerDown(event) {
        this.eventManager.dispatchEvent("onPointerDown", event);
    }
    onPointerUp(event) {
        this.eventManager.dispatchEvent("onPointerUp", event);
    }
    onDragStart(event) {
        this.eventManager.dispatchEvent("onDragStart");
    }
    onDragEnter(event) {
        this.eventManager.dispatchEvent("onDragEnter");
        event.preventDefault();
    }
    onDragOver(event) {
        event.preventDefault();
        this.eventManager.dispatchEvent("onDragOver");
    }
    onDragLeave(event) {
        this.eventManager.dispatchEvent("onDragLeave");
        if (event.screenX === 0 && event.screenY === 0) {
            this.eventManager.dispatchEvent("onDragLeaveScreen");
        }
    }
    onDragDrop(event) {
        this.eventManager.dispatchEvent("onDragDrop", event);
        event.preventDefault();
    }
    onDragEnd() {
        this.eventManager.dispatchEvent("onDragEnd");
    }
    onPaste(event) {
        this.eventManager.dispatchEvent("onPaste", event);
    }
    onError(event) {
        this.eventManager.dispatchEvent("onError", event);
    }
    onUnhandledRejection(event) {
        this.eventManager.dispatchEvent("onUnhandledRejection", event);
    }
    addDragStartListener(callback) {
        this.eventManager.addEventListener("onDragStart", callback);
    }
    addDragEnterListener(callback) {
        this.eventManager.addEventListener("onDragEnter", callback);
    }
    addDragOverListener(callback) {
        this.eventManager.addEventListener("onDragOver", callback);
    }
    addDragLeaveListener(callback) {
        this.eventManager.addEventListener("onDragLeave", callback);
    }
    addDragLeaveScreenListener(callback) {
        this.eventManager.addEventListener("onDragLeaveScreen", callback);
    }
    addDragDropListener(callback) {
        this.eventManager.addEventListener("onDragDrop", callback);
    }
    addDragEndListener(callback) {
        this.eventManager.addEventListener("onDragEnd", callback);
    }
    addPasteListener(callback) {
        this.eventManager.addEventListener("onPaste", callback);
    }
    addPointerMoveEventListener(callback) {
        this.eventManager.addEventListener("onPointerMove", callback);
    }
    addKeyDownListener(callback) {
        this.eventManager.addEventListener("onKeyDown", callback);
    }
    addKeyUpListener(callback) {
        this.eventManager.addEventListener("onKeyUp", callback);
    }
}
exports.GlobalEventHandler = GlobalEventHandler;
//# sourceMappingURL=globalEventHandler.js.map