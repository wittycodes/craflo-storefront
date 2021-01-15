import * as ko from "knockout";
import template from "./editor.html";
import { Model } from "./model";
import { Component, OnMounted, Param, Event } from "@paperbits/common/ko/decorators";
import { WidgetEditor } from "@paperbits/common/widgets";

@Component({
  selector: "product-page-editor",
  template: template
})
export class Editor implements WidgetEditor<Model> {
  public readonly initialCount: ko.Observable<string>;

  constructor() {
    this.initialCount = ko.observable("0");
  }

  @Param()
  public model: Model;

  @Event()
  public onChange: (model: Model) => void;

  @OnMounted()
  public async initialize(): Promise<void> {
    /*
       This method is called after component created. At this moment all the parameters,
       includinig "model", are available.
    */

    this.initialCount(this.model.initialCount?.toString());
    this.initialCount.subscribe(this.applyChanges);
  }

  private applyChanges(): void {
    this.model.initialCount = parseInt(this.initialCount());
    this.onChange(this.model);
  }
}
