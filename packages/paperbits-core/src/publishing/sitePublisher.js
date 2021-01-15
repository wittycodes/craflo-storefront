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
exports.SitePublisher = void 0;
const Utils = require("@paperbits/common/utils");
class SitePublisher {
    constructor(publishers, logger, sitemapBuilder, searchIndexBuilder, outputBlobStorage, changeCommitter) {
        this.publishers = publishers;
        this.logger = logger;
        this.sitemapBuilder = sitemapBuilder;
        this.searchIndexBuilder = searchIndexBuilder;
        this.outputBlobStorage = outputBlobStorage;
        this.changeCommitter = changeCommitter;
    }
    publish() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.trackEvent("Publishing", { message: `Publishing website...` });
                for (const publisher of this.publishers) {
                    yield publisher.publish();
                }
                const sitemapXml = yield this.sitemapBuilder.buildSitemap();
                const sitemapXmlBytes = Utils.stringToUnit8Array(sitemapXml);
                yield this.outputBlobStorage.uploadBlob("sitemap.xml", sitemapXmlBytes, "text/xml");
                const searchIndex = yield this.searchIndexBuilder.buildIndex();
                const searchIndexBytes = Utils.stringToUnit8Array(searchIndex);
                yield this.outputBlobStorage.uploadBlob("search-index.json", searchIndexBytes, "application/json");
                yield this.changeCommitter.commit();
                this.logger.trackEvent("Publishing", { message: `Website published successfully.` });
            }
            catch (error) {
                throw new Error(`Unable to complete publishing. ${error.stack || error.message}`);
            }
        });
    }
}
exports.SitePublisher = SitePublisher;
//# sourceMappingURL=sitePublisher.js.map