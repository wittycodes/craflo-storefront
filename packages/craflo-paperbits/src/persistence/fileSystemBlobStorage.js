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
exports.FileSystemBlobStorage = void 0;
const fs = require("fs");
const path = require("path");
class FileSystemBlobStorage {
    constructor(basePath) {
        this.basePath = basePath;
    }
    uploadBlob(blobPath, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const fullpath = `${this.basePath}/${blobPath}`.replace("//", "/");
            try {
                yield fs.promises.mkdir(path.dirname(fullpath), { recursive: true });
                yield fs.promises.writeFile(fullpath, Buffer.from(content.buffer));
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    downloadBlob(blobPath) {
        return new Promise((resolve, reject) => {
            const fullpath = `${this.basePath}/${blobPath}`.replace("//", "/");
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
    listBlobs() {
        return __awaiter(this, void 0, void 0, function* () {
            const files = this.listAllFilesInDirectory(this.basePath);
            if (files.length > 0) {
                return files.map(file => file.split(this.basePath).pop());
            }
            return [];
        });
    }
    listAllFilesInDirectory(dir) {
        const results = [];
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
        return results;
    }
    getDownloadUrl(filename) {
        throw new Error("Not supported");
    }
    deleteBlob(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
}
exports.FileSystemBlobStorage = FileSystemBlobStorage;
