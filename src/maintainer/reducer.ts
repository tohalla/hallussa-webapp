import { cond, merge, T } from "ramda";
import { AnyAction, Reducer } from "redux";

import { anyEquals } from "../util/utilityFunctions";
import {
  FETCH_MAINTAINERS_FAILURE,
  FETCH_MAINTAINERS_REQUEST,
  FETCH_MAINTAINERS_SUCCESS,
  MaintainerAction,
} from "./actions";

const typeHandler = cond([
  [anyEquals([
    FETCH_MAINTAINERS_SUCCESS,
    FETCH_MAINTAINERS_REQUEST,
    FETCH_MAINTAINERS_FAILURE,
  ]), (type, state, payload) => merge(state, payload)],
  [T, (type, state, payload) => state],
]);

const reducer: Reducer<{[key: number]: any}, MaintainerAction> = (
  state = {},
  {payload, type}: MaintainerAction
) =>
  typeHandler(type, state, payload);

export default reducer;
