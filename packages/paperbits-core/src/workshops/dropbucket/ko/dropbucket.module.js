"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropbucketModule = void 0;
const dropbucket_1 = require("./dropbucket");
class DropbucketModule {
    register(injector) {
        injector.bind("dropbucket", dropbucket_1.DropBucket);
    }
}
exports.DropbucketModule = DropbucketModule;
//# sourceMappingURL=dropbucket.module.js.map