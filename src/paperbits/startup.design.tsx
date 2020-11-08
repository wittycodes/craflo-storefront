/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */
import * as React from "react";
import * as ko from "knockout";
window.setImmediate = setTimeout
import "./polyfills";
import * as ReactDOM from "react-dom";
import { createElement } from "react";
import Designer from "./components/designer";
import { InversifyInjector } from "@paperbits/common/injection";
import { CoreDesignModule } from "@paperbits/core/core.design.module";
import { FormsDesignModule } from "@paperbits/forms/forms.design.module";
import { EmailsDesignModule } from "@paperbits/emails/emails.design.module";
import { StylesDesignModule } from "@paperbits/styles/styles.design.module";
import { ProseMirrorModule } from "@paperbits/prosemirror/prosemirror.module";
import { OfflineModule } from "@paperbits/common/persistence/offline.module";
import { DemoDesignModule } from "./modules/demo.design.module";

const injector = new InversifyInjector();
injector.bindModule(new CoreDesignModule());
// injector.bindModule(new FormsDesignModule());
// injector.bindModule(new EmailsDesignModule());
injector.bindModule(new StylesDesignModule());
// injector.bindModule(new ProseMirrorModule());
injector.bindModule(new DemoDesignModule());
// injector.bindModule(new OfflineModule({ autosave: false }));
injector.resolve("autostart");


export default class PaperbitsInReact extends React.Component {
  private readonly ref = React.createRef<HTMLDivElement>();

  constructor(props) {
    super(props);
  }

  public async componentDidMount(): Promise<void> {
    /* Initializing dependency injection  */
    if(ReactDOM.findDOMNode(this)) {


      ko.applyBindingsToNode(this.ref.current, {component: "app"}, null);
    }
  }

  public render(): JSX.Element {
    return (
      <div ref={this.ref}></div>
    );
  }
}

// export default function a(h) {
//   document.addEventListener("DOMContentLoaded", () => {
//     setImmediate(() => {
//       const reactElement = createElement(Designer);
//       ReactDOM.render(reactElement, h);
//     });
//   });
// }
