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
exports.KnockoutHtmlPagePublisherPlugin = void 0;
const ko = require("knockout");
class KnockoutHtmlPagePublisherPlugin {
    constructor(contentViewModelBinder, layoutService) {
        this.contentViewModelBinder = contentViewModelBinder;
        this.layoutService = layoutService;
        ko.tasks.scheduler = (callback) => setImmediate(callback);
    }
    render(doc, layoutContentViewModel) {
        return new Promise((resolve, reject) => {
            try {
                const onDescendantsComplete = () => {
                    resolve();
                };
                ko.applyBindingsToNode(doc.body, {
                    widget: layoutContentViewModel,
                    descendantsComplete: onDescendantsComplete,
                }, null);
            }
            catch (error) {
                reject(`Unable to apply knockout bindings to a template: ${error.stack || error.message}`);
            }
        });
    }
    apply(doc, page) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const layoutContract = yield this.layoutService.getLayoutByPermalink(page.permalink, (_a = page.bindingContext) === null || _a === void 0 ? void 0 : _a.locale);
            if (!layoutContract) {
                throw new Error(`No matching layouts found for page with permalink "${page.permalink}".`);
            }
            const layoutContentContract = yield this.layoutService.getLayoutContent(layoutContract.key, (_b = page.bindingContext) === null || _b === void 0 ? void 0 : _b.locale);
            const layoutContentViewModel = yield this.contentViewModelBinder.getContentViewModelByKey(layoutContentContract, page.bindingContext);
            yield this.render(doc, layoutContentViewModel);
        });
    }
}
exports.KnockoutHtmlPagePublisherPlugin = KnockoutHtmlPagePublisherPlugin;
//# sourceMappingURL=knockoutHtmlPagePublisherPlugin.js.map