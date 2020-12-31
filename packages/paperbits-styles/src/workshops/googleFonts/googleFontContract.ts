import { Bag } from "@paperbits/common";


export interface GoogleFontContract {
    kind: string;
    family: string;
    category: string;
    variants: string[];
    subsets: string[];
    version: string;
    lastModified: string;
    files: Bag<string>;
}
