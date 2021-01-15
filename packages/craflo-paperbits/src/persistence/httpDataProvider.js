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
exports.HttpDataProvider = void 0;
class HttpDataProvider {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.initPromise) {
                return this.initPromise;
            }
            this.initPromise = new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.httpClient.send({
                    url: "/data/demo.json",
                    method: "GET"
                });
                this.dataObject = response.toObject();
                resolve();
            }));
            return this.initPromise;
        });
    }
    getDataObject() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initialize();
            return this.dataObject;
        });
    }
    setDataObject(dataObject) {
        return __awaiter(this, void 0, void 0, function* () {
            this.dataObject = dataObject;
        });
    }
}
exports.HttpDataProvider = HttpDataProvider;
