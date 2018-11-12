import { cond, T } from "ramda";
import { AnyAction, Reducer } from "redux";

import { anyEquals } from "../util/utilityFunctions";
import {
  FETCH_ORGANISATIONS_FAILURE,
  FETCH_ORGANISATIONS_REQUEST,
  FETCH_ORGANISATIONS_SUCCESS,
} from "./actions";

const typeHandler = cond([
  [anyEquals<symbol>([
    FETCH_ORGANISATIONS_SUCCESS,
    FETCH_ORGANISATIONS_REQUEST,
    FETCH_ORGANISATIONS_FAILURE,
  ]), (type, state, payload) => payload],
  [T, (type, state, payload) => state],
]);

const reducer: Reducer = (state = null, {payload, type}: AnyAction) =>
  typeHandler(type, state, payload);

export default reducer;
