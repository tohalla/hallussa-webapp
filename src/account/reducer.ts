import { cond, T } from "ramda";
import { Reducer } from "redux";

import { anyEquals } from "../util/utilityFunctions";
import {
  AccountAction,
  FETCH_ACCOUNT_FAILURE,
  FETCH_ACCOUNT_REQUEST,
  FETCH_ACCOUNT_SUCCESS,
} from "./actions";

const typeHandler = cond([
  [anyEquals([
    FETCH_ACCOUNT_SUCCESS,
    FETCH_ACCOUNT_REQUEST,
    FETCH_ACCOUNT_FAILURE,
  ]), (type, state, payload) => payload],
  [T, (type, state, payload) => state],
]);

const reducer: Reducer<{[key: number]: any}, AccountAction> = (
  state = {},
  {payload, type}: AccountAction
) =>
  typeHandler(type, state, payload);

export default reducer;
