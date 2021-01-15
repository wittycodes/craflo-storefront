"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarouselRuntimelModule = void 0;
const carousel_runtime_1 = require("./ko/runtime/carousel-runtime");
class CarouselRuntimelModule {
    register(injector) {
        const carouselComponentName = "carousel-runtime";
        customElements.define(carouselComponentName, carousel_runtime_1.CarouselHTMLElement);
    }
}
exports.CarouselRuntimelModule = CarouselRuntimelModule;
//# sourceMappingURL=carousel.runtime.module.js.map