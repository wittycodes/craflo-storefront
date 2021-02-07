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
exports.NavigationDetailsWorkshop = void 0;
const ko = require("knockout");
const navigationDetails_html_1 = require("./navigationDetails.html");
const navigationItemViewModel_1 = require("./navigationItemViewModel");
const decorators_1 = require("@paperbits/common/ko/decorators");
let NavigationDetailsWorkshop = class NavigationDetailsWorkshop {
    constructor(permalinkResolver, viewManager) {
        this.permalinkResolver = permalinkResolver;
        this.viewManager = viewManager;
        this.deleteNavigationItem = this.deleteNavigationItem.bind(this);
        this.onHyperlinkChange = this.onHyperlinkChange.bind(this);
        this.hyperlink = ko.observable();
        this.hyperlinkTitle = ko.pureComputed(() => {
            const hyperlink = this.hyperlink();
            if (hyperlink) {
                return `${hyperlink.title}`;
            }
            return "Click to select a link...";
        });
    }
    onMounted() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.navigationItem.targetKey()) {
                this.init(this.navigationItem.targetKey());
            }
        });
    }
    init(targetKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const hyperlink = yield this.permalinkResolver.getHyperlinkByTargetKey(targetKey);
            hyperlink.target = this.navigationItem.targetWindow();
            this.hyperlink(hyperlink);
        });
    }
    onHyperlinkChange(hyperlink) {
        this.hyperlink(hyperlink);
        const targetKey = hyperlink ? hyperlink.targetKey : null;
        this.navigationItem.targetKey(targetKey);
        this.navigationItem.targetWindow(hyperlink.target);
    }
    deleteNavigationItem() {
        this.navigationItem.remove();
        this.viewManager.notifySuccess("Navigation", `Navigation item "${this.navigationItem.label()}" was deleted.`);
        this.viewManager.closeWorkshop("navigation-details-workshop");
        if (this.onDelete) {
            this.onDelete();
        }
    }
};
__decorate([
    decorators_1.Event(),
    __metadata("design:type", Function)
], NavigationDetailsWorkshop.prototype, "onDelete", void 0);
__decorate([
    decorators_1.Param(),
    __metadata("design:type", navigationItemViewModel_1.NavigationItemViewModel)
], NavigationDetailsWorkshop.prototype, "navigationItem", void 0);
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NavigationDetailsWorkshop.prototype, "onMounted", null);
NavigationDetailsWorkshop = __decorate([
    decorators_1.Component({
        selector: "navigation-details-workshop",
        template: navigationDetails_html_1.default
    }),
    __metadata("design:paramtypes", [Object, Object])
], NavigationDetailsWorkshop);
exports.NavigationDetailsWorkshop = NavigationDetailsWorkshop;
//# sourceMappingURL=navigationDetails.js.map