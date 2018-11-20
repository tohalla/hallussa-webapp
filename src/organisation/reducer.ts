import { assoc, cond, equals, merge, T } from "ramda";
import { Reducer } from "redux";

import { CREATE_ORGANISATION_SUCCESS, FETCH_ORGANISATIONS_SUCCESS, OrganisationAction } from "./actions";

const typeHandler = cond([
  [equals(FETCH_ORGANISATIONS_SUCCESS), (type, state, payload) => merge(state, payload)],
  [equals(CREATE_ORGANISATION_SUCCESS), (type, state, payload) =>
    payload.id ? assoc(payload.id, payload, state) : state,
  ],
  [T, (type, state, payload) => state],
]);

const reducer: Reducer<{[key: number]: any}, OrganisationAction> = (
  state = {},
  {payload, type}: OrganisationAction
) =>
  typeHandler(type, state, payload);

export default reducer;
