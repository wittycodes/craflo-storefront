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
exports.EmailService = void 0;
var Utils = require("@paperbits/common/utils");
var emailTemplatesPath = "emailTemplates";
var documentsPath = "files";
var templateBlockKey = "blocks/new-email-template";
var EmailService = (function () {
    function EmailService(objectStorage, blockService) {
        this.objectStorage = objectStorage;
        this.blockService = blockService;
    }
    EmailService.prototype.getEmailTemplateByKey = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.objectStorage.getObject(key)];
            });
        });
    };
    EmailService.prototype.convertPage = function (pageOfEmails) {
        var _this = this;
        var resultPage = {
            value: pageOfEmails.value,
            takeNext: function () { return __awaiter(_this, void 0, void 0, function () {
                var nextLocalizedPage;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, pageOfEmails.takeNext()];
                        case 1:
                            nextLocalizedPage = _a.sent();
                            return [2, this.convertPage(nextLocalizedPage)];
                    }
                });
            }); }
        };
        if (!pageOfEmails.takeNext) {
            resultPage.takeNext = null;
        }
        return resultPage;
    };
    EmailService.prototype.search = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var pageOfResults, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!query) {
                            throw new Error("Parameter \"query\" not specified.");
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.objectStorage.searchObjects(emailTemplatesPath, query)];
                    case 2:
                        pageOfResults = _a.sent();
                        return [2, this.convertPage(pageOfResults)];
                    case 3:
                        error_1 = _a.sent();
                        throw new Error("Unable to search media: " + (error_1.stack || error_1.message));
                    case 4: return [2];
                }
            });
        });
    };
    EmailService.prototype.deleteEmailTemplate = function (emailTemplate) {
        return __awaiter(this, void 0, void 0, function () {
            var deleteContentPromise, deleteEmailTemplatePromise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        deleteContentPromise = this.objectStorage.deleteObject(emailTemplate.contentKey);
                        deleteEmailTemplatePromise = this.objectStorage.deleteObject(emailTemplate.key);
                        return [4, Promise.all([deleteContentPromise, deleteEmailTemplatePromise])];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    EmailService.prototype.createEmailTemplate = function (title, description) {
        return __awaiter(this, void 0, void 0, function () {
            var identifier, emailTemplateKey, contentKey, emailTemplate, template;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        identifier = Utils.guid();
                        emailTemplateKey = emailTemplatesPath + "/" + identifier;
                        contentKey = documentsPath + "/" + identifier;
                        emailTemplate = {
                            key: emailTemplateKey,
                            title: title,
                            description: description,
                            contentKey: contentKey
                        };
                        return [4, this.objectStorage.addObject(emailTemplateKey, emailTemplate)];
                    case 1:
                        _a.sent();
                        return [4, this.blockService.getBlockContent(templateBlockKey)];
                    case 2:
                        template = _a.sent();
                        return [4, this.objectStorage.addObject(contentKey, template)];
                    case 3:
                        _a.sent();
                        return [2, emailTemplate];
                }
            });
        });
    };
    EmailService.prototype.updateEmailTemplate = function (emailTemplate) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.objectStorage.updateObject(emailTemplate.key, emailTemplate)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    EmailService.prototype.getEmailTemplateContent = function (templateKey) {
        return __awaiter(this, void 0, void 0, function () {
            var template;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getEmailTemplateByKey(templateKey)];
                    case 1:
                        template = _a.sent();
                        return [4, this.objectStorage.getObject(template.contentKey)];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    EmailService.prototype.updateEmailTemplateContent = function (templateKey, document) {
        return __awaiter(this, void 0, void 0, function () {
            var template;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getEmailTemplateByKey(templateKey)];
                    case 1:
                        template = _a.sent();
                        this.objectStorage.updateObject(template.contentKey, document);
                        return [2];
                }
            });
        });
    };
    return EmailService;
}());
exports.EmailService = EmailService;
