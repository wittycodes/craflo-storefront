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
exports.getVideoThumbnailAsDataUrl = exports.getVideoThumbnailAsDataUrlFromUrl = void 0;
function getVideoThumbnailAsDataUrlFromUrl(url) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const video = document.createElement("video");
            video.crossOrigin = "Anonymous";
            const timeupdate = () => {
                if (snapImage()) {
                    video.removeEventListener("timeupdate", timeupdate);
                    video.pause();
                }
            };
            video.addEventListener("loadeddata", () => {
                if (snapImage()) {
                    video.removeEventListener("timeupdate", timeupdate);
                }
            });
            const snapImage = () => {
                const canvas = document.createElement("canvas");
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
                const image = canvas.toDataURL();
                const success = image.length > 100000;
                resolve(image);
                if (success) {
                    URL.revokeObjectURL(url);
                }
                return success;
            };
            video.addEventListener("timeupdate", timeupdate);
            video.preload = "metadata";
            video.src = url;
            video.muted = true;
            video.play();
        });
    });
}
exports.getVideoThumbnailAsDataUrlFromUrl = getVideoThumbnailAsDataUrlFromUrl;
function getVideoThumbnailAsDataUrl(file) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.onload = () => __awaiter(this, void 0, void 0, function* () {
                const blob = new Blob([fileReader.result], { type: file.type });
                const url = URL.createObjectURL(blob);
                const dataUrl = yield getVideoThumbnailAsDataUrlFromUrl(url);
                resolve(dataUrl);
                URL.revokeObjectURL(url);
            });
            fileReader.readAsArrayBuffer(file);
        });
    });
}
exports.getVideoThumbnailAsDataUrl = getVideoThumbnailAsDataUrl;
//# sourceMappingURL=mediaUtils.js.map