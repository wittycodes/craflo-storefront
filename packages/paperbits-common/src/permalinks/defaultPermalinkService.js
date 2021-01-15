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
exports.DefaultPermalinkService = void 0;
class DefaultPermalinkService {
    constructor(permalinkResolver, reservedPermalinks) {
        this.permalinkResolver = permalinkResolver;
        this.reservedPermalinks = reservedPermalinks;
    }
    isPermalinkDefined(permalink) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!permalink) {
                return false;
            }
            if (this.reservedPermalinks.includes(permalink)) {
                return true;
            }
            const contentItem = yield this.permalinkResolver.getContentItemByPermalink(permalink);
            return !contentItem;
        });
    }
    getPermalink(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            const contentItem = yield this.permalinkResolver.getContentItemByPermalink(uri);
            if (!contentItem) {
                return null;
            }
            const contract = {
                key: "",
                uri: uri,
                targetKey: contentItem.key
            };
            return contract;
        });
    }
}
exports.DefaultPermalinkService = DefaultPermalinkService;
//# sourceMappingURL=defaultPermalinkService.js.map