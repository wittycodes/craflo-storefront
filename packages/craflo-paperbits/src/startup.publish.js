"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const injection_1 = require("@paperbits/common/injection");
const cacheStorageModule_1 = require("@paperbits/common/publishing/cacheStorageModule");
const forms_module_1 = require("@paperbits/forms/forms.module");
const core_module_1 = require("@paperbits/core/core.module");
const core_publish_module_1 = require("@paperbits/core/core.publish.module");
const emails_module_1 = require("@paperbits/emails/emails.module");
const emails_publish_module_1 = require("@paperbits/emails/emails.publish.module");
const styles_publish_module_1 = require("@paperbits/styles/styles.publish.module");
const prosemirror_module_1 = require("@paperbits/prosemirror/prosemirror.module");
const intercom_publish_module_1 = require("@paperbits/intercom/intercom.publish.module");
const gtm_publish_module_1 = require("@paperbits/gtm/gtm.publish.module");
const demo_publish_module_1 = require("./modules/demo.publish.module");
const injector = new injection_1.InversifyInjector();
injector.bindModule(new core_module_1.CoreModule());
injector.bindModule(new core_publish_module_1.CorePublishModule());
injector.bindModule(new forms_module_1.FormsModule());
injector.bindModule(new emails_module_1.EmailsModule());
injector.bindModule(new emails_publish_module_1.EmailsPublishModule());
injector.bindModule(new styles_publish_module_1.StylePublishModule());
injector.bindModule(new prosemirror_module_1.ProseMirrorModule());
injector.bindModule(new intercom_publish_module_1.IntercomPublishModule());
injector.bindModule(new gtm_publish_module_1.GoogleTagManagerPublishModule());
const outputBasePath = "./dist/website";
const settingsPath = "./dist/publisher/config.json";
const dataPath = "./dist/publisher/data/demo.json";
injector.bindModule(new demo_publish_module_1.DemoPublishModule(dataPath, settingsPath, outputBasePath));
injector.bindModule(new cacheStorageModule_1.CacheStorageModule());
injector.resolve("autostart");
const publisher = injector.resolve("sitePublisher");
publisher.publish()
    .then(() => {
    console.log("DONE.");
    process.exit();
})
    .catch((error) => {
    console.log(error);
    process.exit();
});
