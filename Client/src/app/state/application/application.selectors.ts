import { Selector } from "@ngxs/store";
import { ApplicationStateModel } from "../models/globalState";
import { ApplicationState } from './application.state';

export class ApplicationStateSelectors {
    @Selector([ApplicationState])
    static token(state: ApplicationStateModel) {
        return state.apiToken;
    }

    @Selector([ApplicationState])
    static globalState(state: ApplicationStateModel){
        return state.globalState
    }

    @Selector([ApplicationState])
    static userInfo(state: ApplicationStateModel){
        return state.userInfo
    }    
}