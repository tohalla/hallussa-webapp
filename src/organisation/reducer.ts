import { append, assoc, assocPath, cond, equals, merge, path, T } from "ramda";
import { Reducer } from "redux";

import { AppliancePayload, CREATE_APPLIANCE_SUCCESS } from "../appliance/actions";
import { CREATE_ORGANISATION_SUCCESS, FETCH_ORGANISATIONS_SUCCESS, OrganisationAction } from "./actions";

const typeHandler = cond([
  [equals(FETCH_ORGANISATIONS_SUCCESS), (type, state, payload) => merge(state, payload)],
  [equals(CREATE_ORGANISATION_SUCCESS), (type, state, payload) =>
    payload.id ? assoc(String(payload.id), payload, state) : state,
  ],
  [equals(CREATE_APPLIANCE_SUCCESS), (type, state, {organisation, id}: AppliancePayload) => {
    if (id && organisation) {
      const appliances = [String(organisation), "appliances"];
      return assocPath(appliances, append(id, path(appliances, state) || []), state);
    }
    return state;
  }], // connect newly created appliance to organisation
  [T, (type, state, payload) => state],
]);

const reducer: Reducer<{[key: number]: any}, OrganisationAction> = (
  state = {},
  {payload, type}: OrganisationAction
) =>
  typeHandler(type, state, payload);

export default reducer;
