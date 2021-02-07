"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnchorUtils = void 0;
class AnchorUtils {
    static findNodesRecursively(source, searchPredicate, filterPredicate) {
        const result = [];
        if (searchPredicate(source)) {
            result.push(source);
        }
        const keys = Object.keys(source);
        keys.forEach(key => {
            const child = source[key];
            if (child instanceof Object && filterPredicate(child)) {
                const childResult = this.findNodesRecursively(child, searchPredicate, filterPredicate);
                result.push.apply(result, childResult);
            }
        });
        return result;
    }
    static getHeadingNodes(pageContent, minHeading = 1, maxHeading = 1) {
        if (!pageContent) {
            throw new Error(`Parameter "pageContent" not specified.`);
        }
        const children = AnchorUtils.findNodesRecursively(pageContent, node => node["type"] && node["type"].startsWith("heading"), (node) => {
            if (node instanceof Array) {
                return true;
            }
            if (!node["type"]) {
                return false;
            }
            const nodeType = node["type"];
            if (nodeType.startsWith("heading")) {
                const headingLevel = parseInt(nodeType.slice(-1));
                if (headingLevel >= minHeading && headingLevel <= maxHeading) {
                    return true;
                }
            }
            else if (["layout-section", "layout-row", "layout-column", "text-block", "grid", "grid-cell"].includes(nodeType)) {
                return true;
            }
            return false;
        });
        return children.filter(item => { var _a, _b; return item.identifier || ((_a = item.attrs) === null || _a === void 0 ? void 0 : _a.id) || ((_b = item.attrs) === null || _b === void 0 ? void 0 : _b.key); });
    }
}
exports.AnchorUtils = AnchorUtils;
//# sourceMappingURL=anchorUtils.js.map