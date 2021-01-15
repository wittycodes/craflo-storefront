"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListItemModel = void 0;
const blockModel_1 = require("./blockModel");
class ListItemModel extends blockModel_1.BlockModel {
    constructor() {
        super(...arguments);
        this.type = "list-item";
    }
}
exports.ListItemModel = ListItemModel;
//# sourceMappingURL=listItemModel.js.map