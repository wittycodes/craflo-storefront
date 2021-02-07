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
exports.FirebaseService = void 0;
var admin = require("firebase-admin");
var FirebaseService = (function () {
    function FirebaseService(settingsProvider, firebaseCredentialProvider) {
        this.settingsProvider = settingsProvider;
        this.firebaseCredentialProvider = firebaseCredentialProvider;
    }
    FirebaseService.prototype.applyConfiguration = function (firebaseSettings) {
        return __awaiter(this, void 0, void 0, function () {
            var credential;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.databaseRootKey = firebaseSettings["databaseRootKey"];
                        this.storageBasePath = firebaseSettings["storageBasePath"];
                        return [4, this.firebaseCredentialProvider.getCredential()];
                    case 1:
                        credential = _a.sent();
                        admin.initializeApp({
                            credential: credential,
                            databaseURL: firebaseSettings["databaseURL"],
                            storageBucket: firebaseSettings["storageBucket"]
                        });
                        return [2];
                }
            });
        });
    };
    FirebaseService.prototype.getDatabaseRef = function () {
        return __awaiter(this, void 0, void 0, function () {
            var databaseRef;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getFirebaseRef()];
                    case 1:
                        _a.sent();
                        return [4, admin.database().ref(this.databaseRootKey)];
                    case 2:
                        databaseRef = _a.sent();
                        return [2, databaseRef];
                }
            });
        });
    };
    FirebaseService.prototype.getStorageRef = function () {
        return __awaiter(this, void 0, void 0, function () {
            var bucket;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getFirebaseRef()];
                    case 1:
                        _a.sent();
                        bucket = admin.storage().bucket();
                        return [2, bucket];
                }
            });
        });
    };
    FirebaseService.prototype.getFirebaseRef = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.initializationPromise) {
                    return [2, this.initializationPromise];
                }
                this.initializationPromise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var firebaseSettings;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, this.settingsProvider.getSetting("firebase")];
                            case 1:
                                firebaseSettings = _a.sent();
                                this.databaseRootKey = this.databaseRootKey = firebaseSettings.rootKey || "/";
                                return [4, this.applyConfiguration(firebaseSettings)];
                            case 2:
                                _a.sent();
                                resolve();
                                return [2];
                        }
                    });
                }); });
                return [2, this.initializationPromise];
            });
        });
    };
    return FirebaseService;
}());
exports.FirebaseService = FirebaseService;
