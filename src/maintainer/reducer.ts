import { assoc, assocPath, concat, cond, equals, merge, path, T, without } from "ramda";
import { Reducer } from "redux";

import {
  ASSING_MAINTAINER_TO_APPLIANCE_SUCCESS,
  REMOVE_MAINTAINER_FROM_APPLIANCE_SUCCESS
} from "../appliance/actions";
import { CREATE_MAINTAINER_SUCCESS, FETCH_MAINTAINERS_SUCCESS, MaintainerAction } from "./actions";

const typeHandler = cond([
  [equals(FETCH_MAINTAINERS_SUCCESS), (type, state, payload) => merge(state, payload)],
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
