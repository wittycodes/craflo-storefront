"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PictureViewModelBinder = void 0;
const pictureViewModel_1 = require("./pictureViewModel");
const pictureModel_1 = require("../pictureModel");
class PictureViewModelBinder {
    constructor(eventManager, styleCompiler, mediaPermalinkResolver) {
        this.eventManager = eventManager;
        this.styleCompiler = styleCompiler;
        this.mediaPermalinkResolver = mediaPermalinkResolver;
    }
    modelToViewModel(model, viewModel, bindingContext) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!viewModel) {
                viewModel = new pictureViewModel_1.PictureViewModel();
            }
            let sourceUrl = null;
            if (model.sourceKey) {
                sourceUrl = yield this.mediaPermalinkResolver.getUrlByTargetKey(model.sourceKey);
                if (!sourceUrl) {
                    console.warn(`Unable to set picture. Media with source key ${model.sourceKey} not found.`);
                }
            }
            viewModel.sourceUrl(sourceUrl);
            viewModel.caption(model.caption);
            viewModel.hyperlink(model.hyperlink);
            viewModel.width(model.width);
            viewModel.height(model.height);
            if (model.styles) {
                viewModel.styles(yield this.styleCompiler.getStyleModelAsync(model.styles, bindingContext === null || bindingContext === void 0 ? void 0 : bindingContext.styleManager));
            }
            const binding = {
                name: "picture",
                displayName: "Picture",
                readonly: bindingContext ? bindingContext.readonly : false,
                model: model,
                draggable: true,
                flow: "inline",
                editor: "picture-editor",
                applyChanges: (changes) => __awaiter(this, void 0, void 0, function* () {
                    yield this.modelToViewModel(model, viewModel, bindingContext);
                    this.eventManager.dispatchEvent("onContentUpdate");
                })
            };
            viewModel["widgetBinding"] = binding;
            return viewModel;
        });
    }
    canHandleModel(model) {
        return model instanceof pictureModel_1.PictureModel;
    }
}
exports.PictureViewModelBinder = PictureViewModelBinder;
//# sourceMappingURL=pictureViewModelBinder.js.map