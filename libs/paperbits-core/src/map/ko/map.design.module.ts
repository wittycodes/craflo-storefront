import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { IWidgetHandler, IContentDropHandler } from "@paperbits/common/editing";
import { MapEditor } from "./mapEditor";
import { MapHandlers } from "../mapHandlers";
import { MapViewModel } from "./mapViewModel";
import { MapModelBinder } from "../mapModelBinder";
import { MapViewModelBinder } from "./mapViewModelBinder";

export class MapDesignModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bind("mapEditor", MapEditor);
        injector.bind("map", MapViewModel);
        injector.bindToCollection("modelBinders", MapModelBinder);
        injector.bindToCollection("viewModelBinders", MapViewModelBinder);
        injector.bindToCollection<IWidgetHandler>("widgetHandlers", MapHandlers, "mapHandler");
        injector.bindToCollection<IContentDropHandler>("dropHandlers", MapHandlers, "mapHandler");
    }
}