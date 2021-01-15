"use strict";
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
exports.GoogleTagManagerHtmlPagePublisherPlugin = void 0;
var GoogleTagManagerHtmlPagePublisherPlugin = (function () {
    function GoogleTagManagerHtmlPagePublisherPlugin(siteService) {
        this.siteService = siteService;
    }
    GoogleTagManagerHtmlPagePublisherPlugin.prototype.apply = function (document) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var settings, gtmSettings, containerId, headScriptElement, bodyScriptElement;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.siteService.getSettings()];
                    case 1:
                        settings = _b.sent();
                        gtmSettings = (_a = settings === null || settings === void 0 ? void 0 : settings.integration) === null || _a === void 0 ? void 0 : _a.googleTagManager;
                        if (!gtmSettings) {
                            return [2];
                        }
                        containerId = gtmSettings.webContainerId || gtmSettings.containerId;
                        if (!containerId) {
                            return [2];
                        }
                        headScriptElement = document.createElement("script");
                        headScriptElement.innerHTML = "\n        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\n        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\n        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n        })(window,document,'script','dataLayer','" + containerId + "');";
                        document.head.insertAdjacentElement("afterbegin", headScriptElement);
                        bodyScriptElement = document.createElement("noscript");
                        bodyScriptElement.innerHTML = "\n        <iframe src=\"https://www.googletagmanager.com/ns.html?id=" + containerId + "\" height=\"0\" width=\"0\" style=\"display:none;visibility:hidden\"></iframe>";
                        document.body.insertAdjacentElement("afterbegin", bodyScriptElement);
                        return [2];
                }
            });
        });
    };
    return GoogleTagManagerHtmlPagePublisherPlugin;
}());
exports.GoogleTagManagerHtmlPagePublisherPlugin = GoogleTagManagerHtmlPagePublisherPlugin;
