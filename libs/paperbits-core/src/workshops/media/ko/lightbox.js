"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lightbox = void 0;
const basicLightbox = require("basiclightbox");
class Lightbox {
    show(url, fileName) {
        const lightbox = basicLightbox.create(`
            <img class="lightbox-img" src="${url}">
            <div class="lightbox-title">${fileName}</div>
        `);
        lightbox.show();
    }
}
exports.Lightbox = Lightbox;
//# sourceMappingURL=lightbox.js.map