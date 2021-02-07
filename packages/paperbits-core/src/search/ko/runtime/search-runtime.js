"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.SearchRuntime = void 0;
const lunr = require("lunr");
const ko = require("knockout");
const h2p = require("html2plaintext");
const search_runtime_html_1 = require("./search-runtime.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
const consts_1 = require("@paperbits/common/ko/consts");
let SearchRuntime = class SearchRuntime {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.searchPattern = ko.observable();
        this.results = ko.observableArray([]);
        this.hasResults = ko.observable(false);
    }
    loadIndex() {
        return __awaiter(this, void 0, void 0, function* () {
            const searchString = this.getUrlParameter("q");
            this.searchPattern(searchString);
            try {
                const response = yield this.httpClient.send({ url: "/search-index.json", method: "GET" });
                if (response.statusCode !== 200) {
                    return;
                }
                const indexData = response.toObject();
                this.index = lunr.Index.load(indexData);
                this.searchPattern
                    .extend(consts_1.ChangeRateLimit)
                    .subscribe(this.searchWebsite);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getUrlParameter(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
        const results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    searchWebsite() {
        this.hasResults(false);
        this.results([]);
        const query = this.searchPattern().trim();
        const searchRawResults = this.index.search(query);
        searchRawResults.slice(0, 5).forEach((result) => __awaiter(this, void 0, void 0, function* () {
            const searchTerm = Object.keys(result.matchData.metadata)[0];
            const search = yield this.fetchResults(searchTerm, result.ref);
            this.results.push(search);
        }));
        this.hasResults(true);
    }
    fetchResults(term, url) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.httpClient.send({
                url: url,
                method: "GET"
            });
            const text = response.toText();
            const el = document.createElement("div");
            el.innerHTML = text;
            const titleElement = el.querySelector("title");
            const title = titleElement.innerText.split("|")[0].trim();
            const bodyElement = el.querySelector("main");
            const body = h2p(bodyElement.innerHTML);
            const fragmentSize = 150;
            const index = body.toLowerCase().indexOf(term.toLowerCase());
            let startIndex = index - Math.floor(fragmentSize / 2);
            if (startIndex < 0) {
                startIndex = 0;
            }
            const fragment = `...${body.substring(startIndex, startIndex + fragmentSize)}...`;
            return {
                title: title,
                fragment: fragment,
                url: url
            };
        });
    }
};
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SearchRuntime.prototype, "loadIndex", null);
SearchRuntime = __decorate([
    decorators_1.RuntimeComponent({ selector: "search-runtime" }),
    decorators_1.Component({
        selector: "search-runtime",
        template: search_runtime_html_1.default
    }),
    __metadata("design:paramtypes", [Object])
], SearchRuntime);
exports.SearchRuntime = SearchRuntime;
//# sourceMappingURL=search-runtime.js.map