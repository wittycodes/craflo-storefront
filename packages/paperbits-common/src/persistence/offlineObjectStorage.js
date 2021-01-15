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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfflineObjectStorage = void 0;
const Objects = require("../objects");
const persistence_1 = require("../persistence");
class OfflineObjectStorage {
    constructor(changesCache, eventManager) {
        this.changesCache = changesCache;
        this.eventManager = eventManager;
        this.changesObjectCacheKey = "changesObject";
        this.stateObjectCacheKey = "stateObject";
        this.stateObject = {};
        this.changesObject = {};
        this.remoteObjectStorage = null;
        this.isOnline = true;
        this.autosave = false;
        this.middlewares = [];
        this.past = [];
        this.future = [];
        if (eventManager) {
            this.eventManager.addEventListener("onUndo", () => this.undo());
            this.eventManager.addEventListener("onRedo", () => this.redo());
        }
    }
    initialize() {
        if (this.initializePromise) {
            return this.initializePromise;
        }
        this.initializePromise = new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const cachedChangesObject = yield this.changesCache.getItem(this.changesObjectCacheKey);
            if (cachedChangesObject) {
                Object.assign(this.changesObject, cachedChangesObject);
            }
            const cachedStateObject = yield this.changesCache.getItem(this.stateObjectCacheKey);
            if (cachedStateObject) {
                Object.assign(this.stateObject, cachedStateObject);
            }
            resolve();
        }));
        return this.initializePromise;
    }
    canUndo() {
        return this.past.length > 0;
    }
    canRedo() {
        return this.future.length > 0;
    }
    setRemoteObjectStorage(underlyingStorage) {
        this.remoteObjectStorage = underlyingStorage;
    }
    registerMiddleware(middleware) {
        this.middlewares.push(middleware);
    }
    addObject(path, dataObject) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!path) {
                throw new Error("Could not add object: Key is undefined.");
            }
            yield this.initialize();
            const dataObjectClone = Objects.clone(dataObject);
            let compensationOfState;
            let compensationOfChanges;
            const doCommand = () => {
                compensationOfState = Objects.setValueWithCompensation(path, this.stateObject, dataObjectClone);
                compensationOfChanges = Objects.setValueWithCompensation(path, this.changesObject, dataObjectClone);
                Objects.cleanupObject(this.stateObject, true);
                Objects.cleanupObject(this.changesObject, true);
                this.changesCache.setItem(this.changesObjectCacheKey, this.changesObject);
                this.changesCache.setItem(this.stateObjectCacheKey, this.stateObject);
            };
            const undoCommand = () => {
                Objects.setValueWithCompensation(path, this.stateObject, compensationOfState);
                Objects.setValueWithCompensation(path, this.changesObject, compensationOfChanges);
                Objects.cleanupObject(this.stateObject, true);
                Objects.cleanupObject(this.changesObject, true);
                this.changesCache.setItem(this.changesObjectCacheKey, this.changesObject);
                this.changesCache.setItem(this.stateObjectCacheKey, this.stateObject);
            };
            this.do(doCommand, undoCommand);
        });
    }
    patchObject(path, dataObject) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Not implemented");
        });
    }
    updateObject(path, dataObject) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!path) {
                throw new Error(`Parameter "path" not specified.`);
            }
            if (dataObject === undefined) {
                throw new Error(`Parameter "dataObject" not specified.`);
            }
            yield this.initialize();
            const dataObjectClone1 = Objects.clone(dataObject);
            const dataObjectClone2 = Objects.clone(dataObject);
            let compensationOfState;
            let compensationOfChanges;
            const doCommand = () => {
                compensationOfState = Objects.setValueWithCompensation(path, this.stateObject, dataObjectClone1);
                compensationOfChanges = Objects.setValueWithCompensation(path, this.changesObject, dataObjectClone2);
                Objects.cleanupObject(this.stateObject, true);
                Objects.cleanupObject(this.changesObject);
                this.changesCache.setItem(this.changesObjectCacheKey, this.changesObject);
                this.changesCache.setItem(this.stateObjectCacheKey, this.stateObject);
            };
            const undoCommand = () => {
                Objects.setValueWithCompensation(path, this.stateObject, compensationOfState);
                Objects.setValueWithCompensation(path, this.changesObject, compensationOfChanges);
                Objects.cleanupObject(this.stateObject, true);
                Objects.cleanupObject(this.changesObject);
                this.changesCache.setItem(this.changesObjectCacheKey, this.changesObject);
                this.changesCache.setItem(this.stateObjectCacheKey, this.stateObject);
            };
            this.do(doCommand, undoCommand);
        });
    }
    getObject(path) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!path) {
                throw new Error(`Parameter "path" not specified.`);
            }
            yield this.initialize();
            const locallyChangedObject = Objects.getObjectAt(path, this.changesObject);
            if (!!locallyChangedObject) {
                return Objects.clone(locallyChangedObject);
            }
            if (locallyChangedObject === null) {
                return undefined;
            }
            let locallyCachedObject = Objects.getObjectAt(path, this.stateObject);
            if (locallyCachedObject) {
                return Objects.clone(locallyCachedObject);
            }
            const remoteObjectStorageResult = yield this.remoteObjectStorage.getObject(path);
            if (!!remoteObjectStorageResult) {
                locallyCachedObject = Objects.clone(remoteObjectStorageResult);
                Objects.setValue(path, this.stateObject, locallyCachedObject);
                this.changesCache.setItem(this.stateObjectCacheKey, this.stateObject);
            }
            return remoteObjectStorageResult;
        });
    }
    deleteObject(path) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!path) {
                throw new Error(`Parameter "path" not specified.`);
            }
            yield this.initialize();
            let compensationOfState;
            let compensationOfChanges;
            const doCommand = () => {
                compensationOfState = Objects.setValueWithCompensation(path, this.stateObject, null);
                compensationOfChanges = Objects.setValueWithCompensation(path, this.changesObject, null);
                Objects.cleanupObject(this.stateObject, true);
                Objects.cleanupObject(this.changesObject);
                this.changesCache.setItem(this.changesObjectCacheKey, this.changesObject);
                this.changesCache.setItem(this.stateObjectCacheKey, this.stateObject);
            };
            const undoCommand = () => {
                Objects.setValueWithCompensation(path, this.stateObject, compensationOfState);
                Objects.setValueWithCompensation(path, this.changesObject, compensationOfChanges);
                Objects.cleanupObject(this.stateObject, true);
                Objects.cleanupObject(this.changesObject);
                this.changesCache.setItem(this.changesObjectCacheKey, this.changesObject);
                this.changesCache.setItem(this.stateObjectCacheKey, this.stateObject);
            };
            this.do(doCommand, undoCommand);
        });
    }
    do(doCommand, undoCommand) {
        const record = { do: doCommand, undo: undoCommand };
        record.do();
        this.past.push(record);
        if (this.past.length > 10) {
            this.past.shift();
        }
        if (this.autosave) {
            this.saveChanges();
        }
        if (this.eventManager) {
            this.eventManager.dispatchEvent("onDataChange");
        }
    }
    undo() {
        if (!this.canUndo()) {
            return;
        }
        const record = this.past.pop();
        record.undo();
        this.future.push(record);
        if (this.autosave) {
            this.saveChanges();
        }
        if (this.eventManager) {
            this.eventManager.dispatchEvent("onDataPush");
            this.eventManager.dispatchEvent("onDataChange");
        }
    }
    redo() {
        if (!this.canRedo()) {
            return;
        }
        const record = this.future.pop();
        record.do();
        this.past.push(record);
        if (this.eventManager) {
            this.eventManager.dispatchEvent("onDataPush");
            this.eventManager.dispatchEvent("onDataChange");
        }
    }
    searchLocalChanges(path, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchObj = Objects.getObjectAt(path, Objects.clone(this.changesObject));
            if (!searchObj) {
                return { value: [], totalCount: 0 };
            }
            let collection = Object.values(searchObj).filter(x => !!x);
            if (query) {
                if (query.filters.length > 0) {
                    collection = collection.filter(x => {
                        let meetsCriteria = true;
                        for (const filter of query.filters) {
                            let left = Objects.getObjectAt(filter.left, x);
                            let right = filter.right;
                            if (!!right && left === undefined) {
                                meetsCriteria = false;
                                continue;
                            }
                            if (typeof filter.right === "boolean") {
                                if (filter.operator !== persistence_1.Operator.equals) {
                                    console.warn("Boolean query operator can be only equals");
                                    meetsCriteria = false;
                                    return;
                                }
                                if (((left === undefined || left === false) && filter.right === true) ||
                                    ((filter.right === undefined || filter.right === false) && left === true)) {
                                    meetsCriteria = false;
                                }
                                continue;
                            }
                            if (!left) {
                                meetsCriteria = false;
                                continue;
                            }
                            const operator = filter.operator;
                            if (typeof left === "string") {
                                left = left.toUpperCase();
                            }
                            if (typeof right === "string") {
                                right = right.toUpperCase();
                            }
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
                    const property = query.orderingBy;
                    collection = collection.sort((x, y) => {
                        const a = Objects.getObjectAt(property, x);
                        const b = Objects.getObjectAt(property, y);
                        const modifier = query.orderDirection === persistence_1.OrderDirection.accending ? 1 : -1;
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
            const totalObjectsMatchingCriteria = collection.length;
            return { value: collection, totalCount: totalObjectsMatchingCriteria };
        });
    }
    convertPage(remotePage) {
        const resultPage = {
            value: remotePage.value,
            takeNext: (n) => __awaiter(this, void 0, void 0, function* () {
                const nextRemotePage = yield remotePage.takeNext();
                return this.convertPage(nextRemotePage);
            })
        };
        if (!remotePage.takeNext) {
            resultPage.takeNext = null;
        }
        return resultPage;
    }
    searchObjects(path, query = persistence_1.Query.from()) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!path) {
                throw new Error(`Parameter "path" not specified.`);
            }
            yield this.initialize();
            const resultPage = {
                value: [],
                takeNext: null
            };
            const localSearchResults = yield this.searchLocalChanges(path, query);
            const remoteQuery = query.copy();
            const pageOfRemoteSearchResults = yield this.remoteObjectStorage.searchObjects(path, remoteQuery);
            const remoteSearchResults = pageOfRemoteSearchResults.value;
            if (pageOfRemoteSearchResults.takeNext) {
                resultPage.takeNext = () => __awaiter(this, void 0, void 0, function* () {
                    const nextRemotePage = yield pageOfRemoteSearchResults.takeNext();
                    return this.convertPage(nextRemotePage);
                });
            }
            const changesAt = Objects.getObjectAt(path, Objects.clone(this.changesObject));
            if (changesAt) {
                Object.keys(changesAt)
                    .forEach(key => {
                    const index = remoteSearchResults.findIndex(x => x["key"] === `${path}/${key}`);
                    if (index >= 0 && changesAt[key] === null) {
                        remoteSearchResults.splice(index, 1);
                    }
                });
            }
            resultPage.value = localSearchResults.value.concat(remoteSearchResults);
            return resultPage;
        });
    }
    hasUnsavedChanges() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initialize();
            return Object.keys(this.changesObject).length > 0;
        });
    }
    hasUnsavedChangesAt(key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initialize();
            return !!Objects.getObjectAt(key, this.changesObject);
        });
    }
    discardChanges() {
        return __awaiter(this, void 0, void 0, function* () {
            Object.keys(this.changesObject).forEach(key => delete this.changesObject[key]);
            Object.keys(this.stateObject).forEach(key => delete this.stateObject[key]);
            this.changesCache.setItem(this.changesObjectCacheKey, this.changesObject);
        });
    }
    saveChanges() {
        return __awaiter(this, void 0, void 0, function* () {
            const entities = Object.keys(this.changesObject);
            if (entities.length === 0) {
                return;
            }
            yield this.remoteObjectStorage.saveChanges(this.changesObject);
            entities.forEach(key => delete this.changesObject[key]);
            this.changesCache.setItem(this.changesObjectCacheKey, this.changesObject);
            this.eventManager.dispatchEvent("onDataChange");
        });
    }
    loadData() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.remoteObjectStorage.loadData) {
                const loadedData = yield this.remoteObjectStorage.loadData();
                if (loadedData) {
                    yield this.discardChanges();
                    this.eventManager.dispatchEvent("onDataPush");
                    this.eventManager.dispatchEvent("onDataChange");
                }
            }
            else {
                console.warn("current ObjectStorage does not implement loadData");
            }
            return this.stateObject;
        });
    }
}
exports.OfflineObjectStorage = OfflineObjectStorage;
//# sourceMappingURL=offlineObjectStorage.js.map