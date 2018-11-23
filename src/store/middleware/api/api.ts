import { indexBy, map } from "ramda";
import { Action, Dispatch, Middleware } from "redux";

import { apiUrl } from "../../../config";
import { authenticatedFetch } from "../../../util/utilityFunctions";
import { ReduxState } from "../../store";
import { APIResponseAction, CALL_API, CALL_API_FAILURE, CALL_API_SUCCESS } from "./actions";

export type APIMethods = "post" | "get" | "patch" | "delete";

export interface ReduxAPICall extends Action {
  endpoint: string;
  method: APIMethods;
  successType: string;
  type: "CALL_API";
  parameters?: {[key: string]: string};
  body?: {[key: string]: any};
  extra?: object; // additional data to send on success
  onSuccess?(payload: any, cached: boolean): any; // get triggered on succesfull response
  onFailure?(payload: any): any; // gets triggered if the request fails
  attemptToFetchFromStore?(state: ReduxState): any;
  transformResponse?(response: any): any; // writes returned object to the store
}

/**
 * returns true if action can be interpreted as API call
 */
const isValid = ({endpoint, successType, method}: {[key: string]: any}) =>
  typeof endpoint === "string" &&
  typeof successType === "string" &&
  typeof method === "string";

const api: Middleware = ({getState}) => (next: Dispatch) => (action: Action) => {
  if (action.type !== CALL_API) {
    return next(action); // should continue if not api call
  } else if (!isValid(action)) {
    throw new Error("Invalid api call " + JSON.stringify(action));
  }
  return (async () => {
    const {
      attemptToFetchFromStore,
      endpoint,
      method,
      extra,
      successType,
      body,
      onSuccess,
      onFailure,
      parameters,
      transformResponse = (originalResopnse: any): any => {
        if (Array.isArray(originalResopnse)) {
          return indexBy(
            ((o: {[key: string]: any}) => o.id || o.hash),
            originalResopnse
          );
        }
        return originalResopnse;
      },
    } = action as ReduxAPICall;

    if (typeof attemptToFetchFromStore === "function") {
      const cached = attemptToFetchFromStore(getState());
      if (cached) {
        // trigger onSuccess if defined
        if (typeof onSuccess === "function") { onSuccess(cached, true); }
        return next({
          payload: cached,
          type: successType,
        }); // dispatch success action
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
      next({payload: transformResponse(payload), type: successType, extra}); // dispatch success for request action
      next<APIResponseAction>({ // dispatch api success action
        endpoint,
        method,
        type: CALL_API_SUCCESS,
      });
      if (typeof onSuccess === "function") { await onSuccess(payload, false); }
      return {payload};
    } else {
      if (typeof onFailure === "function") { onFailure("failed to fetch"); }
      next({
        endpoint,
        method,
        payload: {isFetching: false, error: "Failed to fetch"},
        type: CALL_API_FAILURE,
      }); // dispatch failure action
    }
  })();
};

export default api;
