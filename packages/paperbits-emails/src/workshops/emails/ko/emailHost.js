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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailHost = void 0;
var ko = require("knockout");
var emailHost_html_1 = require("./emailHost.html");
var ko_1 = require("../../../layout/ko");
var decorators_1 = require("@paperbits/common/ko/decorators");
var ui_1 = require("@paperbits/common/ui");
var emailService_1 = require("../../../emailService");
var styles_1 = require("@paperbits/common/styles");
var EmailHost = (function () {
    function EmailHost(emailLayoutViewModelBinder, router, emailService, eventManager, viewManager, styleCompiler) {
        var _this = this;
        this.emailLayoutViewModelBinder = emailLayoutViewModelBinder;
        this.router = router;
        this.emailService = emailService;
        this.eventManager = eventManager;
        this.viewManager = viewManager;
        this.styleCompiler = styleCompiler;
        this.layoutViewModel = ko.observable();
        this.eventManager.addEventListener("onDataPush", function () { return _this.onDataPush(); });
        this.eventManager.addEventListener("onEmailTemplateSelect", function (key) { return _this.refreshContent(key); });
    }
    EmailHost.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2];
            });
        });
    };
    EmailHost.prototype.onDataPush = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.viewManager.mode === ui_1.ViewManagerMode.selecting || this.viewManager.mode === ui_1.ViewManagerMode.selected) {
                }
                return [2];
            });
        });
    };
    EmailHost.prototype.refreshContent = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var styleManager, styleSheet, bindingContext, layoutViewModel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.viewManager.setShutter();
                        styleManager = new styles_1.StyleManager(this.eventManager);
                        return [4, this.styleCompiler.getStyleSheet()];
                    case 1:
                        styleSheet = _a.sent();
                        styleManager.setStyleSheet(styleSheet);
                        bindingContext = {
                            styleManager: styleManager,
                            routeKind: "page"
                        };
                        return [4, this.emailLayoutViewModelBinder.getLayoutViewModel(key, bindingContext)];
                    case 2:
                        layoutViewModel = _a.sent();
                        layoutViewModel["widgetBinding"].provides = ["html", "email"];
                        this.layoutViewModel(layoutViewModel);
                        this.viewManager.removeShutter();
                        return [2];
                }
            });
        });
    };
    EmailHost.prototype.dispose = function () {
        this.router.removeRouteChangeListener(this.refreshContent);
    };
    __decorate([
        decorators_1.OnMounted(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], EmailHost.prototype, "initialize", null);
    EmailHost = __decorate([
        decorators_1.Component({
            selector: "email-host",
            template: emailHost_html_1.default
        }),
        __metadata("design:paramtypes", [ko_1.LayoutViewModelBinder, Object, emailService_1.EmailService, Object, Object, Object])
    ], EmailHost);
    return EmailHost;
}());
exports.EmailHost = EmailHost;
