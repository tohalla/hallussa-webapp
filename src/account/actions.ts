import { find, prop } from "ramda";
import { AnyAction, Dispatch } from "redux";

import { CALL_API } from "../store/middleware/api/actions";
import { ReduxAPICall } from "../store/middleware/api/api";

export const SET_ACTIVE_ACCOUNT = "SET_ACTIVE_ACCOUNT";
export const FETCH_ACCOUNT_SUCCESS = "FETCH_ACCOUNT_SUCCESS";
export const FETCH_ACCOUNTS_SUCCESS = "FETCH_ACCOUNTS_SUCCESS";

export const ADD_ACCOUNT_SUCCESS = "ADD_ACCOUNT_SUCCESS";

export interface AccountPayload {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  organisations: ReadonlyArray<{userRole: number, organisation: number}>;
  userRole?: number;
}

export interface AccountAction extends AnyAction {
  type: string;
  payload?: Partial<AccountPayload>;
}

export const setActiveAccount = (payload: any) => ({
  payload,
  type: SET_ACTIVE_ACCOUNT,
});

export const fetchCurrentAccount = () => (dispatch: Dispatch) => dispatch<ReduxAPICall>({
  endpoint: "/accounts",
  method: "get",
  onSuccess: (payload) => dispatch(setActiveAccount(payload.id)),
  parameters: {eager: "organisations"},
  successType: FETCH_ACCOUNT_SUCCESS,
  transformResponse: (response) => ({[response.id]: response}),
  type: CALL_API,
});

export const fetchAccounts = (
  organisation: number,
  {bypassCache = false, accounts}: {bypassCache?: boolean, accounts?: number[]} = {}
): ReduxAPICall => ({
  attemptToFetchFromStore: bypassCache ? undefined : (state) =>
    state.entities.accounts && !Boolean(find(// check if store contains all appliances defined in organisation
      (account) => typeof state.entities.accounts[account.account] === "undefined",
      state.entities.organisations[organisation].accounts || []
    )),
  endpoint: `/organisations/${organisation}/users/accounts${accounts ? `?accounts=[${
    accounts.join(",")
  }]` : ""}`,
  method: "get",
  successType: FETCH_ACCOUNTS_SUCCESS,
  type: CALL_API,
});

export const addAccount = (
  organisation: number,
  payload: {email: string, userRole?: number}
) => (dispatch: Dispatch) => dispatch<ReduxAPICall>({
  body: payload,
  endpoint: `/organisations/${organisation}/users/accounts`,
  method: "post",
  onSuccess: (responsePayload) => {
    const account = prop("account", responsePayload);
    if (typeof account === "number") {
      return dispatch(fetchAccounts(organisation, {accounts: [account]}));
    }
  },
  successType: ADD_ACCOUNT_SUCCESS,
  type: CALL_API,
});
