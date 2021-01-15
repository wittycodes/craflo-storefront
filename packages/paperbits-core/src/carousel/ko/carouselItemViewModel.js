"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarouselItemViewModel = void 0;
const ko = require("knockout");
class CarouselItemViewModel {
    constructor() {
        this.widgets = ko.observableArray();
        this.styles = ko.observable();
    }
}
exports.CarouselItemViewModel = CarouselItemViewModel;
//# sourceMappingURL=carouselItemViewModel.js.map