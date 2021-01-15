
import * as ko from "knockout";
import template from "./index.html";
import { Component } from "@paperbits/common/ko/decorators";

@Component({
  selector: "product-page",
  template: template
})
export class ViewModel {
  public readonly runtimeConfig: ko.Observable<string>;

  constructor() {
    this.runtimeConfig = ko.observable();
  }
}
