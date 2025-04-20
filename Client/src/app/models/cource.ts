import { PartItem } from "./parts/partItem";
import { IdentityUser } from "./user";

export interface Cource {
    id: number;
    title: string;
    description: string;
    theme: string;
    partItems: PartItem[];
    users: IdentityUser[];
}