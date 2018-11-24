import { assoc, assocPath, concat, cond, dissoc, equals, merge, mergeWith, path, T, union, without } from "ramda";
import { Reducer } from "redux";

import {
  ApplianceAction,
  ASSING_MAINTAINER_TO_APPLIANCE_SUCCESS,
  CREATE_APPLIANCE_SUCCESS,
  DELETE_APPLIANCE_SUCCESS,
  FETCH_APPLIANCES_SUCCESS,
  REMOVE_MAINTAINER_FROM_APPLIANCE_SUCCESS,
  UPDATE_APPLIANCE_SUCCESS
} from "./actions";

const typeHandler = cond([
  [equals(FETCH_APPLIANCES_SUCCESS), (type, state, payload) => merge(state, payload)],
  [equals(CREATE_APPLIANCE_SUCCESS), (type, state, payload) =>
    payload.id ? assoc(String(payload.id), payload, state) : state,
  ],
  [equals(REMOVE_MAINTAINER_FROM_APPLIANCE_SUCCESS), (type, state, payload, {appliance, maintainer}) => {
    if (appliance && maintainer) {
      const maintainers = [String(appliance), "maintainers"];
      return assocPath(
        maintainers,
        without([maintainer], path(maintainers, state) || []),
        state
      );
    }
    return state;
  }],
  [equals(UPDATE_APPLIANCE_SUCCESS),(type, state, payload) => payload.id ?
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
  [equals(DELETE_APPLIANCE_SUCCESS), (type, state, payload, appliance) => dissoc(String(appliance.id), state)],
  [equals(ASSING_MAINTAINER_TO_APPLIANCE_SUCCESS), (type, state, payload, {appliance, maintainer}) => {
    if (appliance && maintainer) {
      const maintainers = [String(appliance), "maintainers"];
      return assocPath(
        maintainers,
        concat([maintainer], path(maintainers, state) || []),
        state
      );
    }
    return state;
  }],
  [T, (type, state, payload) => state],
]);

const reducer: Reducer<{[key: number]: any}, ApplianceAction> = (
  state = {},
  {payload, type, extra}: ApplianceAction
) => typeHandler(type, state, payload, extra);

export default reducer;
