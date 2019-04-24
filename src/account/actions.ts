import { AnyAction, Dispatch } from "redux";
import { CALL_API } from "../store/middleware/api/actions";
import { ReduxAPICall } from "../store/middleware/api/api";

export const SET_ACTIVE_ACCOUNT = "SET_ACTIVE_ACCOUNT";
export const FETCH_ACCOUNT_SUCCESS = "FETCH_ACCOUNT_SUCCESS";

export interface AccountPayload {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  organisations: ReadonlyArray<{id: number, userRole: number}>;
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
  method: "get",
  onSuccess: (payload) => dispatch(setActiveAccount(payload.id)),
  parameters: {eager: "organisations"},
  successType: FETCH_ACCOUNT_SUCCESS,
  transformResponse: (response) => ({[response.id]: response}),
  type: CALL_API,
});
