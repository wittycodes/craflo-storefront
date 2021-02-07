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
exports.MediaDetailsWorkshop = void 0;
const FileSaver = require("file-saver");
const mediaDetails_html_1 = require("./mediaDetails.html");
const mediaItem_1 = require("./mediaItem");
const decorators_1 = require("@paperbits/common/ko/decorators");
const consts_1 = require("@paperbits/common/ko/consts");
let MediaDetailsWorkshop = class MediaDetailsWorkshop {
    constructor(mediaService, viewManager) {
        this.mediaService = mediaService;
        this.viewManager = viewManager;
        this.contentTypes = [
            "image/gif",
            "image/jpeg",
            "image/png",
            "image/tiff",
            "image/x-icon",
            "image/svg+xml",
            "video/mpeg",
            "video/mp4",
            "video/quicktime",
            "video/x-ms-wmv",
            "video/x-msvideo",
            "video/x-flv",
            "video/webm",
        ];
    }
    onMounted() {
        return __awaiter(this, void 0, void 0, function* () {
            this.mediaItem.fileName
                .extend(consts_1.ChangeRateLimit)
                .extend({ required: true, onlyValid: true })
                .subscribe(this.updateMedia);
            this.mediaItem.downloadUrl
                .extend(consts_1.ChangeRateLimit)
                .extend({ required: true, onlyValid: true })
                .subscribe(this.updateMediaUrl);
            this.mediaItem.contentType
                .extend(consts_1.ChangeRateLimit)
                .extend({ required: true, onlyValid: true })
                .subscribe(this.updateMedia);
            this.mediaItem.description
                .extend(consts_1.ChangeRateLimit)
                .subscribe(this.updateMedia);
            this.mediaItem.keywords
                .extend(consts_1.ChangeRateLimit)
                .subscribe(this.updateMedia);
            this.mediaItem.permalink
                .extend(consts_1.ChangeRateLimit)
                .extend({ required: true, validPermalink: this.mediaItem.key, onlyValid: true })
                .subscribe(this.updateMedia);
        });
    }
    updateMediaUrl() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.mediaItem.isDefaultFileName() && !this.mediaItem.isDefaultUrl()) {
                const newName = this.mediaItem.downloadUrl().split("/").pop();
                this.mediaItem.updateDefault(newName);
            }
            yield this.updateMedia();
        });
    }
    updateMedia() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.mediaService.updateMedia(this.mediaItem.toMedia());
        });
    }
    deleteMedia() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.mediaService.deleteMedia(this.mediaItem.toMedia());
            this.viewManager.notifySuccess("Media library", `File "${this.mediaItem.fileName()}" was deleted.`);
            this.viewManager.closeWorkshop("media-details-workshop");
            if (this.onDeleteCallback) {
                this.onDeleteCallback();
            }
        });
    }
    downloadMedia() {
        return __awaiter(this, void 0, void 0, function* () {
            FileSaver.saveAs(this.mediaItem.downloadUrl(), this.mediaItem.fileName(), { type: this.mediaItem.contentType() });
        });
    }
    openCropper() {
        this.viewManager.openViewAsPopup({
            heading: "Edit picture",
            component: {
                name: "picture-cropper",
                params: { mediaItem: this.mediaItem }
            },
            resize: "vertically horizontally"
        });
    }
};
__decorate([
    decorators_1.Param(),
    __metadata("design:type", mediaItem_1.MediaItem)
], MediaDetailsWorkshop.prototype, "mediaItem", void 0);
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], MediaDetailsWorkshop.prototype, "onDeleteCallback", void 0);
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MediaDetailsWorkshop.prototype, "onMounted", null);
MediaDetailsWorkshop = __decorate([
    decorators_1.Component({
        selector: "media-details-workshop",
        template: mediaDetails_html_1.default
    }),
    __metadata("design:paramtypes", [Object, Object])
], MediaDetailsWorkshop);
exports.MediaDetailsWorkshop = MediaDetailsWorkshop;
//# sourceMappingURL=mediaDetails.js.map