"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageDesignModule = void 0;
const pages_1 = require("./pages");
const pageDetails_1 = require("./pageDetails");
const pageSelector_1 = require("./pageSelector");
const pages_2 = require("@paperbits/common/pages");
const browserNotSupported_1 = require("./browserNotSupported");
const pageHost_1 = require("./pageHost");
const pagesToolButton_1 = require("./pagesToolButton");
class PageDesignModule {
    register(injector) {
        injector.bind("browserNotSupported", browserNotSupported_1.BrowserNotSupported);
        injector.bind("pageHost", pageHost_1.PageHost);
        injector.bind("pagesWorkshop", pages_1.PagesWorkshop);
        injector.bind("pageDetailsWorkshop", pageDetails_1.PageDetailsWorkshop);
        injector.bind("pageSelector", pageSelector_1.PageSelector);
        injector.bindToCollection("hyperlinkProviders", pages_2.PageHyperlinkProvider);
        injector.bindToCollection("workshopSections", pagesToolButton_1.PagesToolButton);
        injector.bind("pageHyperlinkProvider", pages_2.PageHyperlinkProvider);
    }
}
exports.PageDesignModule = PageDesignModule;
//# sourceMappingURL=page.design.module.js.map