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
exports.VideoPlayerModelBinder = void 0;
const videoPlayerModel_1 = require("./videoPlayerModel");
class VideoPlayerModelBinder {
    canHandleContract(contract) {
        return contract.type === "video-player";
    }
    canHandleModel(model) {
        return model instanceof videoPlayerModel_1.VideoPlayerModel;
    }
    contractToModel(contract) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = new videoPlayerModel_1.VideoPlayerModel();
            model.controls = contract.controls;
            model.autoplay = contract.autoplay;
            model.styles = contract.styles || { appearance: "components/videoPlayer/default" };
            model.sourceKey = contract.sourceKey;
            return model;
        });
    }
    modelToContract(videoPlayerModel) {
        const videoConfig = {
            type: "video-player",
            sourceKey: videoPlayerModel.sourceKey,
            controls: videoPlayerModel.controls,
            autoplay: videoPlayerModel.autoplay,
            styles: videoPlayerModel.styles
        };
        return videoConfig;
    }
}
exports.VideoPlayerModelBinder = VideoPlayerModelBinder;
//# sourceMappingURL=videoPlayerModelBinder.js.map