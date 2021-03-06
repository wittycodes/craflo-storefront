/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by a Commercial license that can be found in the LICENSE file and at https://paperbits.io/license/commercial.
 */

import { Contract, Breakpoints } from "@paperbits/common";

export interface RowContract extends Contract {
    justify?: Breakpoints;
    align?: Breakpoints;
}