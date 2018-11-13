import { cond, merge, T } from "ramda";
import { AnyAction, Reducer } from "redux";

import { anyEquals } from "../util/utilityFunctions";
import {
  FETCH_APPLIANCES_FAILURE,
  FETCH_APPLIANCES_REQUEST,
  FETCH_APPLIANCES_SUCCESS,
} from "./actions";

const typeHandler = cond([
  [anyEquals<symbol>([
    FETCH_APPLIANCES_SUCCESS,
    FETCH_APPLIANCES_REQUEST,
    FETCH_APPLIANCES_FAILURE,
  ]), (type, state, payload) => merge(state, payload)],
  [T, (type, state, payload) => state],
]);

const reducer: Reducer = (state = null, {payload, type}: AnyAction) =>
  typeHandler(type, state, payload);

export default reducer;
