import { path } from "ramda";
import { CALL_API, ReduxAPICall } from "../store/middleware/api";

export const FETCH_APPLIANCES_REQUEST = Symbol("FETCH_APPLIANCES_REQUEST");
export const FETCH_APPLIANCES_SUCCESS = Symbol("FETCH_APPLIANCES_SUCCESS");
export const FETCH_APPLIANCES_FAILURE = Symbol("FETCH_APPLIANCES_FAILURE");

export const fetchAppliances = (organisation: number, {bypassCache = false} = {}): ReduxAPICall => ({
  attemptToFetchFromStore: bypassCache ? undefined : path(["entities", "appliances"]),
  endpoint: `/organisations/${organisation}/appliances`,
  method: "GET",
  type: CALL_API,
  types: [
    FETCH_APPLIANCES_REQUEST,
    FETCH_APPLIANCES_SUCCESS,
    FETCH_APPLIANCES_FAILURE,
  ],
});
