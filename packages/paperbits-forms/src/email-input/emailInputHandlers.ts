import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { EmailInputModel } from "./emailInputModel";


export class EmailInputHandlers implements IWidgetHandler {
    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "input:email",
            category: "Forms",
            displayName: "Email input",
            iconClass: "paperbits-form",
            requires: ["form", "html", "js"],
            createModel: async () => {
                return new EmailInputModel();
            }
        };

        return widgetOrder;
    }
}