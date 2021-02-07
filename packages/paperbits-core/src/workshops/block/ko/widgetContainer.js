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
exports.WidgetContainer = void 0;
const ko = require("knockout");
const widgetContainer_html_1 = require("./widgetContainer.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
const jssCompiler_1 = require("@paperbits/styles/jssCompiler");
let WidgetContainer = class WidgetContainer {
    constructor(styleCompiler) {
        this.styleCompiler = styleCompiler;
        this.widgetViewModel = ko.observable();
        this.css = ko.observable();
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            const compiler = new jssCompiler_1.JssCompiler();
            setImmediate(() => __awaiter(this, void 0, void 0, function* () {
                const styleSheets = this.widgetData.styleManager.getAllStyleSheets();
                const localCss = compiler.compile(...styleSheets);
                const globalStyleSheet = yield this.styleCompiler.getStyleSheet();
                const globalCss = compiler.compile(globalStyleSheet);
                this.css(globalCss + " " + localCss);
            }));
            this.widgetViewModel(this.widgetData.widget);
        });
    }
};
__decorate([
    decorators_1.Param(),
    __metadata("design:type", Object)
], WidgetContainer.prototype, "widgetData", void 0);
__decorate([
    decorators_1.OnMounted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WidgetContainer.prototype, "initialize", null);
WidgetContainer = __decorate([
    decorators_1.Component({
        selector: "widget-container",
        template: widgetContainer_html_1.default,
        encapsulation: decorators_1.Encapsulation.shadowDom
    }),
    __metadata("design:paramtypes", [Object])
], WidgetContainer);
exports.WidgetContainer = WidgetContainer;
//# sourceMappingURL=widgetContainer.js.map