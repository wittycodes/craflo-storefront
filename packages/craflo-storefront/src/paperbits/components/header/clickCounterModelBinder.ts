/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import { IModelBinder } from "@paperbits/common/editing";
import { ClickCounterModel } from "./clickCounterModel";
import { Contract } from "@paperbits/common";
import { ClickCounterContract } from "./clickCounterContract";

export class ClickCounterModelBinder implements IModelBinder<ClickCounterModel> {
    public canHandleContract(contract: Contract): boolean {
        return contract.type === "header";
    }

    public canHandleModel(model: ClickCounterModel): boolean {
        return model instanceof ClickCounterModel;
    }

    public async contractToModel(contract: ClickCounterContract): Promise<ClickCounterModel> {
        const model = new ClickCounterModel();
        return model;
    }

    public modelToContract(model: ClickCounterModel): Contract {
        const contract: ClickCounterContract = {
            type: "header"
        };

        return contract;
    }
}
