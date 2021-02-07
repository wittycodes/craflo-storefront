"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaWorkshopModule = void 0;
const media_1 = require("./media");
const mediaDetails_1 = require("./mediaDetails");
const mediaSelector_1 = require("./mediaSelector");
const cropper_1 = require("../../cropper/cropper");
const mediaToolButton_1 = require("./mediaToolButton");
const media_2 = require("@paperbits/common/media");
class MediaWorkshopModule {
    register(injector) {
        injector.bind("mediaWorkshop", media_1.MediaWorkshop);
        injector.bind("mediaDetailsWorkshop", mediaDetails_1.MediaDetailsWorkshop);
        injector.bind("mediaSelector", mediaSelector_1.MediaSelector);
        injector.bind("pictureCropper", cropper_1.PictureCropper);
        injector.bindToCollection("hyperlinkProviders", media_2.MediaHyperlinkProvider);
        injector.bindToCollection("workshopSections", mediaToolButton_1.MediaToolButton);
    }
}
exports.MediaWorkshopModule = MediaWorkshopModule;
//# sourceMappingURL=media.module.js.map