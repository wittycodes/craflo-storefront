"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaHandlers = void 0;
class MediaHandlers {
    constructor(mediaTypePrefixes, fileExtensions) {
        this.mediaTypePrefixes = mediaTypePrefixes;
        this.fileExtensions = fileExtensions;
    }
    matches(dataTransfer) {
        if (dataTransfer.mimeType && !this.mediaTypePrefixes.some(m => dataTransfer.mimeType.startsWith(m))) {
            return false;
        }
        if (dataTransfer.name && !this.fileExtensions.some(e => dataTransfer.name.endsWith(e))) {
            return false;
        }
        return true;
    }
    getContentDescriptorFromDataTransfer(item) {
        return null;
    }
}
exports.MediaHandlers = MediaHandlers;
//# sourceMappingURL=mediaHandlers.js.map