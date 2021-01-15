"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorePublishModule = void 0;
const assetPublisher_1 = require("./publishing/assetPublisher");
const pagePublisher_1 = require("./publishing/pagePublisher");
const sitePublisher_1 = require("./publishing/sitePublisher");
const mediaPublisher_1 = require("./publishing/mediaPublisher");
const mediaPermalinkResolver_publish_1 = require("@paperbits/common/media/mediaPermalinkResolver.publish");
const knockoutHtmlPagePublisherPlugin_1 = require("./publishing/knockoutHtmlPagePublisherPlugin");
const publishing_1 = require("@paperbits/common/publishing");
const caching_1 = require("@paperbits/common/caching");
const ko_1 = require("./map/ko");
const divider_publish_module_1 = require("./divider/divider.publish.module");
const carousel_publish_module_1 = require("./carousel/carousel.publish.module");
class CorePublishModule {
    register(injector) {
        injector.bindModule(new divider_publish_module_1.DividerPublishModule());
        injector.bindCollection("publishers");
        injector.bindToCollection("publishers", assetPublisher_1.AssetPublisher);
        injector.bindToCollection("publishers", mediaPublisher_1.MediaPublisher);
        injector.bindToCollection("publishers", pagePublisher_1.PagePublisher);
        injector.bindSingleton("sitePublisher", sitePublisher_1.SitePublisher);
        injector.bindSingleton("sitemapBuilder", publishing_1.SitemapBuilder);
        injector.bindSingleton("searchIndexBuilder", publishing_1.SearchIndexBuilder);
        injector.bindSingleton("htmlPagePublisher", publishing_1.HtmlPagePublisher);
        injector.bindSingleton("htmlPageOptimizer", publishing_1.HtmlPageOptimizer);
        injector.bindSingleton("htmlDocumentProvider", publishing_1.DominoHtmlDocumentProvider);
        injector.bindCollection("htmlPagePublisherPlugins");
        injector.bindToCollection("permalinkResolvers", mediaPermalinkResolver_publish_1.MediaPermalinkResolver, "mediaPermalinkResolver");
        injector.bindToCollection("htmlPagePublisherPlugins", knockoutHtmlPagePublisherPlugin_1.KnockoutHtmlPagePublisherPlugin);
        injector.bindToCollection("htmlPagePublisherPlugins", publishing_1.LinkedDataHtmlPagePublisherPlugin);
        injector.bindToCollection("htmlPagePublisherPlugins", publishing_1.OpenGraphHtmlPagePublisherPlugin);
        injector.bindToCollection("htmlPagePublisherPlugins", publishing_1.SocialShareDataHtmlPagePublisherPlugin);
        injector.bindInstance("changesCache", new caching_1.MemoryCache());
        injector.bindModule(new ko_1.MapPublishModule());
        injector.bindModule(new carousel_publish_module_1.CarouselPublishModule());
    }
}
exports.CorePublishModule = CorePublishModule;
//# sourceMappingURL=core.publish.module.js.map