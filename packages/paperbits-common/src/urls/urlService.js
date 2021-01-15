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
exports.UrlService = void 0;
const Utils = require("../utils");
const urlsPath = "urls";
class UrlService {
    constructor(objectStorage) {
        this.objectStorage = objectStorage;
    }
    getUrlByKey(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.objectStorage.getObject(key);
        });
    }
    convertPage(pageOfUrls) {
        const resultPage = {
            value: pageOfUrls.value,
            takeNext: () => __awaiter(this, void 0, void 0, function* () {
                const nextLocalizedPage = yield pageOfUrls.takeNext();
                return this.convertPage(nextLocalizedPage);
            })
        };
        if (!pageOfUrls.takeNext) {
            resultPage.takeNext = null;
        }
        return resultPage;
    }
    search(query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!query) {
                throw new Error(`Parameter "query" not specified.`);
            }
            try {
                const pageOfResults = yield this.objectStorage.searchObjects(urlsPath, query);
                return this.convertPage(pageOfResults);
            }
            catch (error) {
                throw new Error(`Unable to search url: ${error.stack || error.message}`);
            }
        });
    }
    deleteUrl(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteUrlPromise = this.objectStorage.deleteObject(url.key);
            yield Promise.all([deleteUrlPromise]);
        });
    }
    createUrl(permalink, title, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = `${urlsPath}/${Utils.guid()}`;
            const contract = {
                key: key,
                title: title,
                description: description,
                permalink: permalink
            };
            yield this.objectStorage.addObject(key, contract);
            return contract;
        });
    }
    updateUrl(url) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.objectStorage.updateObject(url.key, url);
        });
    }
}
exports.UrlService = UrlService;
//# sourceMappingURL=urlService.js.map