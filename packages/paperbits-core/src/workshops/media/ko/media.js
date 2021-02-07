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
exports.MediaWorkshop = void 0;
const ko = require("knockout");
const Utils = require("@paperbits/common/utils");
const media_html_1 = require("./media.html");
const mediaItem_1 = require("./mediaItem");
const keyboard_1 = require("@paperbits/common/keyboard");
const decorators_1 = require("@paperbits/common/ko/decorators");
const consts_1 = require("@paperbits/common/ko/consts");
const persistence_1 = require("@paperbits/common/persistence");
let MediaWorkshop = class MediaWorkshop {
    constructor(eventManager, mediaService, viewManager, widgetService) {
        this.eventManager = eventManager;
        this.mediaService = mediaService;
        this.viewManager = viewManager;
        this.widgetService = widgetService;
        this.working = ko.observable(false);
        this.mediaItems = ko.observableArray();
        this.searchPattern = ko.observable("");
        this.selectedMediaItem = ko.observable();
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.searchMedia();
            this.searchPattern
                .extend(consts_1.ChangeRateLimit)
                .subscribe(this.searchMedia);
        });
    }
    searchMedia(searchPattern = "") {
        return __awaiter(this, void 0, void 0, function* () {
            this.working(true);
            this.mediaItems([]);
            const query = persistence_1.Query
                .from()
                .orderBy(`fileName`);
            if (searchPattern) {
                query.where(`fileName`, persistence_1.Operator.contains, searchPattern);
            }
            const mediaOfResults = yield this.mediaService.search(query);
            this.currentPage = mediaOfResults;
            const mediaItems = mediaOfResults.value.map(media => new mediaItem_1.MediaItem(media));
            this.mediaItems.push(...mediaItems);
            this.working(false);
        });
    }
    loadNextPage() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = this.currentPage) === null || _a === void 0 ? void 0 : _a.takeNext) || this.working()) {
                return;
            }
            this.working(true);
            this.currentPage = yield this.currentPage.takeNext();
            const mediaItems = this.currentPage.value.map(page => new mediaItem_1.MediaItem(page));
            this.mediaItems.push(...mediaItems);
            this.working(false);
        });
    }
    uploadMedia() {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield this.viewManager.openUploadDialog();
            this.working(true);
            const uploadPromises = [];
            for (const file of files) {
                const content = yield Utils.readFileAsByteArray(file);
                const uploadPromise = this.mediaService.createMedia(file.name, content, file.type);
                this.viewManager.notifyProgress(uploadPromise, "Media library", `Uploading ${file.name}...`);
                uploadPromises.push(uploadPromise);
            }
            yield Promise.all(uploadPromises);
            yield this.searchMedia();
            this.working(false);
        });
    }
    linkMedia() {
        return __awaiter(this, void 0, void 0, function* () {
            const mediaContract = yield this.mediaService.createMediaUrl(mediaItem_1.defaultFileName, mediaItem_1.defaultURL, "image/svg+xml");
            const mediaItem = new mediaItem_1.MediaItem(mediaContract);
            this.mediaItems.push(mediaItem);
            this.selectMedia(mediaItem);
        });
    }
    selectMedia(mediaItem) {
        this.selectedMediaItem(mediaItem);
        const view = {
            heading: "Media file",
            component: {
                name: "media-details-workshop",
                params: {
                    mediaItem: mediaItem,
                    onDeleteCallback: () => {
                        this.searchMedia();
                    }
                }
            }
        };
        this.viewManager.openViewAsWorkshop(view);
    }
    deleteSelectedMedia() {
        return __awaiter(this, void 0, void 0, function* () {
            this.viewManager.closeWorkshop("media-details-workshop");
            yield this.mediaService.deleteMedia(this.selectedMediaItem().toMedia());
            yield this.searchMedia();
        });
    }
    onDragStart(item) {
        item.widgetFactoryResult = item.widgetOrder.createWidget();
        const widgetElement = item.widgetFactoryResult.element;
        const widgetModel = item.widgetFactoryResult.widgetModel;
        const widgetBinding = item.widgetFactoryResult.widgetBinding;
        this.viewManager.beginDrag({
            sourceModel: widgetModel,
            sourceBinding: widgetBinding
        });
        return widgetElement;
    }
    onDragEnd(item) {
        item.widgetFactoryResult.element.remove();
        const dragSession = this.viewManager.getDragSession();
        const acceptorBinding = dragSession.targetBinding;
        if (acceptorBinding && acceptorBinding.handler) {
            const widgetHandler = this.widgetService.getWidgetHandler(acceptorBinding.handler);
            widgetHandler.onDragDrop(dragSession);
        }
        this.eventManager.dispatchEvent("virtualDragEnd");
    }
    onKeyDown(item, event) {
        if (event.keyCode === keyboard_1.Keys.Delete) {
            this.deleteSelectedMedia();
        }
    }
    isSelected(media) {
        const selectedMedia = this.selectedMediaItem();
        return (selectedMedia === null || selectedMedia === void 0 ? void 0 : selectedMedia.key) === media.key;
    }
};
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MediaWorkshop.prototype, "initialize", null);
MediaWorkshop = __decorate([
    decorators_1.Component({
        selector: "media",
        template: media_html_1.default
    }),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], MediaWorkshop);
exports.MediaWorkshop = MediaWorkshop;
//# sourceMappingURL=media.js.map