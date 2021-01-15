"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResponse = void 0;
class HttpResponse {
    constructor() {
        this.headers = [];
    }
    toByteArray() {
        return this.body;
    }
    toObject() {
        try {
            const decodedString = this.utf8ArrayToStr(this.body);
            return JSON.parse(decodedString.trim());
        }
        catch (error) {
            throw new Error(error);
        }
    }
    toText() {
        const decodedString = this.utf8ArrayToStr(this.body);
        return decodedString.trim();
    }
    utf8ArrayToStr(array) {
        let out, i, len, c;
        let char2, char3;
        out = "";
        len = array.length;
        i = 0;
        while (i < len) {
            c = array[i++];
            switch (c >> 4) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    out += String.fromCharCode(c);
                    break;
                case 12:
                case 13:
                    char2 = array[i++];
                    out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                    break;
                case 14:
                    char2 = array[i++];
                    char3 = array[i++];
                    out += String.fromCharCode(((c & 0x0F) << 12) |
                        ((char2 & 0x3F) << 6) |
                        ((char3 & 0x3F) << 0));
                    break;
            }
        }
        return out;
    }
}
exports.HttpResponse = HttpResponse;
//# sourceMappingURL=httpResponse.js.map