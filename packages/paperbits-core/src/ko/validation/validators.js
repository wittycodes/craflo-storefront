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
exports.KnockoutValidation = void 0;
const ko = require("knockout");
const validation = require("knockout.validation");
const errorClassName = "is-invalid";
class KnockoutValidation {
    constructor(permalinkService, permalinkResolver, layoutService, reservedPermalinks) {
        this.permalinkService = permalinkService;
        this.permalinkResolver = permalinkResolver;
        this.layoutService = layoutService;
        this.reservedPermalinks = reservedPermalinks;
        validation.init({
            errorElementClass: errorClassName,
            decorateInputElement: true,
            insertMessages: false
        }, true);
        ko.extenders["onlyValid"] = (target, option) => {
            const resultObservable = ko.observable(target());
            target.subscribe((newValue) => {
                if (target.isValidating && target.isValidating()) {
                    const subscription = target.isValidating.subscribe(v => {
                        subscription.dispose();
                        if (target.isValid()) {
                            resultObservable(newValue);
                        }
                    });
                }
                else {
                    if (target.isValid()) {
                        resultObservable(newValue);
                    }
                }
            });
            return resultObservable;
        };
        validation.rules["validPermalink"] = {
            async: true,
            validator: (permalink, targetKey, callback) => __awaiter(this, void 0, void 0, function* () {
                if (!permalink) {
                    return false;
                }
                const permalinkContract = yield this.permalinkService.getPermalink(permalink);
                const inUseByAnoterResource = !!permalinkContract && permalinkContract.targetKey !== targetKey;
                callback(!inUseByAnoterResource);
            }),
            message: "This permalink is reserved or already in use."
        };
        validation.rules["uniqueLayoutUri"] = {
            async: true,
            validator: (permalinkTemplate, layoutKey, callback) => __awaiter(this, void 0, void 0, function* () {
                if (!permalinkTemplate) {
                    callback(false);
                    return;
                }
                const layout = yield this.layoutService.getLayoutByPermalinkTemplate(permalinkTemplate);
                const conflict = layout && layout.key !== layoutKey;
                callback(!conflict);
            }),
            message: "This permalink template is already in use."
        };
        validation.registerExtenders();
    }
}
exports.KnockoutValidation = KnockoutValidation;
//# sourceMappingURL=validators.js.map