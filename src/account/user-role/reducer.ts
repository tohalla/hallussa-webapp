import { cond, equals, merge, T } from "ramda";
import { Reducer } from "redux";

import {
  FETCH_USER_ROLES_SUCCESS, UserRoleAction
} from "./actions";

const typeHandler = cond<any, any>([
  [equals(FETCH_USER_ROLES_SUCCESS), (type, state, payload) => merge(state, payload)],
  [T, (type, state, payload) => state],
]);

const reducer: Reducer<{[key: number]: any}, UserRoleAction> = (
  state = {},
  {payload, type}: UserRoleAction
) => typeHandler(type, state, payload);

export default reducer;
