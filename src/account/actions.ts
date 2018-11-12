import { AnyAction, Dispatch } from "redux";
import { CALL_API, ReduxAPICall,  } from "../store/middleware/api";

export interface AccountPayload {
  firstName: string;
  lastName: string;
  email: string;
}

export const FETCH_ACCOUNT_REQUEST = Symbol("FETCH_ACCOUNT_REQUEST");
export const FETCH_ACCOUNT_SUCCESS = Symbol("FETCH_ACCOUNT_SUCCESS");
export const FETCH_ACCOUNT_FAILURE = Symbol("FETCH_ACCOUNT_FAILURE");

export interface AccountAction extends AnyAction {
  type: "FETCH_ACCOUNT";
  payload?: Partial<AccountPayload>;
}

export const fetchAccount = (): ReduxAPICall => ({
  endpoint: "/accounts",
  method: "GET",
  type: CALL_API,
  types: [FETCH_ACCOUNT_REQUEST, FETCH_ACCOUNT_SUCCESS, FETCH_ACCOUNT_FAILURE],
});
