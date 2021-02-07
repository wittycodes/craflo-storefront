import { ViewModel } from "./viewModel";
import { ViewModelBinder as I } from "@paperbits/common/widgets";
import { Model } from "./model";
import { EventManager } from "@paperbits/common/events";
import { IWidgetBinding } from "@paperbits/common/editing";
import { Bag } from "@paperbits/common";

export class ViewModelBinder implements I<Model, ViewModel>  {
  constructor(private readonly eventManager: EventManager) { }

  public async modelToViewModel(model: Model, viewModel?: ViewModel, bindingContext?: Bag<any>): Promise<ViewModel> {
    if (!viewModel) {
      viewModel = new ViewModel();
    }

    viewModel.runtimeConfig(JSON.stringify({ initialCount: model.initialCount }));

    const binding: IWidgetBinding<Model> = {
      name: "product-page",
      displayName: "Product Page",
      readonly: bindingContext ? bindingContext.readonly : false,
      model: model,
      draggable: true,
      editor: "product-page-editor",
      applyChanges: async () => {
        await this.modelToViewModel(model, viewModel, bindingContext);
        this.eventManager.dispatchEvent("onContentUpdate");
      }
    };

    viewModel["widgetBinding"] = binding;

    return viewModel;
  }

  public canHandleModel(model: Model): boolean {
    return model instanceof Model;
  }
}
