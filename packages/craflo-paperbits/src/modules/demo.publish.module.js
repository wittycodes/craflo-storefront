"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoPublishModule = void 0;
const path = require("path");
const logging_1 = require("@paperbits/common/logging");
const memoryBlobStorage_1 = require("../persistence/memoryBlobStorage");
const staticUserService_1 = require("../user/staticUserService");
const fileSystemObjectStorage_1 = require("../persistence/fileSystemObjectStorage");
const fileSystemBlobStorage_1 = require("../persistence/fileSystemBlobStorage");
const staticSettingsProvider_1 = require("../configuration/staticSettingsProvider");
const staticRouter_1 = require("../routing/staticRouter");
const staticRoleService_1 = require("../user/staticRoleService");
const search_publish_module_1 = require("@paperbits/core/search/search.publish.module");
const ko_1 = require("../components/click-counter/ko");
const fileSystemDataProvider_1 = require("../persistence/fileSystemDataProvider");
class DemoPublishModule {
    constructor(dataPath, settingsPath, outputBasePath) {
        this.dataPath = dataPath;
        this.settingsPath = settingsPath;
        this.outputBasePath = outputBasePath;
    }
    register(injector) {
        injector.bindSingleton("logger", logging_1.ConsoleLogger);
        injector.bindSingleton("userService", staticUserService_1.StaticUserService);
        injector.bindSingleton("roleService", staticRoleService_1.StaticRoleService);
        injector.bindSingleton("router", staticRouter_1.StaticRouter);
        injector.bindSingleton("blobStorage", memoryBlobStorage_1.MemoryBlobStorage);
        injector.bindInstance("dataProvider", new fileSystemDataProvider_1.FileSystemDataProvider(path.resolve(this.dataPath)));
        injector.bindInstance("objectStorage", new fileSystemObjectStorage_1.FileSystemObjectStorage(path.resolve(this.dataPath)));
        injector.bindInstance("outputBlobStorage", new fileSystemBlobStorage_1.FileSystemBlobStorage(path.resolve(this.outputBasePath)));
        injector.bindInstance("settingsProvider", new staticSettingsProvider_1.StaticSettingsProvider(path.resolve(this.settingsPath)));
        injector.bindModule(new search_publish_module_1.SearchPublishModule());
        injector.bindModule(new ko_1.ClickCounterEditorModule());
    }
}
exports.DemoPublishModule = DemoPublishModule;
