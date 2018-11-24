import { append, assoc, assocPath, cond, dissoc, equals, merge, mergeWith, path, T, union, without } from "ramda";
import { Reducer } from "redux";

import { AppliancePayload, CREATE_APPLIANCE_SUCCESS, DELETE_APPLIANCE_SUCCESS } from "../appliance/actions";
import { CREATE_MAINTAINER_SUCCESS, MaintainerPayload } from "../maintainer/actions";
import {
  CREATE_ORGANISATION_SUCCESS,
  DELETE_ORGANISATIONS_SUCCESS,
  FETCH_ORGANISATIONS_SUCCESS,
  OrganisationAction,
  UPDATE_ORGANISATION_SUCCESS
} from "./actions";

const typeHandler = cond([
  [equals(FETCH_ORGANISATIONS_SUCCESS), (type, state, payload) => merge(state, payload)],
  [equals(DELETE_ORGANISATIONS_SUCCESS), (type, state, payload, organisation) => dissoc(organisation.id, state)],
  [equals(CREATE_ORGANISATION_SUCCESS), (type, state, payload) => payload.id ?
    assoc(String(payload.id), payload, state) : state,
  ],
  [equals(UPDATE_ORGANISATION_SUCCESS),(type, state, payload) => payload.id ?
    assoc(
      String(payload.id),
      mergeWith(
        (as, bs) => Array.isArray(as) ? union(as, bs) : as,
        payload,
        state[String(payload.id)]
      ),
      state
    ) : state,
  ],
  [equals(CREATE_APPLIANCE_SUCCESS), (type, state, {organisation, id}: AppliancePayload) => {
    if (id && organisation) {
      const appliances = [String(organisation), "appliances"];
      return assocPath(appliances, append(id, path(appliances, state) || []), state);
    }
    return state;
  }], // connect newly created appliance to organisation
  [equals(DELETE_APPLIANCE_SUCCESS), (type, state, payload, appliance) => {
    const appliances = [String(appliance.organisation), "appliances"];
    return assocPath(appliances, without([appliance.id], path(appliances, state) || []), state);
  }],
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
  {payload, type, extra}: OrganisationAction
) =>
  typeHandler(type, state, payload, extra);

export default reducer;
