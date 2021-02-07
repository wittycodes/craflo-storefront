"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchIndexBuilder = void 0;
const lunr = require("lunr");
const h2p = require("html2plaintext");
class SearchIndexBuilder {
    constructor() {
        this.documents = [];
    }
    getIndexerConfigFunc(documents) {
        return function () {
            this.ref("permalink");
            this.field("title");
            this.field("description");
            this.field("body");
            documents.forEach(document => this.add(document), this);
        };
    }
    appendPage(permalink, title, description, body) {
        try {
            const regex = /<main.*>([\s\S]*)<\/main>/g;
            const match = regex.exec(body);
            if (!match || match.length < 1) {
                return;
            }
            const mainContent = match[1];
            this.documents.push({
                permalink: permalink,
                title: title,
                description: description,
                body: h2p(mainContent)
            });
        }
        catch (error) {
            throw new Error(`Unable to index content for ${permalink}: ${error.stack || error.message}`);
        }
    }
    buildIndex() {
        try {
            const index = lunr(this.getIndexerConfigFunc(this.documents));
            return JSON.stringify(index);
        }
        catch (error) {
            throw new Error(`Unable to build search index: ${error.stack || error.message}`);
        }
    }
}
exports.SearchIndexBuilder = SearchIndexBuilder;
//# sourceMappingURL=searchIndexBuilder.js.map