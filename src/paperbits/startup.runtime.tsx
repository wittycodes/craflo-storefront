



/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */
// window.setImmediate =
window.setImmediate = window.setTimeout;

import dynamic from 'next/dynamic'

// dynamic(() => import("@webcomponents/custom-elements/src/native-shim"), { ssr: false } )
import "@webcomponents/custom-elements/src/native-shim";
import "core-js/es/array";
import "core-js/es/object";
import "core-js/es/promise";
import "core-js/es/reflect";
import "core-js/es/symbol";

// import "./polyfills";
import "./themes/website/scripts";
import * as ko from "knockout";

import { InversifyInjector } from "@paperbits/common/injection";
// import { Designer } from "./components/designer";
// import * as ReactDOM from "react-dom";
// import { createElement, useEffect } from "react";
import { CoreDesignModule } from "@paperbits/core/core.design.module";

import { StylesDesignModule } from "@paperbits/styles/styles.design.module";
import { ProseMirrorModule } from "@paperbits/prosemirror/prosemirror.module";

import {DemoDesignModule} from "./modules/demo.design.module";
// import {DemoRuntimeModule} from "./modules/demo.runtime.module";
import { OfflineModule } from "@paperbits/common/persistence/offline.module";
// import { DefaultViewManager, Tooltip } from "@paperbits/core/ko/ui";
const Designer = dynamic(() => import("src/paperbits/components/designer"), { ssr: false } )


// import dynamic from 'next/dynamic'

// const g = dynamic(() => import("@paperbits/core/ko/bindingHandlers/bindingHandlers.component"), { ssr: false } )

// import { KnockoutRegistrationLoaders } from "@paperbits/core/ko/knockout.loaders";

  // injector.bindSingleton("viewManager", DefaultViewManager);

  // injector.bindModule(new FormsDesignModule());
  // injector.bindModule(new EmailsDesignModule());
// if(process.browser) {
  // setImmediate(() => {
//   const reactElement = createElement(Designer);
//   ReactDOM.render(reactElement, document.body);
// });
//   document.addEventListener("DOMContentLoaded", () => {
//     console.log('page is fully loaded');
//     const injector = new InversifyInjector();
//     injector.bindModule(new CoreDesignModule());
// // injector.bindModule(new FormsDesignModule());
// // injector.bindModule(new EmailsDesignModule());
//     injector.bindModule(new StylesDesignModule());
//     injector.bindModule(new ProseMirrorModule());
//     injector.bindModule(new DemoDesignModule());
//     injector.bindModule(new OfflineModule({autosave: false}));
//     injector.resolve("autostart");
//     setImmediate(() => {
//       const reactElement = createElement(Designer);
//       ReactDOM.render(reactElement, document.body);
//     });
//   });

// }
import React from 'react'
import * as ReactDOM from "react-dom";


export default function DesignScripts() {
  const injector = new InversifyInjector();
  injector.bindModule(new CoreDesignModule());
// injector.bindModule(new FormsDesignModule());
// injector.bindModule(new EmailsDesignModule());
  injector.bindModule(new StylesDesignModule());
  injector.bindModule(new ProseMirrorModule());
  injector.bindModule(new DemoDesignModule());
  injector.bindModule(new OfflineModule({autosave: false}));
  injector.resolve("autostart");
  document.addEventListener("DOMContentLoaded", () => {
    setImmediate(() => {
      const reactElement = React.createElement(Designer);
      ReactDOM.render(reactElement, document.getElementsByTagName('app'));
    });
  })
}
