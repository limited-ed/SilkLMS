import { Selector } from "@ngxs/store";
import { AdminState } from "./admin.state";
import { AdminStateModel } from "state/models/adminStateModel";


export class AdminStateSelectors{
    @Selector([AdminState])
    static categories(state: AdminStateModel){
        return state.categories;
    }

    @Selector([AdminState])
    static userGroups(state: AdminStateModel){
        return state.usersGroups;
    }

    @Selector([AdminState])
    static users(state: AdminStateModel){
        return state.users;
    }

    @Selector([AdminState])
    static questions(state: AdminStateModel){
        return state.questions;
    }

    @Selector([AdminState])
    static cources(state: AdminStateModel){
        return state.cources;
    }

}