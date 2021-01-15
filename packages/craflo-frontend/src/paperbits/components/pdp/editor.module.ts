
import { Module } from "./module";
import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { Editor } from "./editor";
import { Handlers } from "./handlers";

export class EditorModule implements IInjectorModule {
  public register(injector: IInjector): void {
    injector.bindModule(new Module());
    injector.bind("PDPEditor", Editor);
    injector.bindToCollection("widgetHandlers", Handlers);
  }
}
