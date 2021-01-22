import { IInjector, IInjectorModule } from "@paperbits/common/injection";
import { Runtime } from "./runtime";

export class RuntimeModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bind("PDPRuntime", Runtime);
    }
}
