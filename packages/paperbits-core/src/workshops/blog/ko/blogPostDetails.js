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
exports.BlogPostDetailsWorkshop = void 0;
const ko = require("knockout");
const blogPostDetails_html_1 = require("./blogPostDetails.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
const blogPostItem_1 = require("./blogPostItem");
let BlogPostDetailsWorkshop = class BlogPostDetailsWorkshop {
    constructor(blogService, router, viewManager, reservedPermalinks) {
        this.blogService = blogService;
        this.router = router;
        this.viewManager = viewManager;
        this.reservedPermalinks = reservedPermalinks;
        this.isReserved = ko.observable(false);
    }
    onMounted() {
        return __awaiter(this, void 0, void 0, function* () {
            this.blogPostItem.title
                .extend({ required: true })
                .subscribe(this.updateBlogPost);
            this.blogPostItem.description
                .subscribe(this.updateBlogPost);
            this.blogPostItem.keywords
                .subscribe(this.updateBlogPost);
            this.blogPostItem.permalink
                .extend({ validPermalink: this.blogPostItem.permalink, required: true, onlyValid: true })
                .subscribe(this.updatePermlaink);
            let validPermalink = this.blogPostItem.permalink;
            if (this.reservedPermalinks.includes(this.blogPostItem.permalink())) {
                this.isReserved(true);
            }
            else {
                validPermalink = validPermalink.extend({ required: true, validPermalink: this.blogPostItem.key, onlyValid: true });
                validPermalink.subscribe(this.updatePermlaink);
            }
            yield this.router.navigateTo(validPermalink());
            this.viewManager.setHost({ name: "blog-post-host" });
        });
    }
    updateBlogPost() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.blogPostItem.title.isValid()) {
                yield this.blogService.updateBlogPost(this.blogPostItem.toBlogPost());
            }
        });
    }
    updatePermlaink() {
        return __awaiter(this, void 0, void 0, function* () {
            const permalink = this.blogPostItem.permalink();
            this.router.notifyListeners = false;
            this.router.notifyListeners = true;
            this.updateBlogPost();
        });
    }
    deleteBlogPost() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.blogService.deleteBlogPost(this.blogPostItem.toBlogPost());
            this.viewManager.notifySuccess("Blog", `Post "${this.blogPostItem.title()}" was deleted.`);
            this.viewManager.closeWorkshop("blog-post-details-workshop");
            if (this.onDeleteCallback) {
                this.onDeleteCallback();
            }
            this.router.navigateTo("/");
        });
    }
};
__decorate([
    decorators_1.Param(),
    __metadata("design:type", blogPostItem_1.BlogPostItem)
], BlogPostDetailsWorkshop.prototype, "blogPostItem", void 0);
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], BlogPostDetailsWorkshop.prototype, "onDeleteCallback", void 0);
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlogPostDetailsWorkshop.prototype, "onMounted", null);
BlogPostDetailsWorkshop = __decorate([
    decorators_1.Component({
        selector: "blog-post-details-workshop",
        template: blogPostDetails_html_1.default
    }),
    __metadata("design:paramtypes", [Object, Object, Object, Array])
], BlogPostDetailsWorkshop);
exports.BlogPostDetailsWorkshop = BlogPostDetailsWorkshop;
//# sourceMappingURL=blogPostDetails.js.map