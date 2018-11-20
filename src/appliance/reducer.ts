import { cond, equals, merge, T } from "ramda";
import { Reducer } from "redux";

import { ApplianceAction,FETCH_APPLIANCES_SUCCESS } from "./actions";

const typeHandler = cond([
  [equals(FETCH_APPLIANCES_SUCCESS), (type, state, payload) => merge(state, payload)],
  [T, (type, state, payload) => state],
]);

const reducer: Reducer<{[key: number]: any}, ApplianceAction> = (
  state = {},
  {payload, type}: ApplianceAction
) =>
  typeHandler(type, state, payload);

export default reducer;
