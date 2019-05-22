import { indexBy, map } from "ramda";
import { Action, Dispatch, Middleware } from "redux";

import { apiUrl } from "../../../config";
import { authenticatedFetch } from "../../../util/utilityFunctions";
import { EntitiesState, ReduxState } from "../../store";
import { APIResponseAction, CALL_API, CALL_API_FAILURE, CALL_API_SUCCESS } from "./actions";

export type APIMethods = "post" | "put" | "get" | "patch" | "delete";

export interface ReduxAPICall<T = any> extends Action {
  endpoint: string;
  method: APIMethods;
  successType?: string;
  type: "CALL_API";
  parameters?: {[key: string]: string | number};
  body?: {[key: string]: any};
  additionalPayload?: object; // data to send on success, will be merged with actual payload (if any)
  onSuccess?(payload: T, cached: boolean): any; // get triggered on succesfull response
  onFailure?(payload: any): any; // gets triggered if the request fails
  attemptToFetchFromStore?(state: ReduxState): EntitiesState[keyof EntitiesState] | undefined | null;
  transformResponse?(response: any): any; // writes returned object to the store
}

/**
 * returns true if action can be interpreted as API call
 */
const isValid = (payload: {[key: string]: any}): payload is ReduxAPICall =>
  typeof payload.endpoint === "string" &&
  typeof payload.method === "string";

const api: Middleware = ({getState}) => (next: Dispatch) => (action: Action) => {
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
      body,
      onSuccess,
      onFailure,
      parameters,
      transformResponse = (originalResponse: any): any => {
        if (Array.isArray(originalResponse)) {
          return indexBy(
            ((o: {[key: string]: any}) => o.id || o.hash),
            originalResponse
          );
        }
        return originalResponse;
      },
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

    const response = await authenticatedFetch(`${apiUrl}${endpoint}${parameters ?
      "?" + map(
        (key) => `${key}=${String(parameters[key])}`,
        Object.keys(parameters)
      ).join("+") : ""
    }`, {body: body && JSON.stringify(body), headers, method: method.toUpperCase()});
    if (response.ok) {
      // trigger onSuccess if defined
      let payload;
      try {
        payload = await response.json();
      } catch (e) {
        // no body used...
      }
      payload = typeof payload === "undefined" ? body || {} : transformResponse(payload);
      payload = {...payload, ...additionalPayload};
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
      return {payload};
    } else {
      const error = (await response.text()) || "Failed to fetch";
      if (typeof onFailure === "function") { onFailure(error); }
      next({
        endpoint,
        method,
        payload: {isFetching: false, error},
        type: CALL_API_FAILURE,
      }); // dispatch failure action
    }
  })();
};

export default api;
