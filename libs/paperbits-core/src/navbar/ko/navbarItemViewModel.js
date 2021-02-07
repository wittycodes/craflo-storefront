"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavbarItemViewModel = void 0;
const ko = require("knockout");
class NavbarItemViewModel {
    constructor(label, url) {
        this.label = ko.observable(label);
        this.url = ko.observable(url);
        this.isActive = ko.observable();
        this.nodes = ko.observableArray();
    }
}
exports.NavbarItemViewModel = NavbarItemViewModel;
//# sourceMappingURL=navbarItemViewModel.js.map