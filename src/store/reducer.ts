import { cond, equals, merge, T as True } from "ramda";
import { AnyAction, combineReducers, Reducer } from "redux";

import { SET_ACTIVE_ACCOUNT } from "../account/actions";
import accounts from "../account/reducer";
import appliances from "../appliance/reducer";
import views from "../component/tabbed/reducer";
import maintainers from "../maintainer/reducer";
import { SET_ACTIVE_ORGANISATION } from "../organisation/actions";
import organisations from "../organisation/reducer";
import activeRequests from "./middleware/api/reducer";

const typeHandler = cond([
  [equals(SET_ACTIVE_ACCOUNT), (type, state, payload) => merge(state, {activeAccount: payload})],
  [equals(SET_ACTIVE_ORGANISATION), (type, state, payload) => merge(state, payload)],
  [True, (type, state, payload) => state],
]);

export interface EntityGroup<T> {
  [key: string]: T;
}

export interface SessionState {
  activeAccount?: number;
  activeOrganisation?: number;
}

const session: Reducer = (state: SessionState = {}, {payload, type, extra}: AnyAction) =>
  typeHandler(type, state, payload, extra);

const entities = combineReducers({
  accounts,
  appliances,
  maintainers,
  organisations,
});

export default combineReducers({
  activeRequests,
  entities,
  session,
  views,
});
