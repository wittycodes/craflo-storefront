/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import { IModelBinder } from "@paperbits/common/editing";
import { Model } from "./model";
import { Contract } from "@paperbits/common";
import { EContract } from "./contract";

export class ModelBinder implements IModelBinder<Model> {
  public canHandleContract(contract: Contract): boolean {
    return contract.type === "product-page";
  }

  public canHandleModel(model: Model): boolean {
    return model instanceof Model;
  }

  public async contractToModel(contract: EContract): Promise<Model> {
    const model = new Model();
    model.initialCount = contract.initialCount;
    return model;
  }

  public modelToContract(model: Model): Contract {
    const contract: EContract = {
      type: "product-page",
      initialCount: model.initialCount
    };

    return contract;
  }
}
