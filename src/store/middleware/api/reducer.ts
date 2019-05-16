import { assocPath, dissocPath } from "ramda";

import {
  APIResponseAction,
  APIResponsePayload,
  CALL_API,
  CALL_API_FAILURE,
  CALL_API_SUCCESS
} from "./actions";
import { APIMethods } from "./api";

export type RequestsState = {
  [key in APIMethods]: {[key: string]: APIResponsePayload}
};

const entityHandlers: {
  [k: string]: (state: RequestsState, action: APIResponseAction) => RequestsState
} = {
  [CALL_API]: (state, {payload, method, endpoint}) => assocPath([method, endpoint], payload, state),
  [CALL_API_FAILURE]: (state, {payload, method, endpoint}) => assocPath([method, endpoint], payload, state),
  [CALL_API_SUCCESS]: (state, {payload, method, endpoint}) => dissocPath([method, endpoint], state),
};

export default (state = {delete: {}, get: {}, patch: {}, post: {}}, action: APIResponseAction) =>
  action.type in entityHandlers ? entityHandlers[action.type](state, action) : state;
