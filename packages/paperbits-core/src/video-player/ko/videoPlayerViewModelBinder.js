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
exports.VideoPlayerViewModelBinder = void 0;
const videoPlayer_1 = require("./videoPlayer");
const videoPlayerModel_1 = require("../videoPlayerModel");
class VideoPlayerViewModelBinder {
    constructor(eventManager, styleCompiler, mediaPermalinkResolver) {
        this.eventManager = eventManager;
        this.styleCompiler = styleCompiler;
        this.mediaPermalinkResolver = mediaPermalinkResolver;
    }
    modelToViewModel(model, viewModel, bindingContext) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!viewModel) {
                viewModel = new videoPlayer_1.VideoPlayer();
            }
            let sourceUrl = null;
            if (model.sourceKey) {
                sourceUrl = yield this.mediaPermalinkResolver.getUrlByTargetKey(model.sourceKey);
                if (!sourceUrl) {
                    console.warn(`Unable to set video. Media with source key ${model.sourceKey} not found.`);
                }
            }
            viewModel.sourceUrl(sourceUrl);
            viewModel.controls(model.controls);
            viewModel.autoplay(model.autoplay);
            if (model.styles) {
                viewModel.styles(yield this.styleCompiler.getStyleModelAsync(model.styles, bindingContext === null || bindingContext === void 0 ? void 0 : bindingContext.styleManager));
            }
            viewModel["widgetBinding"] = {
                displayName: "Video player",
                readonly: bindingContext ? bindingContext.readonly : false,
                model: model,
                flow: "inline",
                draggable: true,
                editor: "video-player-editor",
                applyChanges: (changes) => __awaiter(this, void 0, void 0, function* () {
                    yield this.modelToViewModel(model, viewModel, bindingContext);
                    this.eventManager.dispatchEvent("onContentUpdate");
                })
            };
            return viewModel;
        });
    }
    canHandleModel(model) {
        return model instanceof videoPlayerModel_1.VideoPlayerModel;
    }
}
exports.VideoPlayerViewModelBinder = VideoPlayerViewModelBinder;
//# sourceMappingURL=videoPlayerViewModelBinder.js.map