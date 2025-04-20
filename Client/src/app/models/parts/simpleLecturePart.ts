import { Part } from "./part";
import { PartOptions } from "./partOptions";

export interface SimpleLecturePart extends Part {
    options: PartOptions;
    pages: string[];
}