import { UserInfo } from "models";
import { GlobalState } from "./globalState.enum";

export interface ApplicationStateModel {
    globalState: GlobalState;
    userInfo?: UserInfo;
    apiToken?: string;
}