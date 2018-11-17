import { assocPath, cond, dissocPath, equals, merge, T } from "ramda";
import { Reducer } from "redux";

import { anyEquals } from "../../../util/utilityFunctions";
import {
  CALL_API,
  CALL_API_FAILURE,
  CALL_API_SUCCESS,
  RequestAction,
  RequestPayload
} from "./actions";
import { APIMethods } from "./api";

const typeHandler = cond([
  [
    anyEquals([CALL_API, CALL_API_FAILURE]),
    (type, state, method, endpoint, payload) => assocPath([method, endpoint], payload, state),
  ],
  [equals(CALL_API_SUCCESS), (type, state, method, endpoint) => dissocPath([method, endpoint], state)],
  [T, (type, state) => state],
]);

export type RequestsState = {
  [key in APIMethods]: {[key: string]: RequestPayload}
};

const reducer: Reducer<RequestsState, RequestAction> = (
  state = {del: {}, get: {}, patch: {}, post: {}},
  {payload, type, method, endpoint}: RequestAction
) => typeHandler(type, state, method, endpoint, payload);

export default reducer;
