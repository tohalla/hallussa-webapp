import { cond, merge, T } from "ramda";
import { Reducer } from "redux";

import { anyEquals } from "../util/utilityFunctions";
import { AccountAction, FETCH_ACCOUNT_SUCCESS, FETCH_ACCOUNTS_SUCCESS } from "./actions";

const typeHandler = cond([
  [anyEquals([FETCH_ACCOUNT_SUCCESS, FETCH_ACCOUNTS_SUCCESS]), (type, state, payload) => merge(state, payload)],
  [T, (type, state, payload) => state],
]) as any;

const reducer: Reducer<{[key: number]: any}, AccountAction> = (
  state = {},
  {payload, type}: AccountAction
) => typeHandler(type, state, payload);

export default reducer;
