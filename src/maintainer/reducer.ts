import { cond, merge, T } from "ramda";
import { AnyAction, Reducer } from "redux";

import { anyEquals } from "../util/utilityFunctions";
import {
  FETCH_MAINTAINERS_FAILURE,
  FETCH_MAINTAINERS_REQUEST,
  FETCH_MAINTAINERS_SUCCESS,
} from "./actions";

const typeHandler = cond([
  [anyEquals<symbol>([
    FETCH_MAINTAINERS_SUCCESS,
    FETCH_MAINTAINERS_REQUEST,
    FETCH_MAINTAINERS_FAILURE,
  ]), (type, state, payload) => merge(state, payload)],
  [T, (type, state, payload) => state],
]);

const reducer: Reducer = (state = null, {payload, type}: AnyAction) =>
  typeHandler(type, state, payload);

export default reducer;
