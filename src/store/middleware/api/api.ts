import { indexBy } from "ramda";
import { Action, Dispatch, Middleware } from "redux";

import { getAndCheckJWT } from "../../../auth/auth";
import { apiUrl } from "../../../config";
import { ReduxState } from "../../store";
import { CALL_API, CALL_API_FAILURE, CALL_API_SUCCESS, RequestAction } from "./actions";

export type APIMethods = "post" | "get" | "patch" | "del";

export interface ReduxAPICall extends Action {
  endpoint: string;
  method: APIMethods;
  successType: string;
  type: "CALL_API";
  body?: {[key: string]: any};
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
      endpoint,
      method,
      successType,
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

    const headers: Record<string, string> = {
      ["content-type"]: "application/json",
    };

    const token = await getAndCheckJWT();
    // set relevant headers
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }

    next<RequestAction>({ // dispatch api request action
      endpoint,
      method,
      payload: {isFetching: true, requestedAt: Date.now()},
      type: CALL_API,
    });

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
        next<RequestAction>({ // dispatch api success action
          endpoint,
          method,
          type: CALL_API_SUCCESS,
        });
        return next({payload: transformResponse(payload), type: successType}); // dispatch success for request action
      } else {
        throw new Error("failed to fetch");
      }
    } catch (error) {
      if (typeof onFailure === "function") { onFailure(error); }
      return next({
        endpoint,
        method,
        payload: {isFetching: false, error},
        type: CALL_API_FAILURE,
      }); // dispatch failure action
    }
  })();
};

export default api;
