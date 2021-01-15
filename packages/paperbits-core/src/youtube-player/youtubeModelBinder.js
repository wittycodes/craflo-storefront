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
exports.YoutubeModelBinder = void 0;
const youtubePlayerModel_1 = require("./youtubePlayerModel");
class YoutubeModelBinder {
    constructor() {
        this.contractToModel = this.contractToModel.bind(this);
    }
    canHandleContract(contract) {
        return contract.type === "youtube-player";
    }
    canHandleModel(model) {
        return model instanceof youtubePlayerModel_1.YoutubePlayerModel;
    }
    contractToModel(contract) {
        return __awaiter(this, void 0, void 0, function* () {
            const youtubePlayerModel = new youtubePlayerModel_1.YoutubePlayerModel();
            youtubePlayerModel.videoId = contract.videoId || contract["videoKey"];
            youtubePlayerModel.controls = contract.controls;
            youtubePlayerModel.autoplay = contract.autoplay;
            youtubePlayerModel.loop = contract.loop;
            youtubePlayerModel.styles = contract.styles || { appearance: "components/youtubePlayer/default" };
            return youtubePlayerModel;
        });
    }
    modelToContract(model) {
        const youtubeConfig = {
            type: "youtube-player",
            videoId: model.videoId,
            controls: model.controls,
            autoplay: model.autoplay,
            loop: model.loop,
            styles: model.styles
        };
        return youtubeConfig;
    }
}
exports.YoutubeModelBinder = YoutubeModelBinder;
//# sourceMappingURL=youtubeModelBinder.js.map