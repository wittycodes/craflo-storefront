"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationItemViewModel = void 0;
const ko = require("knockout");
const Utils = require("@paperbits/common");
const navigation_1 = require("@paperbits/common/navigation");
class NavigationItemViewModel {
    constructor(navitem) {
        this.moveNodeLeft = this.moveNodeLeft.bind(this);
        this.moveNodeRight = this.moveNodeRight.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.canAccept = this.canAccept.bind(this);
        this.insertBefore = this.insertBefore.bind(this);
        this.insertAfter = this.insertAfter.bind(this);
        this.key = navitem.key;
        this.label = ko.observable(navitem.label);
        this.label.subscribe(() => this.notify());
        this.nodes = ko.observableArray([]);
        this.collapsed = ko.observable(false);
        this.dragged = ko.observable(false);
        this.onUpdate = new ko.subscribable();
        this.targetKey = ko.observable(navitem.targetKey);
        this.targetKey.subscribe(() => this.notify());
        this.targetUrl = ko.observable(navitem.targetUrl);
        this.targetWindow = ko.observable(navitem.targetWindow);
        this.targetWindow.subscribe(() => this.notify());
    }
    isSiblingNode(node) {
        return this.parent && this.parent.nodes.indexOf(node) >= 0;
    }
    isChildNode(node) {
        return this.nodes.indexOf(node) >= 0;
    }
    isUncleNode(node) {
        return this.parent && this.parent.parent && this.parent.parent.nodes.indexOf(node) >= 0 && this.parent !== node;
    }
    moveNodeLeft() {
        if (!this.parent.parent) {
            return;
        }
        this.parent.nodes.remove(this);
        const ownIndex = this.parent.parent.nodes.indexOf(this.parent);
        this.parent.parent.nodes.splice(ownIndex + 1, 0, this);
        this.parent = this.parent.parent;
        this.notify();
    }
    moveNodeRight() {
        const index = this.parent.nodes().indexOf(this);
        if (index === 0) {
            return;
        }
        const previousSibling = this.parent.nodes()[index - 1];
        this.parent.nodes.remove(this);
        this.parent = previousSibling;
        previousSibling.nodes.push(this);
        this.notify();
    }
    canAccept(node) {
        return this.isSiblingNode(node) || this.isChildNode(node) || this.isUncleNode(node);
    }
    insertBefore(node) {
        if (this.parent && this.isSiblingNode(node) || this.isUncleNode(node) || this.isChildNode(node)) {
            node.parent.nodes.remove(node);
            const ownIndex = this.parent.nodes.indexOf(this);
            this.parent.nodes.splice(ownIndex, 0, node);
            node.parent = this.parent;
            this.notify();
        }
    }
    insertAfter(node) {
        if (this.parent && this.isSiblingNode(node) || this.isUncleNode(node)) {
            node.parent.nodes.remove(node);
            const ownIndex = this.parent.nodes.indexOf(this);
            this.parent.nodes.splice(ownIndex + 1, 0, node);
            node.parent = this.parent;
            this.notify();
        }
        if (this.parent && this.isChildNode(node)) {
            node.parent.nodes.remove(node);
            const ownIndex = this.parent.nodes.indexOf(this);
            this.parent.nodes.splice(ownIndex, 0, node);
            node.parent = this.parent;
            this.notify();
        }
    }
    toggleCollapsed() {
        this.collapsed(!this.collapsed());
    }
    onKeyDown(event) {
        switch (event.keyCode) {
            case 37:
                this.moveNodeLeft();
                break;
            case 39:
                this.moveNodeRight();
                break;
            default:
        }
    }
    remove() {
        this.parent.nodes.remove(this);
        this.notify();
    }
    addChild() {
        const navitemModel = new navigation_1.NavigationItemModel();
        navitemModel.key = Utils.guid();
        navitemModel.label = "< New >";
        const node = new NavigationItemViewModel(navitemModel);
        node.parent = this;
        this.nodes.push(node);
        return node;
    }
    notify() {
        this.onUpdate.notifySubscribers();
        if (this.parent) {
            this.parent.notify();
        }
    }
    toString() {
        return this.label();
    }
}
exports.NavigationItemViewModel = NavigationItemViewModel;
//# sourceMappingURL=navigationItemViewModel.js.map