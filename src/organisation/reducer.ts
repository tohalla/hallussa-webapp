import { cond, equals, merge, T } from "ramda";
import { Reducer } from "redux";

import { FETCH_ORGANISATIONS_SUCCESS, OrganisationAction } from "./actions";

const typeHandler = cond([
  [equals(FETCH_ORGANISATIONS_SUCCESS), (type, state, payload) => merge(state, payload)],
  [T, (type, state, payload) => state],
]);

const reducer: Reducer<{[key: number]: any}, OrganisationAction> = (
  state = {},
  {payload, type}: OrganisationAction
) =>
  typeHandler(type, state, payload);

export default reducer;
