"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItemViewModel = void 0;
const ko = require("knockout");
class MenuItemViewModel {
    constructor() {
        this.label = ko.observable();
        this.targetUrl = ko.observable();
        this.targetWindow = ko.observable();
        this.level = ko.observable();
        this.nodes = ko.observableArray([]);
        this.isActive = ko.observable(false);
        this.expanded = ko.observable(false);
    }
    toggle() {
        this.expanded(!this.expanded());
    }
}
exports.MenuItemViewModel = MenuItemViewModel;
//# sourceMappingURL=menuItemViewModel.js.map