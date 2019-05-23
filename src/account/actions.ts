import i18next from "i18next";
import { compose, head, prop } from "ramda";
import { AnyAction, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import { APIResponseAction, CALL_API } from "../store/middleware/api/actions";
import { ReduxAPICall } from "../store/middleware/api/api";
import { ReduxState } from "../store/store";

export const SET_ACTIVE_ACCOUNT = "SET_ACTIVE_ACCOUNT";
export const FETCH_ACCOUNT_SUCCESS = "FETCH_ACCOUNT_SUCCESS";
export const FETCH_ACCOUNTS_SUCCESS = "FETCH_ACCOUNTS_SUCCESS";

export const ADD_ACCOUNT_SUCCESS = "ADD_ACCOUNT_SUCCESS";
export const UPDATE_ACCOUNT_SUCCESS = "UPDATE_ACCOUNT_SUCCESS";

export const SET_ACCOUNT_USER_ROLE = "SET_ACCOUNT_USER_ROLE";

export interface AccountPayload {
  id: number;
  language?: string;
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

export const setActiveAccount: (payload: any) =>
  ThunkAction<any, ReduxState, any, AnyAction> = (payload) => (dispatch, getState) => {
    dispatch({payload, type: SET_ACTIVE_ACCOUNT});
    const language = getState().entities.accounts[String(payload)].language;
    if (language && language !== i18next.language) {
      i18next.changeLanguage(language || i18next.language);
    }
  };

export const fetchCurrentAccount = () => (dispatch: Dispatch<any>) => dispatch<ReduxAPICall>({
  endpoint: "/accounts",
  method: "get",
  onSuccess: compose(dispatch, setActiveAccount, head, Object.keys as any),
  parameters: {eager: "organisations"},
  successType: FETCH_ACCOUNT_SUCCESS,
  transformResponse: (response) => ({[response.id]: response}),
  type: CALL_API,
});

export const fetchAccounts = (
  organisation: number,
  {bypassCache = false, accounts}: {bypassCache?: boolean, accounts?: number[]} = {}
): ReduxAPICall => ({
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

export const updateAccount = (account: Partial<AccountPayload>) => async (dispatch: Dispatch) => {
  const response = await dispatch<APIResponseAction<AccountPayload>>({
    body: account,
    endpoint: `/accounts/${account.id}`,
    method: "patch",
    successType: UPDATE_ACCOUNT_SUCCESS,
    type: CALL_API,
  });
  return response.payload as AccountPayload;
};

export const setUserRole = (
  organisation: number,
  account: number,
  payload: {userRole?: number}
) => ({
  body: payload,
  endpoint: `/organisations/${organisation}/users/accounts/${account}`,
  method: "put",
  successType: SET_ACCOUNT_USER_ROLE,
  type: CALL_API,
});
