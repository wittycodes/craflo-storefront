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
exports.PictureHandlers = void 0;
const Utils = require("@paperbits/common/utils");
const pictureModel_1 = require("./pictureModel");
const widgetDisplayName = "Picture";
class PictureHandlers {
    getWidgetOrderByConfig(sourceUrl, caption) {
        return __awaiter(this, void 0, void 0, function* () {
            const widgetOrder = {
                name: "picture",
                displayName: widgetDisplayName,
                category: "Media",
                iconClass: "paperbits-image-2",
                requires: ["html"],
                createModel: () => __awaiter(this, void 0, void 0, function* () {
                    const pictureModel = new pictureModel_1.PictureModel();
                    pictureModel.sourceKey = sourceUrl;
                    pictureModel.caption = caption;
                    return pictureModel;
                })
            };
            return widgetOrder;
        });
    }
    getWidgetOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getWidgetOrderByConfig(null, widgetDisplayName);
        });
    }
    getContentDescriptorFromMedia(media) {
        if (!PictureHandlers.isMediaFile(media)) {
            return null;
        }
        return {
            title: widgetDisplayName,
            description: media.description,
            getWidgetOrder: () => __awaiter(this, void 0, void 0, function* () {
                return yield this.getWidgetOrderByConfig(media.downloadUrl, media.fileName);
            })
        };
    }
    getContentDescriptorFromDataTransfer(dataTransfer) {
        if (!dataTransfer.name || !PictureHandlers.imageFileExtensions.some(e => dataTransfer.name.endsWith(e))) {
            return null;
        }
        const source = dataTransfer.source;
        const droppedSourceUrl = URL.createObjectURL(source);
        const getThumbnailPromise = () => new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            resolve(yield Utils.readBlobAsDataUrl(source));
        }));
        return {
            title: widgetDisplayName,
            description: dataTransfer.name,
            getWidgetOrder: () => __awaiter(this, void 0, void 0, function* () {
                return yield this.getWidgetOrderByConfig(droppedSourceUrl, dataTransfer.name);
            }),
            getPreviewUrl: getThumbnailPromise,
            getThumbnailUrl: getThumbnailPromise,
            uploadables: [dataTransfer.source]
        };
    }
    static isMediaFile(media) {
        return (media.mimeType && media.mimeType.indexOf("image") !== -1) || (media.fileName && this.imageFileExtensions.some(e => media.fileName.endsWith(e)));
    }
}
exports.PictureHandlers = PictureHandlers;
PictureHandlers.imageFileExtensions = [".jpg", ".jpeg", ".png", ".svg", ".gif"];
//# sourceMappingURL=pictureHandlers.js.map