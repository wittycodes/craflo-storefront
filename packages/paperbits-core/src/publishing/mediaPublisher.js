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
exports.MediaPublisher = void 0;
const await_parallel_limit_1 = require("await-parallel-limit");
const constants_1 = require("@paperbits/common/constants");
const persistence_1 = require("@paperbits/common/persistence");
class MediaPublisher {
    constructor(mediaService, blobStorage, outputBlobStorage, httpClient, logger) {
        this.mediaService = mediaService;
        this.blobStorage = blobStorage;
        this.outputBlobStorage = outputBlobStorage;
        this.httpClient = httpClient;
        this.logger = logger;
    }
    publishFromUrl(mediaFile) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.trackEvent("Publishing", { message: `Publishing media ${mediaFile.fileName} from URL...` });
            let response;
            try {
                response = yield this.httpClient.send({ url: mediaFile.downloadUrl });
            }
            catch (error) {
                this.logger.trackEvent("Publishing", { message: `Could not download media from URL ${mediaFile.downloadUrl}. ${error.stack || error.message}` });
                return null;
            }
            if ((response === null || response === void 0 ? void 0 : response.statusCode) !== 200) {
                this.logger.trackEvent("Publishing", { message: `Could not download media from URL ${mediaFile.downloadUrl}. Status code: ${response === null || response === void 0 ? void 0 : response.statusCode}` });
                return null;
            }
            const content = response.toByteArray();
            yield this.uploadToStorage(mediaFile.permalink, content, mediaFile.mimeType);
        });
    }
    publishFromStorage(mediaFile) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.trackEvent("Publishing", { message: `Publishing media ${mediaFile.fileName} from storage...` });
            let content;
            try {
                content = yield this.blobStorage.downloadBlob(mediaFile.blobKey);
            }
            catch (error) {
                this.logger.trackEvent("Publishing", { message: `Could not download media ${mediaFile.blobKey} from source storage. ${error.stack || error.message}` });
                return null;
            }
            if (!content) {
                this.logger.trackEvent("Publishing", { message: `Blob with key ${mediaFile.blobKey} not found in source storage.` });
                return null;
            }
            yield this.uploadToStorage(mediaFile.permalink, content, mediaFile.mimeType);
        });
    }
    uploadToStorage(key, content, mimeType) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.outputBlobStorage.uploadBlob(key, content, mimeType);
            }
            catch (error) {
                throw new Error(`Unable to upload media file to destination storage. ${error.stack || error.message}`);
            }
        });
    }
    renderMediaFile(mediaFile) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mediaFile.permalink) {
                this.logger.trackEvent("Publishing", { message: `Skipping media with no permalink specified: "${mediaFile.fileName}".` });
                return;
            }
            if (!mediaFile.blobKey && !mediaFile.downloadUrl) {
                this.logger.trackEvent("Publishing", { message: `Skipping media with no blob key or download URL specified: ${mediaFile.fileName}.` });
                return;
            }
            if (mediaFile.blobKey) {
                yield this.publishFromStorage(mediaFile);
                return;
            }
            if (mediaFile.downloadUrl) {
                yield this.publishFromUrl(mediaFile);
                return;
            }
        });
    }
    publish() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = persistence_1.Query.from();
            let pagesOfResults = yield this.mediaService.search(query);
            do {
                const tasks = [];
                const mediaFiles = pagesOfResults.value;
                for (const mediaFile of mediaFiles) {
                    tasks.push(() => this.renderMediaFile(mediaFile));
                }
                yield await_parallel_limit_1.default(tasks, constants_1.maxParallelPublisingTasks);
                if (pagesOfResults.takeNext) {
                    pagesOfResults = yield pagesOfResults.takeNext();
                }
                else {
                    pagesOfResults = null;
                }
            } while (pagesOfResults);
        });
    }
}
exports.MediaPublisher = MediaPublisher;
//# sourceMappingURL=mediaPublisher.js.map