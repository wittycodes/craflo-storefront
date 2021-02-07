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
exports.YoutubePlayerViewModelBinder = void 0;
const youtubePlayer_1 = require("./youtubePlayer");
const youtubePlayerModel_1 = require("../youtubePlayerModel");
class YoutubePlayerViewModelBinder {
    constructor(eventManager, styleCompiler) {
        this.eventManager = eventManager;
        this.styleCompiler = styleCompiler;
    }
    modelToViewModel(model, viewModel, bindingContext) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!viewModel) {
                viewModel = new youtubePlayer_1.YoutubePlayerViewModel();
            }
            const videoId = model.videoId;
            const autoplay = model.autoplay ? "1" : "0";
            const controls = model.controls ? "1" : "0";
            const loop = model.loop ? "1" : "0";
            const url = videoId
                ? `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay}&controls=${controls}&loop=${loop}`
                : null;
            viewModel.sourceUrl(url);
            if (model.styles) {
                const st = yield this.styleCompiler.getStyleModelAsync(model.styles, bindingContext === null || bindingContext === void 0 ? void 0 : bindingContext.styleManager);
                viewModel.styles(st);
            }
            const biding = {
                name: "youtube-player",
                displayName: "Youtube player",
                readonly: bindingContext ? bindingContext.readonly : false,
                model: model,
                flow: "inline",
                draggable: true,
                editor: "youtube-player-editor",
                applyChanges: () => __awaiter(this, void 0, void 0, function* () {
                    yield this.modelToViewModel(model, viewModel, bindingContext);
                    this.eventManager.dispatchEvent("onContentUpdate");
                })
            };
            viewModel["widgetBinding"] = biding;
            return viewModel;
        });
    }
    canHandleModel(model) {
        return model instanceof youtubePlayerModel_1.YoutubePlayerModel;
    }
}
exports.YoutubePlayerViewModelBinder = YoutubePlayerViewModelBinder;
//# sourceMappingURL=youtubePlayerViewModelBinder.js.map