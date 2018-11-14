import { cond, merge, T } from "ramda";
import { Reducer } from "redux";

import { anyEquals } from "../util/utilityFunctions";
import {
  FETCH_ORGANISATIONS_FAILURE,
  FETCH_ORGANISATIONS_REQUEST,
  FETCH_ORGANISATIONS_SUCCESS,
  OrganisationAction,
} from "./actions";

const typeHandler = cond([
  [anyEquals([
    FETCH_ORGANISATIONS_SUCCESS,
    FETCH_ORGANISATIONS_REQUEST,
    FETCH_ORGANISATIONS_FAILURE,
  ]), (type, state, payload) => merge(state, payload)],
  [T, (type, state, payload) => state],
]);

const reducer: Reducer<object, OrganisationAction> = (
  state = {},
  {payload, type}: OrganisationAction
) =>
  typeHandler(type, state, payload);

export default reducer;
