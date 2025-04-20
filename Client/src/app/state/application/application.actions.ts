import { UserInfo } from "models";
import { GlobalState } from "state/models/globalState.enum";


export namespace Application {
    
    export class GetGlobalState {
        static readonly type = '[Application] Get global state';
    }

    export class SetGlobalState {
        static readonly type = '[Application] Set global state';
        constructor(public state: GlobalState) { }
    }

    export class GetToken {
        static readonly type = '[Application] Get token';
    }

    export class SetToken {
        static readonly type = '[Application] Set token';
        constructor(public token: string) { }
    }

    export class SetUserInfo {
        static readonly type = '[Application] Set user info';
        constructor(public userInfo: UserInfo) { }       
    }
  
    export class GetUserInfo {
        static readonly type = '[Application] Get user info';
    
    }
}
