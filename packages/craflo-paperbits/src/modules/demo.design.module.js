"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoDesignModule = void 0;
const app_1 = require("../components/app/app");
const logging_1 = require("@paperbits/common/logging");
const search_design_module_1 = require("@paperbits/core/search/search.design.module");
const memoryObjectStorage_1 = require("../persistence/memoryObjectStorage");
const memoryBlobStorage_1 = require("../persistence/memoryBlobStorage");
const staticRoleService_1 = require("../user/staticRoleService");
const clickCounterEditor_module_1 = require("../components/click-counter/ko/clickCounterEditor.module");
const routing_1 = require("@paperbits/common/routing");
const httpDataProvider_1 = require("../persistence/httpDataProvider");
class DemoDesignModule {
    register(injector) {
        injector.bindSingleton("app", app_1.App);
        injector.bindSingleton("dataProvider", httpDataProvider_1.HttpDataProvider);
        injector.bindSingleton("blobStorage", memoryBlobStorage_1.MemoryBlobStorage);
        injector.bindSingleton("objectStorage", memoryObjectStorage_1.MemoryObjectStorage);
        injector.bindSingleton("roleService", staticRoleService_1.StaticRoleService);
        injector.bindToCollection("autostart", routing_1.HistoryRouteHandler);
        injector.bindSingleton("logger", logging_1.ConsoleLogger);
        injector.bindModule(new search_design_module_1.SearchDesignModule());
        injector.bindModule(new clickCounterEditor_module_1.ClickCounterEditorModule());
    }
}
exports.DemoDesignModule = DemoDesignModule;
