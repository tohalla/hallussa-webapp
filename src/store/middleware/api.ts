import { indexBy, path } from "ramda";
import { Action, Dispatch, Middleware } from "redux";

import { getAndCheckJWT } from "../../auth/auth";
import { apiUrl } from "../../config";

export const CALL_API = Symbol("CALL_API");

export type ResponsePayload<T = string | number> = {[key: string]: T;}
  | Array<{[key: string]: T;}>;

export interface ReduxAPICall extends Action {
  endpoint: string;
  method: "POST" | "GET" | "PUT" | "DEL";
  types: [symbol, symbol, symbol]; // [REQUEST, SUCCESS, FAILURE]
  body?: {[key: string]: any};
  attemptToFetchFromStore?(state: {[key: string]: any}): any;
  transformResponse?(response: ResponsePayload): ResponsePayload;
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
      transformResponse = (response: ResponsePayload) => {
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
      const response = attemptToFetchFromStore(getState());
      if (response) {
        return next({
          payload: response,
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
        return next({
          payload: transformResponse((await response.json())),
          type: successType,
        }); // dispatch success action
      } else {
        throw new Error("failed to fetch");
      }
    } catch (e) {
      return next({type: failureType, payload: e}); // dispatch failure action
    }
  })();
};

export default api;
