import { cond, equals, merge, T } from "ramda";
import { Reducer } from "redux";

import { FETCH_MAINTAINERS_SUCCESS, MaintainerAction } from "./actions";

const typeHandler = cond([
  [equals(FETCH_MAINTAINERS_SUCCESS), (type, state, payload) => merge(state, payload)],
  [T, (type, state, payload) => state],
]);

const reducer: Reducer<{[key: number]: any}, MaintainerAction> = (
  state = {},
  {payload, type}: MaintainerAction
) =>
  typeHandler(type, state, payload);

export default reducer;
