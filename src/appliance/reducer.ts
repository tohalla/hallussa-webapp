import { cond, merge, T } from "ramda";
import { Reducer } from "redux";

import { anyEquals } from "../util/utilityFunctions";
import {
  ApplianceAction,
  FETCH_APPLIANCES_FAILURE,
  FETCH_APPLIANCES_REQUEST,
  FETCH_APPLIANCES_SUCCESS,
} from "./actions";

const typeHandler = cond([
  [anyEquals([
    FETCH_APPLIANCES_SUCCESS,
    FETCH_APPLIANCES_REQUEST,
    FETCH_APPLIANCES_FAILURE,
  ]), (type, state, payload) => merge(state, payload)],
  [T, (type, state, payload) => state],
]);

const reducer: Reducer<object, ApplianceAction> = (
  state = {},
  {payload, type}: ApplianceAction
) =>
  typeHandler(type, state, payload);

export default reducer;
