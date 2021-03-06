import { Method } from "axios";
import { map } from "ramda";
import { Action, Middleware } from "redux";

import { apiURL } from "../../../config";
import { authenticatedFetch, indexByKeys } from "../../../util/utilityFunctions";
import { EntitiesState, ReduxState } from "../../store";
import { APIResponseAction, CALL_API, CALL_API_FAILURE, CALL_API_SUCCESS } from "./actions";

export interface ReduxAPICall<T = any> extends Action {
  endpoint: string;
  url?: string;
  method: Method;
  body?: never; // should use data instead of body
  successType?: string;
  type: "CALL_API";
  parameters?: {[key: string]: string | number};
  data?: {[key: string]: any};
  additionalPayload?: object; // data to send on success, will be merged with actual payload (if any)
  onSuccess?(payload: T, cached: boolean): any; // get triggered on succesfull response
  onFailure?(payload: any): any; // gets triggered if the request fails
  attemptToFetchFromStore?(state: ReduxState): EntitiesState[keyof EntitiesState] | undefined | null;
  transformResponse?(response: any): any; // writes returned object to the store
}

/**
 * returns true if action can be interpreted as API call
 */
export const isValid = (payload: {[key: string]: any}): payload is ReduxAPICall =>
  typeof payload.endpoint === "string" &&
  typeof payload.method === "string";

const api: Middleware = ({getState}) => (next) => (action) => {
  if (action.type !== CALL_API) {
    return next(action); // should continue if not api call
  } else if (!isValid(action)) {
    throw new Error("Invalid api call " + JSON.stringify(action));
  }
  return (async () => {
    const {
      additionalPayload,
      attemptToFetchFromStore,
      endpoint,
      method,
      successType,
      data,
      onSuccess,
      onFailure,
      parameters,
      url = apiURL,
      transformResponse = indexByKeys(["id", "hash"]),
    } = action as ReduxAPICall;

    if (typeof attemptToFetchFromStore === "function") {
      const cached = attemptToFetchFromStore(getState());
      if (cached) {
        // trigger onSuccess if defined
        if (typeof onSuccess === "function") { onSuccess(cached, true); }
        if (typeof successType === "string") {
          return next({
            payload: cached,
            type: successType,
          }); // dispatch success action
        }
      }
    }

    const headers: Record<string, string> = {
      ["content-type"]: "application/json",
    };

    next<APIResponseAction>({ // dispatch api request action
      endpoint,
      method,
      payload: {isFetching: true, requestedAt: Date.now()},
      type: CALL_API,
    });

    try {
      const response = await authenticatedFetch(`${url}${endpoint}${parameters ?
        "?" + map(
          (key) => `${key}=${String(parameters[key])}`,
          Object.keys(parameters)
        ).join("&") : ""
      }`, {data: data && JSON.stringify(data), headers, method});
      const payload = {...transformResponse(response.data), ...additionalPayload};

      // trigger onSuccess if defined
      if (typeof successType === "string") {
        next({ // dispatch success for request action, body as payload if nothing received from server
          payload,
          type: successType,
        });
      }
      next<APIResponseAction>({ // dispatch api success action
        endpoint,
        method,
        type: CALL_API_SUCCESS,
      });
      if (typeof onSuccess === "function") { await onSuccess(payload, false); }

      return payload;
    } catch (error) {
      const responseError = error && error.data && typeof error.data.text === "function" ?
        await error.data.text() : String(error);
      if (typeof onFailure === "function") { onFailure(responseError); }

      next({ // dispatch failure action
        endpoint,
        method,
        payload: {isFetching: false, error: responseError},
        type: CALL_API_FAILURE,
      });
    }
  })();
};

export default api;
