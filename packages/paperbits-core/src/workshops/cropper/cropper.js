"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.PictureCropper = exports.CropperBindingHandler = void 0;
const ko = require("knockout");
const Cropper = require("cropperjs");
const cropper_html_1 = require("./cropper.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
const mediaItem_1 = require("../media/ko/mediaItem");
class CropperBindingHandler {
    constructor(eventManager) {
        ko.bindingHandlers["cropper"] = {
            init: (imageElement, valueAccessor) => {
                const observable = valueAccessor();
                const cropperInstance = new Cropper(imageElement, {
                    viewMode: 1,
                    responsive: true,
                    ready: () => {
                        this["croppable"] = true;
                    }
                });
                observable(cropperInstance);
                const onResize = () => {
                    cropperInstance["resize"]();
                };
                eventManager.addEventListener("onEditorResize", onResize);
                ko.utils.domNodeDisposal.addDisposeCallback(imageElement, () => {
                    eventManager.removeEventListener("onEditorResize", onResize);
                });
            }
        };
    }
}
exports.CropperBindingHandler = CropperBindingHandler;
let PictureCropper = class PictureCropper {
    constructor(mediaService, viewManager) {
        this.mediaService = mediaService;
        this.viewManager = viewManager;
        this.setMoveMode = this.setMoveMode.bind(this);
        this.setCropMode = this.setCropMode.bind(this);
        this.zoomIn = this.zoomIn.bind(this);
        this.zoomOut = this.zoomOut.bind(this);
        this.rotateLeft = this.rotateLeft.bind(this);
        this.rotateRight = this.rotateRight.bind(this);
        this.flipHorizontally = this.flipHorizontally.bind(this);
        this.flipVertically = this.flipVertically.bind(this);
        this.crop = this.crop.bind(this);
        this.clear = this.clear.bind(this);
        this.cropperInstance = ko.observable(null);
    }
    getRoundedCanvas(sourceCanvas) {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const width = sourceCanvas.width;
        const height = sourceCanvas.height;
        canvas.width = width;
        canvas.height = height;
        context.imageSmoothingEnabled = true;
        context.drawImage(sourceCanvas, 0, 0, width, height);
        context.globalCompositeOperation = "destination-in";
        context.beginPath();
        context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
        context.fill();
        return canvas;
    }
    setMoveMode() {
        this.cropperInstance().setDragMode("move");
    }
    setCropMode() {
        this.cropperInstance().setDragMode("crop");
    }
    zoomIn() {
        this.cropperInstance().zoom(0.1);
    }
    zoomOut() {
        this.cropperInstance().zoom(-0.1);
    }
    rotateLeft() {
        this.cropperInstance().rotate(-45);
    }
    rotateRight() {
        this.cropperInstance().rotate(45);
    }
    flipHorizontally() {
        this.cropperInstance().scaleX(-this.cropperInstance().imageData.scaleX);
    }
    flipVertically() {
        this.cropperInstance().scaleY(-this.cropperInstance().imageData.scaleY);
    }
    crop() {
        const cropper = this.cropperInstance();
        const canvas = cropper.getCroppedCanvas();
        canvas.toBlob((blob) => __awaiter(this, void 0, void 0, function* () {
            const reader = new FileReader();
            reader.addEventListener("loadend", () => __awaiter(this, void 0, void 0, function* () {
                const arrayBuffer = reader.result;
                yield this.updateMediaContent(new Uint8Array(arrayBuffer));
            }));
            reader.readAsArrayBuffer(blob);
        }));
    }
    updateMediaContent(content) {
        return __awaiter(this, void 0, void 0, function* () {
            const uploadPromise = this.mediaService.updateMediaContent(this.mediaItem.toMedia(), content);
            uploadPromise.then(updatedItem => {
                this.mediaItem.downloadUrl(updatedItem.downloadUrl);
                const cropper = this.cropperInstance();
                cropper.replace(updatedItem.downloadUrl);
            });
            yield this.viewManager.notifyProgress(uploadPromise, "Media library", `Updating ${this.mediaItem.fileName()}...`);
        });
    }
    clear() {
        this.cropperInstance().clear();
    }
};
__decorate([
    decorators_1.Param(),
    __metadata("design:type", mediaItem_1.MediaItem)
], PictureCropper.prototype, "mediaItem", void 0);
PictureCropper = __decorate([
    decorators_1.Component({
        selector: "picture-cropper",
        template: cropper_html_1.default
    }),
    __metadata("design:paramtypes", [Object, Object])
], PictureCropper);
exports.PictureCropper = PictureCropper;
//# sourceMappingURL=cropper.js.map