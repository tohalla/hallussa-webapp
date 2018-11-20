import { assoc, cond, equals, merge, T } from "ramda";
import { Reducer } from "redux";

import { ApplianceAction, CREATE_APPLIANCE_SUCCESS, FETCH_APPLIANCES_SUCCESS } from "./actions";

const typeHandler = cond([
  [equals(FETCH_APPLIANCES_SUCCESS), (type, state, payload) => merge(state, payload)],
  [equals(CREATE_APPLIANCE_SUCCESS), (type, state, payload) =>
    payload.id ? assoc(String(payload.id), payload, state) : state,
  ],
  [T, (type, state, payload) => state],
]);

const reducer: Reducer<{[key: number]: any}, ApplianceAction> = (
  state = {},
  {payload, type}: ApplianceAction
) =>
  typeHandler(type, state, payload);

export default reducer;
