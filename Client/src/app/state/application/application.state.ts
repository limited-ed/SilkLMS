import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { Application } from './application.actions'
import { ApplicationStateModel } from "state/models/globalState";
import { GlobalState } from "state/models/globalState.enum";
import { UserInfo } from "models";
 
@State<ApplicationStateModel>({
    name:'ApplicationState',
    defaults: {
        globalState: GlobalState.NotLogged,
        userInfo: undefined,
        apiToken: ''
    }
})
@Injectable()
export class ApplicationState{

    @Action(Application.SetGlobalState)
    setGlobalState(ctx: StateContext<ApplicationStateModel>, action: Application.SetGlobalState){
        ctx.patchState({globalState: action.state})
    }

    @Action(Application.SetToken)
    setToken(ctx: StateContext<ApplicationStateModel>, action: Application.SetToken){
        ctx.patchState({apiToken: action.token});
    }

    @Action(Application.SetUserInfo)
    setUserInfo(ctx: StateContext<ApplicationStateModel>, action: Application.SetUserInfo){
        ctx.patchState({userInfo: action.userInfo}); 
    }
}