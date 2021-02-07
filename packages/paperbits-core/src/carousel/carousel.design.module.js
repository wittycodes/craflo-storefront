"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarouselDesignModule = void 0;
const carousel_1 = require("./ko/carousel");
const carouselModelBinder_1 = require("./carouselModelBinder");
const carouselViewModelBinder_1 = require("./ko/carouselViewModelBinder");
const carouselHandlers_1 = require("./carouselHandlers");
const carouselItemHandlers_1 = require("./carouselItemHandlers");
const ko_1 = require("./ko");
const carouselItemEditor_1 = require("./ko/carouselItemEditor");
class CarouselDesignModule {
    register(injector) {
        injector.bind("carousel", carousel_1.CarouselViewModel);
        injector.bind("carouselEditor", ko_1.CarouselEditor);
        injector.bind("carouselItemEditor", carouselItemEditor_1.CarouselItemEditor);
        injector.bindToCollection("modelBinders", carouselModelBinder_1.CarouselModelBinder, "carouselModelBinder");
        injector.bindToCollection("viewModelBinders", carouselViewModelBinder_1.CarouselViewModelBinder);
        injector.bindToCollection("widgetHandlers", carouselHandlers_1.CarouselHandlers, "carouselHandler");
        injector.bindToCollection("widgetHandlers", carouselItemHandlers_1.CarouselItemHandlers, "carouselItemHandler");
    }
}
exports.CarouselDesignModule = CarouselDesignModule;
//# sourceMappingURL=carousel.design.module.js.map