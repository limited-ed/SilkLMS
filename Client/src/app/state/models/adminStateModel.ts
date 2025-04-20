import { Category, Cource, Question } from "models";
import { Group } from "models/group";
import { IdentityUser } from "models/user";


export interface AdminStateModel {
    categories: Category[];
    usersGroups: Group[];
    users: IdentityUser[],
    questions: Question[];
    cources: Cource[]
}