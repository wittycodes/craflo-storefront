"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewStack = void 0;
const Utils = require("@paperbits/common/utils");
class ViewStack {
    constructor(eventManager) {
        this.eventManager = eventManager;
        this.stack = [];
        this.eventManager.addEventListener("onPointerDown", this.onPointerDown.bind(this));
        this.eventManager.addEventListener("onEscape", this.onEscape.bind(this));
    }
    onPointerDown(event) {
        const targetElement = event.target;
        this.runHitTest(targetElement);
    }
    runHitTest(targetElement) {
        const views = [...this.stack];
        for (const view of views.reverse()) {
            let hit;
            if (view.hitTest) {
                hit = view.hitTest(targetElement);
            }
            else {
                hit = !!Utils.closest(targetElement, (node) => node === view.element);
            }
            if (hit) {
                break;
            }
            this.stack.pop();
            view.close();
        }
    }
    onEscape() {
        const topView = this.stack.pop();
        if (topView) {
            topView.close();
            if (topView.returnFocusTo) {
                topView.returnFocusTo.focus();
            }
        }
        else {
            this.eventManager.dispatchEvent("onTopLevelEscape");
        }
    }
    pushView(view) {
        this.stack.push(view);
    }
    removeView(view) {
        this.stack.remove(view);
    }
    getViews() {
        return [...this.stack];
    }
    clear() {
        this.stack.forEach(view => view.close());
        this.stack = [];
    }
}
exports.ViewStack = ViewStack;
//# sourceMappingURL=viewStack.js.map