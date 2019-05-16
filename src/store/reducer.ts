import { assoc } from "ramda";
import { AnyAction, combineReducers, Reducer } from "redux";

import { SET_ACTIVE_ACCOUNT } from "../account/actions";
import accounts from "../account/reducer";
import { SET_ACTIVE_USER_ROLE } from "../account/user-role/actions";
import userRoles from "../account/user-role/reducer";
import appliances from "../appliance/reducer";
import views from "../component/tabbed/reducer";
import maintainers from "../maintainer/reducer";
import maintenanceTasks from "../maintenance/task/reducer";
import { SET_ACTIVE_ORGANISATION } from "../organisation/actions";
import organisations from "../organisation/reducer";
import activeRequests from "./middleware/api/reducer";

export interface EntityGroup<T> {
  [key: string]: T;
}

export interface SessionState {
  activeAccount?: number;
  activeOrganisation?: number;
}

const handlers: {[k: string]: (state: SessionState, action: AnyAction) => SessionState} = {
  [SET_ACTIVE_ACCOUNT]: (state, {payload}) => assoc("activeAccount", payload, state),
  [SET_ACTIVE_ORGANISATION]: (state, {payload}) => assoc("activeOrganisation", payload, state),
  [SET_ACTIVE_USER_ROLE]: (state, {payload}) => assoc("activeUserRole", payload, state),
};

const session: Reducer<SessionState> = (state = {}, action) =>
  action.type in handlers ? handlers[action.type](state, action) : state;

const entities = combineReducers({
  accounts,
  appliances,
  maintainers,
  maintenanceTasks,
  organisations,
  userRoles,
});

export default combineReducers({
  activeRequests,
  entities,
  session,
  views,
});
