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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestimonialsEditor = void 0;
const ko = require("knockout");
const testimonialsEditor_html_1 = require("./testimonialsEditor.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
const testimonialsModel_1 = require("../testimonialsModel");
let TestimonialsEditor = class TestimonialsEditor {
    constructor() {
        this.textContent = ko.observable();
        this.author = ko.observable();
        this.authorTitle = ko.observable();
        this.starsCount = ko.observable().extend({ max: 10 });
        this.starsMaximum = ko.observable().extend({ max: 10 });
    }
    initialize() {
        this.textContent(this.model.textContent);
        this.starsCount(this.model.starsCount);
        this.starsMaximum(this.model.allStarsCount);
        this.author(this.model.author);
        this.authorTitle(this.model.authorTitle);
        this.textContent.subscribe(this.applyChanges);
        this.starsCount.subscribe(this.applyChanges);
        this.starsMaximum.subscribe(this.applyChanges);
        this.author.subscribe(this.applyChanges);
        this.authorTitle.subscribe(this.applyChanges);
    }
    applyChanges() {
        this.model.textContent = this.textContent();
        this.model.starsCount = +this.starsCount();
        const count = +this.starsMaximum();
        this.model.allStarsCount = count <= 10 ? count : 10;
        this.model.author = this.author();
        this.model.authorTitle = this.authorTitle();
        this.onChange(this.model);
    }
};
__decorate([
    decorators_1.Param(),
    __metadata("design:type", testimonialsModel_1.TestimonialsModel)
], TestimonialsEditor.prototype, "model", void 0);
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], TestimonialsEditor.prototype, "onChange", void 0);
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TestimonialsEditor.prototype, "initialize", null);
TestimonialsEditor = __decorate([
    decorators_1.Component({
        selector: "testimonials-editor",
        template: testimonialsEditor_html_1.default
    }),
    __metadata("design:paramtypes", [])
], TestimonialsEditor);
exports.TestimonialsEditor = TestimonialsEditor;
//# sourceMappingURL=testimonialsEditor.js.map