import { assocPath, cond, dissocPath, equals, merge, T } from "ramda";
import { Reducer } from "redux";

import { anyEquals } from "../../../util/utilityFunctions";
import {
  APIResponseAction,
  APIResponsePayload,
  CALL_API,
  CALL_API_FAILURE,
  CALL_API_SUCCESS
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
  [key in APIMethods]: {[key: string]: APIResponsePayload}
};

const reducer: Reducer<RequestsState, APIResponseAction> = (
  state = {del: {}, get: {}, patch: {}, post: {}},
  {payload, type, method, endpoint}: APIResponseAction
) => typeHandler(type, state, method, endpoint, payload);

export default reducer;
