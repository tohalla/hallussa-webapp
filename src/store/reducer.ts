import { assoc, cond, equals, T as True } from "ramda";
import { combineReducers, Reducer } from "redux";

import { SET_ACTIVE_ACCOUNT } from "../account/actions";
import accounts from "../account/reducer";
import { SET_ACTIVE_USER_ROLE } from "../account/user-role/actions";
import userRoles from "../account/user-role/reducer";
import appliances from "../appliance/reducer";
import views from "../component/tabbed/reducer";
import maintainers from "../maintainer/reducer";
import { DELETE_ORGANISATIONS_SUCCESS, OrganisationPayload, SET_ACTIVE_ORGANISATION } from "../organisation/actions";
import organisations from "../organisation/reducer";
import activeRequests from "./middleware/api/reducer";

const typeHandler = cond<any, SessionState>([
  [equals(SET_ACTIVE_ACCOUNT), (type, state, payload) => assoc("activeAccount", payload, state)],
  [equals(SET_ACTIVE_ORGANISATION), (type, state, payload) => assoc("activeOrganisation", payload, state)],
  [equals(SET_ACTIVE_USER_ROLE), (type, state, payload) => assoc("activeUserRole", payload, state)],
  [equals(DELETE_ORGANISATIONS_SUCCESS), (type, state, payload, organisation: OrganisationPayload) =>
    organisation && organisation.id === state.activeOrganisation ?
      assoc("activeOrganisation", undefined, state) : state,
  ],
  [True, (type, state, payload) => state],
]);

export interface EntityGroup<T> {
  [key: string]: T;
}

export interface SessionState {
  activeAccount?: number;
  activeOrganisation?: number;
}

const session: Reducer<SessionState> = (
  state = {}, {payload, type, extra}
) => typeHandler(type, state, payload, extra);

const entities = combineReducers({
  accounts,
  appliances,
  maintainers,
  organisations,
  userRoles,
});

export default combineReducers({
  activeRequests,
  entities,
  session,
  views,
});
