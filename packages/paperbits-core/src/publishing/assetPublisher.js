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
exports.AssetPublisher = void 0;
const fs = require("fs");
const path = require("path");
const mime = require("mime");
const assetsBaseBath = path.resolve(__dirname, "./assets");
class AssetPublisher {
    constructor(outputBlobStorage) {
        this.outputBlobStorage = outputBlobStorage;
    }
    copyAssetFrom(assetPath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const byteArray = yield this.downloadBlob(assetPath);
                const fileName = assetPath.split("/").pop();
                const contentType = mime.getType(fileName) || "application/octet-stream";
                yield this.outputBlobStorage.uploadBlob(assetPath, byteArray, contentType);
            }
            catch (error) {
                console.log(assetPath + " assets error:" + error);
            }
        });
    }
    copyAssets() {
        return __awaiter(this, void 0, void 0, function* () {
            const assetPaths = yield this.listAssests();
            if (assetPaths.length > 0) {
                const copyPromises = assetPaths.map(assetPath => this.copyAssetFrom(assetPath));
                yield Promise.all(copyPromises);
            }
        });
    }
    listAssests() {
        return __awaiter(this, void 0, void 0, function* () {
            const files = this.listAllFilesInDirectory(assetsBaseBath);
            if (files.length > 0) {
                return files.map(file => file.split(assetsBaseBath).pop());
            }
            return [];
        });
    }
    downloadBlob(blobPath) {
        return new Promise((resolve, reject) => {
            const fullpath = `${assetsBaseBath}/${blobPath}`.replace("//", "/");
            fs.readFile(fullpath, (error, buffer) => {
                if (error) {
                    reject(error);
                    return;
                }
                const arrayBuffer = new ArrayBuffer(buffer.length);
                const unit8Array = new Uint8Array(arrayBuffer);
                for (let i = 0; i < buffer.length; ++i) {
                    unit8Array[i] = buffer[i];
                }
                resolve(unit8Array);
            });
        });
    }
    listAllFilesInDirectory(dir) {
        const results = [];
        try {
            fs.readdirSync(dir).forEach((file) => {
                file = dir + "/" + file;
                const stat = fs.statSync(file);
                if (stat && stat.isDirectory()) {
                    results.push(...this.listAllFilesInDirectory(file));
                }
                else {
                    results.push(file);
                }
            });
        }
        catch (error) {
            console.error(`Unable to list files :${error.stack || error.message}`);
        }
        return results;
    }
    publish() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!fs.existsSync(assetsBaseBath)) {
                console.warn(`Folder ${assetsBaseBath} doesn't exist. Copying assets will be skipped.`);
                return;
            }
            yield this.copyAssets();
        });
    }
}
exports.AssetPublisher = AssetPublisher;
//# sourceMappingURL=assetPublisher.js.map