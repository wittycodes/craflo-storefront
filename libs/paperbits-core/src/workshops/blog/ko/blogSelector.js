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
exports.BlogSelector = void 0;
const ko = require("knockout");
const blogSelector_html_1 = require("./blogSelector.html");
const blogPostItem_1 = require("./blogPostItem");
const decorators_1 = require("@paperbits/common/ko/decorators");
const consts_1 = require("@paperbits/common/ko/consts");
let BlogSelector = class BlogSelector {
    constructor(blogService) {
        this.blogService = blogService;
        this.posts = ko.observableArray();
        this.selectedPost = ko.observable();
        this.searchPattern = ko.observable();
        this.working = ko.observable();
        this.posts = ko.observableArray();
        this.searchPattern = ko.observable();
        this.working = ko.observable();
    }
    onMounted() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.searchPosts();
            this.searchPattern
                .extend(consts_1.ChangeRateLimit)
                .subscribe(this.searchPosts);
        });
    }
    searchPosts(searchPattern = "") {
        return __awaiter(this, void 0, void 0, function* () {
            this.working(true);
            const blogs = yield this.blogService.search(searchPattern);
            const blogItems = blogs.map(blog => new blogPostItem_1.BlogPostItem(blog));
            this.posts(blogItems);
            this.working(false);
        });
    }
    selectPost(blogPost) {
        return __awaiter(this, void 0, void 0, function* () {
            this.selectedPost(blogPost);
            if (this.onSelect) {
                this.onSelect(blogPost.toBlogPost());
            }
            if (this.onHyperlinkSelect) {
                this.onHyperlinkSelect(blogPost.getHyperlink());
            }
        });
    }
};
__decorate([
    decorators_1.Param(),
    __metadata("design:type", Function)
], BlogSelector.prototype, "selectedPost", void 0);
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], BlogSelector.prototype, "onSelect", void 0);
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], BlogSelector.prototype, "onHyperlinkSelect", void 0);
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlogSelector.prototype, "onMounted", null);
BlogSelector = __decorate([
    decorators_1.Component({
        selector: "blog-selector",
        template: blogSelector_html_1.default
    }),
    __metadata("design:paramtypes", [Object])
], BlogSelector);
exports.BlogSelector = BlogSelector;
//# sourceMappingURL=blogSelector.js.map