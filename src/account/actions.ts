import { AnyAction, Dispatch } from "redux";
import { ReduxAPICall } from "../store/middleware/api";

const FETCH_ACCOUNT = Symbol("FETCH_ACCOUNT");
export const FETCH_ACCOUNT_REQUEST = Symbol("FETCH_ACCOUNT_REQUEST");
export const FETCH_ACCOUNT_SUCCESS = Symbol("FETCH_ACCOUNT_SUCCESS");
export const FETCH_ACCOUNT_FAILURE = Symbol("FETCH_ACCOUNT_FAILURE");

export interface AccountAction extends AnyAction {
  type: "FETCH_ACCOUNT";
  payload?: object;
}

export const fetchAccount = () => ({
  endpoint: "/accounts",
  method: "GET",
  type: FETCH_ACCOUNT,
  types: [FETCH_ACCOUNT_REQUEST, FETCH_ACCOUNT_SUCCESS, FETCH_ACCOUNT_FAILURE],
});
