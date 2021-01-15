"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PictureDesignModule = void 0;
const styleGuideCard_html_1 = require("./ko/styleGuideCard.html");
const pictureEditor_1 = require("./ko/pictureEditor");
const pictureHandlers_1 = require("./pictureHandlers");
class PictureDesignModule {
    register(injector) {
        injector.bind("pictureEditor", pictureEditor_1.PictureEditor);
        const styleGroup = {
            key: "picture",
            name: "components_picture",
            groupName: "Pictures",
            selectorTemplate: `<img src="https://cdn.paperbits.io/images/placeholder-340x190.jpg" alt="Picture" data-bind="css: classNames" width="280px" height="190px" /><div data-bind="text: displayName"></div>`,
            styleTemplate: styleGuideCard_html_1.default
        };
        injector.bindInstanceToCollection("styleGroups", styleGroup);
        injector.bindToCollection("widgetHandlers", pictureHandlers_1.PictureHandlers, "pictureWidgetHandler");
        injector.bindToCollection("dropHandlers", pictureHandlers_1.PictureHandlers, "pictureDropHandler");
    }
}
exports.PictureDesignModule = PictureDesignModule;
//# sourceMappingURL=picture.design.module.js.map