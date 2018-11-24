import {
  assoc,
  assocPath,
  concat,
  cond,
  equals,
  map,
  merge,
  mergeWith,
  path,
  T,
  union,
  without,
 } from "ramda";
import { Reducer } from "redux";

import {
  ASSING_MAINTAINER_TO_APPLIANCE_SUCCESS,
  DELETE_APPLIANCE_SUCCESS,
  REMOVE_MAINTAINER_FROM_APPLIANCE_SUCCESS
} from "../appliance/actions";
import {
  CREATE_MAINTAINER_SUCCESS,
  FETCH_MAINTAINERS_SUCCESS,
  MaintainerAction,
  UPDATE_MAINTAINER_SUCCESS
} from "./actions";

const typeHandler = cond([
  [equals(FETCH_MAINTAINERS_SUCCESS), (type, state, payload) => merge(state, payload)],
  [equals(DELETE_APPLIANCE_SUCCESS), (type, state, payload, appliance) =>
    map(
      (maintainer) => assoc("appliances", without([appliance.id], maintainer.appliances), maintainer),
      state
    ),
  ],
  [equals(CREATE_MAINTAINER_SUCCESS), (type, state, payload) =>
    payload.id ? assoc(String(payload.id), payload, state) : state,
  ],
  [equals(REMOVE_MAINTAINER_FROM_APPLIANCE_SUCCESS), (type, state, payload, {appliance, maintainer}) => {
    if (appliance && maintainer) {
      const appliances = [String(maintainer), "appliances"];
      return assocPath(
        appliances,
        without([appliance], path(appliances, state) || []),
        state
      );
    }
    return state;
  }],
  [equals(UPDATE_MAINTAINER_SUCCESS),(type, state, payload) => payload.id ?
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
  [equals(ASSING_MAINTAINER_TO_APPLIANCE_SUCCESS), (type, state, payload, {appliance, maintainer}) => {
    if (appliance && maintainer) {
      const appliances = [String(maintainer), "appliances"];
      return assocPath(
        appliances,
        concat([appliance], path(appliances, state) || []),
        state
      );
    }
    return state;
  }],
  [T, (type, state, payload) => state],
]);

const reducer: Reducer<{[key: number]: any}, MaintainerAction> = (
  state = {},
  {payload, type, extra}: MaintainerAction
) => typeHandler(type, state, payload, extra);

export default reducer;
