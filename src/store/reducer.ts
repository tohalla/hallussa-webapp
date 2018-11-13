import { cond, equals, merge, T } from "ramda";
import { AnyAction, combineReducers, Reducer } from "redux";

import { SET_ACTIVE_ACCOUNT } from "../account/actions";
import accounts from "../account/reducer";
import organisations from "../organisation/reducer";

const typeHandler = cond([
  [equals<symbol>(SET_ACTIVE_ACCOUNT), (type, state, payload) => merge(state, {activeAccount: payload})],
  [T, (type, state, payload) => state],
]);

const session: Reducer = (state = {}, {payload, type}: AnyAction) =>
  typeHandler(type, state, payload);

const entities = combineReducers({
  accounts,
  organisations,
});

export default combineReducers({
  entities,
  session,
});
