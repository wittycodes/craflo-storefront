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
exports.FirebaseBlobStorage = void 0;
var FirebaseBlobStorage = (function () {
    function FirebaseBlobStorage(firebaseService, httpClient) {
        this.firebaseService = firebaseService;
        this.httpClient = httpClient;
    }
    FirebaseBlobStorage.prototype.uploadBlob = function (name, content, contentType) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var storageRef, metaData, uploadTask;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.firebaseService.getStorageRef()];
                    case 1:
                        storageRef = _a.sent();
                        metaData = contentType ? { contentType: contentType } : null;
                        uploadTask = storageRef.child(name).put(content, metaData);
                        uploadTask.on("state_changed", function (snapshot) {
                        }, function (error) {
                            console.error(error);
                            reject();
                        }, resolve);
                        return [2];
                }
            });
        }); });
    };
    FirebaseBlobStorage.prototype.downloadBlob = function (blobKey) {
        return __awaiter(this, void 0, void 0, function () {
            var downloadUrl, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getDownloadUrl(blobKey)];
                    case 1:
                        downloadUrl = _a.sent();
                        if (!downloadUrl) {
                            return [2, null];
                        }
                        return [4, this.httpClient.send({ url: downloadUrl })];
                    case 2:
                        response = _a.sent();
                        if ((response === null || response === void 0 ? void 0 : response.statusCode) === 200) {
                            return [2, response.toByteArray()];
                        }
                        return [2, null];
                }
            });
        });
    };
    FirebaseBlobStorage.prototype.getDownloadUrl = function (blobKey) {
        return __awaiter(this, void 0, void 0, function () {
            var storageRef, downloadUrl, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!blobKey) {
                            throw new Error("Parameter \"blobKey\" not specified.");
                        }
                        return [4, this.firebaseService.getStorageRef()];
                    case 1:
                        storageRef = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4, storageRef.child(blobKey).getDownloadURL()];
                    case 3:
                        downloadUrl = _a.sent();
                        return [2, downloadUrl];
                    case 4:
                        error_1 = _a.sent();
                        if (error_1 && error_1.code_ === "storage/object-not-found") {
                            return [2, null];
                        }
                        throw error_1;
                    case 5: return [2];
                }
            });
        });
    };
    FirebaseBlobStorage.prototype.deleteBlob = function (filename) {
        return __awaiter(this, void 0, void 0, function () {
            var storageRef;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.firebaseService.getStorageRef()];
                    case 1:
                        storageRef = _a.sent();
                        return [4, storageRef.child(filename).delete()];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return FirebaseBlobStorage;
}());
exports.FirebaseBlobStorage = FirebaseBlobStorage;
