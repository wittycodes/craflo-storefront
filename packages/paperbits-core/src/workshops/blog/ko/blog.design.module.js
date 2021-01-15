"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogDesignModule = void 0;
const _1 = require(".");
const blogs_1 = require("./blogs");
const blogPostDetails_1 = require("./blogPostDetails");
const blogSelector_1 = require("./blogSelector");
const blogToolButton_1 = require("./blogToolButton");
const blogs_2 = require("@paperbits/common/blogs");
class BlogDesignModule {
    register(injector) {
        injector.bind("blogHost", _1.BlogHost);
        injector.bind("blogWorkshop", blogs_1.BlogWorkshop);
        injector.bind("blogPostDetailsWorkshop", blogPostDetails_1.BlogPostDetailsWorkshop);
        injector.bind("blogSelector", blogSelector_1.BlogSelector);
        injector.bindToCollection("hyperlinkProviders", blogs_2.BlogHyperlinkProvider);
        injector.bindToCollection("workshopSections", blogToolButton_1.BlogWorkshopToolButton);
    }
}
exports.BlogDesignModule = BlogDesignModule;
//# sourceMappingURL=blog.design.module.js.map