import { merge } from "ramda";

import { getEntityHandlers } from "../store/entityHandler";
import { EntitiesState } from "../store/store";
import { AccountAction, FETCH_ACCOUNT_SUCCESS, FETCH_ACCOUNTS_SUCCESS, UPDATE_ACCOUNT_SUCCESS } from "./actions";

const entityHandlers: {
  [k: string]: (state: EntitiesState["accounts"], action: AccountAction) => EntitiesState["accounts"]
} = {
  ...getEntityHandlers<EntitiesState["organisations"]>({types: {
    fetch: FETCH_ACCOUNT_SUCCESS,
    update: UPDATE_ACCOUNT_SUCCESS,
  }}),
  [FETCH_ACCOUNTS_SUCCESS]: (state, {payload}) => merge(state, payload),
};

export default (state = {}, action: AccountAction) =>
  action.type in entityHandlers ? entityHandlers[action.type](state, action) : state;
