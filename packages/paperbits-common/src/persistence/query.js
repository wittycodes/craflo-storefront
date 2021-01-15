"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = exports.OrderDirection = exports.Operator = void 0;
var Operator;
(function (Operator) {
    Operator[Operator["equals"] = 0] = "equals";
    Operator[Operator["contains"] = 1] = "contains";
})(Operator = exports.Operator || (exports.Operator = {}));
var OrderDirection;
(function (OrderDirection) {
    OrderDirection[OrderDirection["accending"] = 0] = "accending";
    OrderDirection[OrderDirection["descending"] = 1] = "descending";
})(OrderDirection = exports.OrderDirection || (exports.OrderDirection = {}));
class Query {
    constructor() {
        this.filters = [];
        this.skipping = 0;
        this.orderDirection = OrderDirection.accending;
    }
    where(left, operator, right) {
        this.filters.push({ left, operator, right });
        return this;
    }
    orderBy(property) {
        this.orderingBy = property;
        this.orderDirection = OrderDirection.accending;
        return this;
    }
    orderByDesc(property) {
        this.orderingBy = property;
        this.orderDirection = OrderDirection.descending;
        return this;
    }
    static from() {
        return new Query();
    }
    copy() {
        const query = new Query();
        query.filters = this.filters;
        query.selecting = this.selecting;
        query.orderingBy = this.orderingBy;
        query.orderDirection = this.orderDirection;
        return query;
    }
}
exports.Query = Query;
//# sourceMappingURL=query.js.map