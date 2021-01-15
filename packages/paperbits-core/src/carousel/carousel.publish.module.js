"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarouselPublishModule = void 0;
const carousel_1 = require("./ko/carousel");
const carouselModelBinder_1 = require("./carouselModelBinder");
const carouselViewModelBinder_1 = require("./ko/carouselViewModelBinder");
class CarouselPublishModule {
    register(injector) {
        injector.bind("carousel", carousel_1.CarouselViewModel);
        injector.bindToCollection("modelBinders", carouselModelBinder_1.CarouselModelBinder, "carouselModelBinder");
        injector.bindToCollection("viewModelBinders", carouselViewModelBinder_1.CarouselViewModelBinder);
    }
}
exports.CarouselPublishModule = CarouselPublishModule;
//# sourceMappingURL=carousel.publish.module.js.map