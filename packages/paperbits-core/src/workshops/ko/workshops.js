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
exports.Workshops = void 0;
const ko = require("knockout");
const workshops_html_1 = require("./workshops.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
let Workshops = class Workshops {
    constructor(viewManager, userService, workshopSections) {
        this.viewManager = viewManager;
        this.userService = userService;
        this.workshopSections = workshopSections;
        this.userPhotoUrl = ko.observable(null);
        this.resizing = ko.pureComputed(() => this.viewManager.journeyName() ? "vertically horizontally" : "vertically horizontally suspended");
        this.sections = ko.observableArray(this.workshopSections);
    }
    loadUserProfile() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = yield this.userService.getUserPhotoUrl();
            this.userPhotoUrl(url);
        });
    }
    closeWorkshop(view) {
        this.viewManager.closeWorkshop(view);
    }
};
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Workshops.prototype, "loadUserProfile", null);
Workshops = __decorate([
    decorators_1.Component({
        selector: "workshops",
        template: workshops_html_1.default
    }),
    __metadata("design:paramtypes", [Object, Object, Array])
], Workshops);
exports.Workshops = Workshops;
//# sourceMappingURL=workshops.js.map