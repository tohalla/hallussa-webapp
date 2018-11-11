import { path } from "ramda";
import { Action, Dispatch, Middleware } from "redux";

import { getAndCheckJWT } from "../../auth/auth";
import { apiUrl } from "../../config";

export interface ReduxAPICall extends Action {
  endpoint: string;
  method: "POST" | "GET" | "PUT" | "DEL";
  types: [symbol, symbol, symbol]; // [REQUEST, SUCCESS, FAILURE]
  body?: object;
}

/**
 * returns true if action can be interpreted as API call
 */
const isApiCall = (action: Action) =>
  typeof path(["endpoint"], action) === "string" &&
  Array.isArray(path(["types"], action)) &&
  typeof path(["method"], action) === "string";

const api: Middleware = () => (next: Dispatch) => (action: Action) => {
  if (!isApiCall(action)) {
    return next(action); // should continue if not api call
  }

  return (async () => {
    const {
      endpoint,
      method,
      types: [requestType, successType, failureType],
      body,
    } = action as ReduxAPICall;
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
        next({ type: successType, payload: await response.json() }); // dispatch success action
      } else {
        throw new Error("failed to fetch");
      }
    } catch (e) {
      next({type: failureType, payload: e}); // dispatch failure action
    }

    return next(action);
  })();
};

export default api;
