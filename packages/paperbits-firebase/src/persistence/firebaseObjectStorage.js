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
exports.FirebaseObjectStorage = void 0;
var Objects = require("@paperbits/common/objects");
var persistence_1 = require("@paperbits/common/persistence");
var firebaseCollectionPage_1 = require("./firebaseCollectionPage");
var contants_1 = require("./contants");
var FirebaseObjectStorage = (function () {
    function FirebaseObjectStorage(firebaseService) {
        this.firebaseService = firebaseService;
    }
    FirebaseObjectStorage.prototype.normalizeDataObject = function (dataObject) {
        var _this = this;
        if (dataObject instanceof Object) {
            Object.keys(dataObject).forEach(function (key) {
                var child = dataObject[key];
                if (child instanceof Object) {
                    _this.normalizeDataObject(child);
                }
                else if (child === undefined) {
                    dataObject[key] = null;
                }
            });
        }
    };
    FirebaseObjectStorage.prototype.addObject = function (path, dataObject) {
        return __awaiter(this, void 0, void 0, function () {
            var databaseRef, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.normalizeDataObject(dataObject);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        return [4, this.firebaseService.getDatabaseRef()];
                    case 2:
                        databaseRef = _a.sent();
                        if (!path) return [3, 4];
                        return [4, databaseRef.child(path).set(dataObject)];
                    case 3:
                        _a.sent();
                        return [3, 6];
                    case 4: return [4, databaseRef.update(dataObject)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [3, 8];
                    case 7:
                        error_1 = _a.sent();
                        throw new Error("Could not add object '" + path + "'. " + (error_1.stack || error_1.message) + ".");
                    case 8: return [2];
                }
            });
        });
    };
    FirebaseObjectStorage.prototype.getObject = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var databaseRef, snapshot, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, this.firebaseService.getDatabaseRef()];
                    case 1:
                        databaseRef = _a.sent();
                        return [4, databaseRef.child(path).once("value")];
                    case 2:
                        snapshot = _a.sent();
                        return [2, snapshot.val()];
                    case 3:
                        error_2 = _a.sent();
                        throw new Error("Could not retrieve object '" + path + "'. " + (error_2.stack || error_2.message) + ".");
                    case 4: return [2];
                }
            });
        });
    };
    FirebaseObjectStorage.prototype.deleteObject = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var databaseRef, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.firebaseService.getDatabaseRef()];
                    case 1:
                        databaseRef = _a.sent();
                        databaseRef.child(path).remove();
                        return [3, 3];
                    case 2:
                        error_3 = _a.sent();
                        throw new Error("Could not delete object '" + path + "'. " + (error_3.stack || error_3.message) + ".");
                    case 3: return [2];
                }
            });
        });
    };
    FirebaseObjectStorage.prototype.updateObject = function (path, dataObject) {
        return __awaiter(this, void 0, void 0, function () {
            var databaseRef, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.normalizeDataObject(dataObject);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4, this.firebaseService.getDatabaseRef()];
                    case 2:
                        databaseRef = _a.sent();
                        return [4, databaseRef.child(path).update(dataObject)];
                    case 3: return [2, _a.sent()];
                    case 4:
                        error_4 = _a.sent();
                        throw new Error("Could not update object '" + path + "'. " + (error_4.stack || error_4.message));
                    case 5: return [2];
                }
            });
        });
    };
    FirebaseObjectStorage.prototype.searchObjects = function (path, query) {
        return __awaiter(this, void 0, void 0, function () {
            var databaseRef, pathRef, snapshot, searchObj, collection, property_1, value, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, this.firebaseService.getDatabaseRef()];
                    case 1:
                        databaseRef = _a.sent();
                        pathRef = databaseRef.child(path);
                        return [4, pathRef.once("value")];
                    case 2:
                        snapshot = _a.sent();
                        searchObj = snapshot.val();
                        if (!searchObj) {
                            return [2, { value: [] }];
                        }
                        collection = Object.values(searchObj);
                        if (query) {
                            if (query.filters.length > 0) {
                                collection = collection.filter(function (x) {
                                    var meetsCriteria = true;
                                    for (var _i = 0, _a = query.filters; _i < _a.length; _i++) {
                                        var filter = _a[_i];
                                        var left = Objects.getObjectAt(filter.left, x);
                                        var right = filter.right;
                                        if (left === undefined) {
                                            meetsCriteria = false;
                                            continue;
                                        }
                                        if (typeof left === "string") {
                                            left = left.toUpperCase();
                                        }
                                        if (typeof right === "string") {
                                            right = right.toUpperCase();
                                        }
                                        var operator = filter.operator;
                                        switch (operator) {
                                            case persistence_1.Operator.contains:
                                                if (left && !left.includes(right)) {
                                                    meetsCriteria = false;
                                                }
                                                break;
                                            case persistence_1.Operator.equals:
                                                if (left !== right) {
                                                    meetsCriteria = false;
                                                }
                                                break;
                                            default:
                                                throw new Error("Cannot translate operator into Firebase Realtime Database query.");
                                        }
                                    }
                                    return meetsCriteria;
                                });
                            }
                            if (query.orderingBy) {
                                property_1 = query.orderingBy;
                                collection = collection.sort(function (x, y) {
                                    var a = Objects.getObjectAt(property_1, x);
                                    var b = Objects.getObjectAt(property_1, y);
                                    var modifier = query.orderDirection === persistence_1.OrderDirection.accending ? 1 : -1;
                                    if (a > b) {
                                        return modifier;
                                    }
                                    if (a < b) {
                                        return -modifier;
                                    }
                                    return 0;
                                });
                            }
                        }
                        value = collection.slice(0, contants_1.pageSize);
                        return [2, new firebaseCollectionPage_1.FirebaseCollectionPage(value, collection, contants_1.pageSize)];
                    case 3:
                        error_5 = _a.sent();
                        throw new Error("Could not search object '" + path + "'. " + (error_5.stack || error_5.message) + ".");
                    case 4: return [2];
                }
            });
        });
    };
    FirebaseObjectStorage.prototype.saveChanges = function (delta) {
        return __awaiter(this, void 0, void 0, function () {
            var saveTasks, keys;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Saving changes...");
                        saveTasks = [];
                        keys = [];
                        Object.keys(delta).map(function (key) {
                            var firstLevelObject = delta[key];
                            Object.keys(firstLevelObject).forEach(function (subkey) {
                                keys.push(key + "/" + subkey);
                            });
                        });
                        keys.forEach(function (key) {
                            var changeObject = Objects.getObjectAt(key, delta);
                            if (changeObject) {
                                saveTasks.push(_this.updateObject(key, changeObject));
                            }
                            else {
                                saveTasks.push(_this.deleteObject(key));
                            }
                        });
                        return [4, Promise.all(saveTasks)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return FirebaseObjectStorage;
}());
exports.FirebaseObjectStorage = FirebaseObjectStorage;
