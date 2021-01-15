"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PictureModule = void 0;
const pictureModelBinder_1 = require("./pictureModelBinder");
const pictureViewModelBinder_1 = require("./ko/pictureViewModelBinder");
const pictureViewModel_1 = require("./ko/pictureViewModel");
class PictureModule {
    register(injector) {
        injector.bind("picture", pictureViewModel_1.PictureViewModel);
        injector.bindToCollection("modelBinders", pictureModelBinder_1.PictureModelBinder);
        injector.bindToCollection("viewModelBinders", pictureViewModelBinder_1.PictureViewModelBinder);
    }
}
exports.PictureModule = PictureModule;
//# sourceMappingURL=picture.module.js.map