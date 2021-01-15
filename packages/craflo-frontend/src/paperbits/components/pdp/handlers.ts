/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { Model } from "./model";


export class Handlers implements IWidgetHandler {
    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "PDP",
            displayName: "Product Page",
            iconClass: "paperbits-puzzle-10",
            requires: ["html", "js"],
            createModel: async () => {
                return new Model();
            }
        };

        return widgetOrder;
    }
}
