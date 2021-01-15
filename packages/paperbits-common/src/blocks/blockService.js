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
exports.BlockService = void 0;
const Utils = require("../utils");
const Constants = require("../constants");
const persistence_1 = require("../persistence");
const IBlockService_1 = require("./IBlockService");
const blockPath = "blocks";
const documentsPath = "files";
class BlockService {
    constructor(objectStorage, httpClient) {
        this.objectStorage = objectStorage;
        this.httpClient = httpClient;
    }
    getBlockByKey(key) {
        if (!key) {
            throw new Error(`Parameter "key" not specified.`);
        }
        if (!key.startsWith(blockPath)) {
            return null;
        }
        return this.objectStorage.getObject(key);
    }
    search(type, pattern) {
        return __awaiter(this, void 0, void 0, function* () {
            let results = [];
            if (type === IBlockService_1.BlockType.saved) {
                const query = persistence_1.Query
                    .from()
                    .where("type", persistence_1.Operator.equals, type);
                if (pattern.length > 0) {
                    query.where("title", persistence_1.Operator.contains, pattern).orderBy("title");
                }
                const pageOfObjects = yield this.objectStorage.searchObjects(blockPath, query);
                results = pageOfObjects.value;
            }
            else {
                const data = yield this.loadBlockSnippets();
                if (!data) {
                    return [];
                }
                const blocks = data[blockPath];
                const blockKeys = Object.keys(blocks);
                for (const blockKey of blockKeys) {
                    if (blocks[blockKey].title.indexOf(pattern) !== -1) {
                        results.push(blocks[blockKey]);
                    }
                }
            }
            return results;
        });
    }
    deleteBlock(block) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!block) {
                throw new Error(`Parameter "block" not specified.`);
            }
            yield this.objectStorage.deleteObject(block.key);
        });
    }
    createBlock(title, description, content, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const identifier = Utils.guid();
            const blockKey = `${blockPath}/${Utils.guid()}`;
            const contentKey = `${documentsPath}/${identifier}`;
            const block = {
                type: type,
                key: blockKey,
                title: title,
                description: description,
                contentKey: contentKey
            };
            yield this.objectStorage.addObject(blockKey, block);
            yield this.objectStorage.addObject(contentKey, content);
        });
    }
    updateBlock(block) {
        if (!block) {
            throw new Error(`Parameter "block" not specified.`);
        }
        return this.objectStorage.updateObject(block.key, block);
    }
    getBlockContent(key, blockType) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!key) {
                throw new Error(`Parameter "key" not specified.`);
            }
            if (!blockType || blockType === IBlockService_1.BlockType.saved) {
                const block = yield this.getBlockByKey(key);
                return yield this.objectStorage.getObject(block.contentKey);
            }
            const data = yield this.loadBlockSnippets();
            if (!data) {
                return null;
            }
            const block = this.getObjectByPath(data, key);
            if (!block) {
                return null;
            }
            return this.getObjectByPath(data, block.contentKey);
        });
    }
    loadBlockSnippets() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.blocksData) {
                yield this.loadData();
            }
            return this.blocksData;
        });
    }
    loadData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blocksUrl = Constants.blockSnippetsLibraryUrl;
                if (!blocksUrl) {
                    console.warn("Settings for blocksUrl not found.");
                    return;
                }
                const response = yield this.httpClient.send({
                    url: blocksUrl,
                    method: "GET"
                });
                this.blocksData = response.toObject();
            }
            catch (error) {
                console.error("Load blocks error: ", error);
            }
        });
    }
    getObjectByPath(obj, pathKey) {
        for (let i = 0, path = pathKey.split("/"), len = path.length; i < len; i++) {
            obj = obj[path[i]];
        }
        return obj;
    }
}
exports.BlockService = BlockService;
//# sourceMappingURL=blockService.js.map