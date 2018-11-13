import { AnyAction, Dispatch } from "redux";
import { CALL_API, ReduxAPICall } from "../store/middleware/api";

export interface AccountPayload {
  firstName: string;
  lastName: string;
  email: string;
}

export const SET_ACTIVE_ACCOUNT = Symbol("SET_ACTIVE_ACCOUNT");
export const FETCH_ACCOUNT_REQUEST = Symbol("FETCH_ACCOUNT_REQUEST");
export const FETCH_ACCOUNT_SUCCESS = Symbol("FETCH_ACCOUNT_SUCCESS");
export const FETCH_ACCOUNT_FAILURE = Symbol("FETCH_ACCOUNT_FAILURE");

export interface AccountAction extends AnyAction {
  type: symbol;
  payload?: Partial<AccountPayload>;
}

export const setActiveAccount = (payload: any) => ({
  payload,
  type: SET_ACTIVE_ACCOUNT,
});

export const fetchAccount = () => (dispatch: Dispatch) => dispatch<ReduxAPICall>({
  endpoint: "/accounts",
  method: "GET",
  onSuccess: (payload) => dispatch(setActiveAccount(payload.id)),
  transformResponse: (response) => ({[response.id]: response}),
  type: CALL_API,
  types: [FETCH_ACCOUNT_REQUEST, FETCH_ACCOUNT_SUCCESS, FETCH_ACCOUNT_FAILURE],
});
