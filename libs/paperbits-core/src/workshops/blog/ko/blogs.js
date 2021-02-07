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
exports.BlogWorkshop = void 0;
const ko = require("knockout");
const blogs_html_1 = require("./blogs.html");
const keyboard_1 = require("@paperbits/common/keyboard");
const decorators_1 = require("@paperbits/common/ko/decorators");
const blogPostItem_1 = require("./blogPostItem");
const consts_1 = require("@paperbits/common/ko/consts");
let BlogWorkshop = class BlogWorkshop {
    constructor(blogService, router, viewManager) {
        this.blogService = blogService;
        this.router = router;
        this.viewManager = viewManager;
        this.blogPosts = ko.observableArray();
        this.selectedBlogPost = ko.observable();
        this.searchPattern = ko.observable("");
        this.working = ko.observable();
    }
    initialize() {
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
            const blogposts = yield this.blogService.search(searchPattern);
            const blogpostItems = blogposts.map(blogPost => new blogPostItem_1.BlogPostItem(blogPost));
            this.blogPosts(blogpostItems);
            this.working(false);
        });
    }
    selectBlogPost(blogPostItem) {
        const prev = this.selectedBlogPost();
        this.selectedBlogPost(blogPostItem);
        const view = {
            heading: "Blog post",
            component: {
                name: "blog-post-details-workshop",
                params: {
                    blogPostItem: blogPostItem,
                    onDeleteCallback: () => {
                        this.searchPosts();
                    }
                }
            }
        };
        this.viewManager.openViewAsWorkshop(view);
    }
    addBlogPost() {
        return __awaiter(this, void 0, void 0, function* () {
            this.working(true);
            const postUrl = "/blog/new";
            const post = yield this.blogService.createBlogPost(postUrl, "New blog post", "", "");
            const postItem = new blogPostItem_1.BlogPostItem(post);
            this.blogPosts.push(postItem);
            this.selectBlogPost(postItem);
            this.working(false);
        });
    }
    deleteSelectedBlogPost() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.blogService.deleteBlogPost(this.selectedBlogPost().toBlogPost());
            this.router.navigateTo("/");
        });
    }
    keydown(item, event) {
        if (event.keyCode === keyboard_1.Keys.Delete) {
            this.deleteSelectedBlogPost();
        }
    }
};
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlogWorkshop.prototype, "initialize", null);
BlogWorkshop = __decorate([
    decorators_1.Component({
        selector: "blogs",
        template: blogs_html_1.default
    }),
    __metadata("design:paramtypes", [Object, Object, Object])
], BlogWorkshop);
exports.BlogWorkshop = BlogWorkshop;
//# sourceMappingURL=blogs.js.map