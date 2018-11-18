import { cond, equals, T } from "ramda";
import { Reducer } from "redux";

import { AccountAction, FETCH_ACCOUNT_SUCCESS } from "./actions";

const typeHandler = cond([
  [equals(FETCH_ACCOUNT_SUCCESS), (type, state, payload) => payload],
  [T, (type, state, payload) => state],
]);

const reducer: Reducer<{[key: number]: any}, AccountAction> = (
  state = {},
  {payload, type}: AccountAction
) =>
  typeHandler(type, state, payload);

export default reducer;
