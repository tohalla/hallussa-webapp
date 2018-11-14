import { indexBy, path } from "ramda";
import { Action, Dispatch, Middleware } from "redux";

import { getAndCheckJWT } from "../../auth/auth";
import { apiUrl } from "../../config";

export const CALL_API = "CALL_API";

export interface ReduxAPICall extends Action {
  endpoint: string;
  method: "POST" | "GET" | "PUT" | "DEL";
  types: [string, string, string]; // [REQUEST, SUCCESS, FAILURE]
  body?: {[key: string]: any};
  onSuccess?(payload: any, cached: boolean): any; // get triggered on succesfull response
  onFailure?(payload: any): any; // gets triggered if the request fails
  attemptToFetchFromStore?(state: {[key: string]: any}): any;
  transformResponse?(response: any): any; // writes returned object to the store
}

/**
 * returns true if action can be interpreted as API call
 */
const isValid = ({endpoint, types, method}: {[key: string]: any}) =>
typeof endpoint === "string" &&
Array.isArray(types) &&
typeof method === "string";

const api: Middleware = ({getState}) => (next: Dispatch) => (action: Action) => {
  if (action.type !== CALL_API) {
    return next(action); // should continue if not api call
  } else if (!isValid(action)) {
    throw new Error("Invalid api call " + JSON.stringify(action));
  }
  return (async () => {
    const {
      endpoint,
      method,
      types: [requestType, successType, failureType],
      body,
      onSuccess,
      onFailure,
      transformResponse = (response: any): any => {
        if (Array.isArray(response)) {
          return indexBy(
            ((o: {[key: string]: any}) => o.id || o.hash),
            response
          );
        }
        return response;
      },
      attemptToFetchFromStore,
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

    next({type: requestType, payload: {isFetching: true}}); // dispatch request action

    const headers: Record<string, string> = {
      ["content-type"]: "application/json",
    };

    const token = await getAndCheckJWT();
    // set relevant headers
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${apiUrl}${endpoint}`, {
        body: body && JSON.stringify(body),
        headers,
        method,
      });
      if (response.ok) {
        // trigger onSuccess if defined
        const payload = await response.json();
        if (typeof onSuccess === "function") { onSuccess(payload, false); }
        return next({type: successType, payload: transformResponse(payload)}); // dispatch success action
      } else {
        throw new Error("failed to fetch");
      }
    } catch (e) {
      if (typeof onFailure === "function") { onFailure(e); }
      return next({type: failureType, payload: e}); // dispatch failure action
    }
  })();
};

export default api;
