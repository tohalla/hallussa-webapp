import { AnyAction, Dispatch } from "redux";
import { CALL_API, ReduxAPICall } from "../store/middleware/api";

export const SET_ACTIVE_ACCOUNT = "SET_ACTIVE_ACCOUNT";
export const FETCH_ACCOUNT_REQUEST = "FETCH_ACCOUNT_REQUEST";
export const FETCH_ACCOUNT_SUCCESS = "FETCH_ACCOUNT_SUCCESS";
export const FETCH_ACCOUNT_FAILURE = "FETCH_ACCOUNT_FAILURE";

export interface AccountPayload {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  organisations: Array<{id: number, isAdmin: boolean}>;
}

export interface AccountAction extends AnyAction {
  type: string;
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
