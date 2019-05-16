import { merge } from "ramda";

import { EntitiesState } from "../store/store";
import { AccountAction, FETCH_ACCOUNT_SUCCESS, FETCH_ACCOUNTS_SUCCESS } from "./actions";

const entityHandlers: {
  [k: string]: (state: EntitiesState["accounts"], action: AccountAction) => EntitiesState["accounts"]
} = {
  [FETCH_ACCOUNT_SUCCESS]: (state, {payload}) => merge(state, payload),
  [FETCH_ACCOUNTS_SUCCESS]: (state, {payload}) => merge(state, payload),
};

export default (state = {}, action: AccountAction) =>
  action.type in entityHandlers ? entityHandlers[action.type](state, action) : state;
