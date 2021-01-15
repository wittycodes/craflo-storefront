import { ViewModel } from "./viewModel";
import { ModelBinder } from "./modelBinder";
import { ViewModelBinder } from "./viewModelBinder";


export class Module implements IInjectorModule {
  public register(injector: IInjector): void {
    injector.bind("PDP", ViewModel);
    injector.bindToCollection("modelBinders", ModelBinder);
    injector.bindToCollection("viewModelBinders", ViewModelBinder);
  }
}
