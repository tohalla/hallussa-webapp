import { append, assoc, assocPath, cond, equals, merge, path, T } from "ramda";
import { Reducer } from "redux";

import { AppliancePayload, CREATE_APPLIANCE_SUCCESS } from "../appliance/actions";
import { CREATE_MAINTAINER_SUCCESS, MaintainerPayload } from "../maintainer/actions";
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
  [equals(CREATE_MAINTAINER_SUCCESS), (type, state, {organisation, id}: MaintainerPayload) => {
    if (id && organisation) {
      const maintainers = [String(organisation), "maintainers"];
      return assocPath(maintainers, append(id, path(maintainers, state) || []), state);
    }
    return state;
  }], // connect newly created maintainer to organisation
  [T, (type, state, payload) => state],
]);

const reducer: Reducer<{[key: number]: any}, OrganisationAction> = (
  state = {},
  {payload, type}: OrganisationAction
) =>
  typeHandler(type, state, payload);

export default reducer;
