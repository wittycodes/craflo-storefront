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
exports.DropBucket = void 0;
const dropbucket_html_1 = require("./dropbucket.html");
const ko = require("knockout");
const Utils = require("@paperbits/common/utils");
const ui_1 = require("@paperbits/common/ui");
const events_1 = require("@paperbits/common/events");
const dropbucketItem_1 = require("./dropbucketItem");
const decorators_1 = require("@paperbits/common/ko/decorators");
let DropBucket = class DropBucket {
    constructor(globalEventHandler, eventManager, mediaService, dropHandlers, viewManager, widgetService) {
        this.globalEventHandler = globalEventHandler;
        this.eventManager = eventManager;
        this.mediaService = mediaService;
        this.dropHandlers = dropHandlers;
        this.viewManager = viewManager;
        this.widgetService = widgetService;
        this.onDragDrop = this.onDragDrop.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onPaste = this.onPaste.bind(this);
        this.addPendingContent = this.addPendingContent.bind(this);
        this.uploadContentAsMedia = this.uploadContentAsMedia.bind(this);
        this.discardDroppedContent = this.discardDroppedContent.bind(this);
        this.handleDroppedContent = this.handleDroppedContent.bind(this);
        this.handleUnknownContent = this.handleUnknownContent.bind(this);
        this.globalEventHandler.addDragDropListener(this.onDragDrop);
        this.dropHandlers = dropHandlers;
        this.droppedItems = ko.observableArray();
    }
    canHandleDrop(event) {
        return (event.dataTransfer.files && event.dataTransfer.files.length > 0) || event.dataTransfer.getData("url").length > 0;
    }
    addPendingContent(item) {
        this.droppedItems.push(item);
    }
    handleDroppedContent(contentDescriptor) {
        return __awaiter(this, void 0, void 0, function* () {
            const dropbucketItem = new dropbucketItem_1.DropBucketItem();
            dropbucketItem.title = contentDescriptor.title;
            dropbucketItem.description = contentDescriptor.description;
            if (contentDescriptor.getWidgetOrder) {
                const widgetOrder = yield contentDescriptor.getWidgetOrder();
                dropbucketItem.widgetOrder(widgetOrder);
            }
            dropbucketItem.thumbnailUrl(contentDescriptor.iconUrl);
            if (contentDescriptor.getThumbnailUrl) {
                contentDescriptor.getThumbnailUrl().then(thumbnailUrl => {
                    dropbucketItem.previewUrl(thumbnailUrl);
                    dropbucketItem.thumbnailUrl(thumbnailUrl);
                });
            }
            if (contentDescriptor.uploadables && contentDescriptor.uploadables.length) {
                for (const uploadable of contentDescriptor.uploadables) {
                    dropbucketItem.uploadables.push(uploadable);
                }
            }
            this.addPendingContent(dropbucketItem);
        });
    }
    onDragDrop(event) {
        if (this.viewManager.mode === ui_1.ViewManagerMode.preview) {
            return;
        }
        if (!this.canHandleDrop(event)) {
            return;
        }
        this.droppedItems.removeAll();
        const dataTransfer = event.dataTransfer;
        const files = Array.prototype.slice.call(dataTransfer.files);
        let items;
        if (dataTransfer.files.length > 0) {
            items = [];
            for (const file of files) {
                items.push({
                    source: file,
                    name: file.name,
                    mimeType: file.type
                });
            }
        }
        else {
            const urlData = dataTransfer.getData("url");
            const parts = urlData.split("/");
            items = [{
                    source: urlData,
                    name: parts[parts.length - 1]
                }];
        }
        for (const item of items) {
            let handled = false;
            let contentDescriptor = null;
            let j = 0;
            while (contentDescriptor === null && j < this.dropHandlers.length) {
                contentDescriptor = this.dropHandlers[j].getContentDescriptorFromDataTransfer(item);
                if (contentDescriptor) {
                    this.handleDroppedContent(contentDescriptor);
                    handled = true;
                }
                j++;
            }
            if (!handled) {
                this.handleUnknownContent(dataTransfer);
            }
        }
    }
    onPaste(event) {
        this.droppedItems.removeAll();
        const text = event.clipboardData.getData("text");
        let i = 0;
        let contentDescriptor = null;
        while (contentDescriptor === null && i < this.dropHandlers.length) {
            contentDescriptor = this.dropHandlers[i].getContentDescriptorFromDataTransfer({
                source: text,
                name: text.split("/").pop().split("?")[0]
            });
            if (contentDescriptor) {
                this.handleDroppedContent(contentDescriptor);
            }
            i++;
        }
    }
    handleUnknownContent(dataTransfer) {
        if (dataTransfer.files.length === 0) {
            return;
        }
        let title = "File";
        let description = dataTransfer.files[0].name;
        if (dataTransfer.files.length > 1) {
            title = `${dataTransfer.files.length} files`;
            description = "";
        }
        const files = Array.prototype.slice.call(dataTransfer.files);
        const dropbucketItem = new dropbucketItem_1.DropBucketItem();
        const uploadables = [];
        for (const file of files) {
            uploadables.push(file);
        }
        dropbucketItem.title = title;
        dropbucketItem.description = description;
        dropbucketItem.uploadables(uploadables);
        this.addPendingContent(dropbucketItem);
    }
    onDragStart(item) {
        if (this.viewManager.mode == ui_1.ViewManagerMode.preview) {
            return;
        }
        item.widgetFactoryResult = item.widgetOrder().createWidget();
        const widgetElement = item.widgetFactoryResult.element;
        const widgetModel = item.widgetFactoryResult.widgetModel;
        const widgetBinding = item.widgetFactoryResult.widgetBinding;
        this.droppedItems.remove(item);
        this.viewManager.beginDrag({
            sourceModel: widgetModel,
            sourceBinding: widgetBinding
        });
        return widgetElement;
    }
    onDragEnd(dropbucketItem) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.viewManager.mode === ui_1.ViewManagerMode.preview) {
                return;
            }
            dropbucketItem.widgetFactoryResult.element.remove();
            this.droppedItems.remove(dropbucketItem);
            const uploadables = dropbucketItem.uploadables();
            if (uploadables && uploadables.length > 0) {
                this.uploadContentAsMedia(dropbucketItem);
                this.droppedItems.remove(dropbucketItem);
            }
            const dragSession = this.viewManager.getDragSession();
            const acceptorBinding = dragSession.targetBinding;
            if (acceptorBinding && acceptorBinding.handler) {
                const widgetHandler = this.widgetService.getWidgetHandler(acceptorBinding.handler);
                widgetHandler.onDragDrop(dragSession);
            }
            this.eventManager.dispatchEvent("virtualDragEnd");
        });
    }
    uploadContentAsMedia(dropbucketItem) {
        return __awaiter(this, void 0, void 0, function* () {
            const uploadables = dropbucketItem.uploadables();
            this.droppedItems.remove(dropbucketItem);
            uploadables.forEach((uploadable) => __awaiter(this, void 0, void 0, function* () {
                let uploadPromise;
                if (typeof uploadable === "string") {
                    const name = uploadable.split("/").pop().split("?")[0];
                    uploadPromise = Utils.downloadFile(uploadable).then(blob => this.mediaService.createMedia(name, blob));
                    this.viewManager.notifyProgress(uploadPromise, "Media library", `Uploading ${uploadable}...`);
                }
                else {
                    const content = yield Utils.readFileAsByteArray(uploadable);
                    uploadPromise = this.mediaService.createMedia(uploadable.name, content, uploadable.type);
                    this.viewManager.notifyProgress(uploadPromise, "Media library", `Uploading ${uploadable.name}...`);
                }
            }));
        });
    }
    discardDroppedContent() {
        this.droppedItems.removeAll();
    }
};
DropBucket = __decorate([
    decorators_1.Component({
        selector: "dropbucket",
        template: dropbucket_html_1.default
    }),
    __metadata("design:paramtypes", [events_1.GlobalEventHandler, Object, Object, Array, Object, Object])
], DropBucket);
exports.DropBucket = DropBucket;
//# sourceMappingURL=dropbucket.js.map