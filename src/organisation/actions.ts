import { path } from "ramda";
import { CALL_API, ReduxAPICall } from "../store/middleware/api";

export const FETCH_ORGANISATIONS_REQUEST = Symbol("FETCH_ORGANISATIONS_REQUEST");
export const FETCH_ORGANISATIONS_SUCCESS = Symbol("FETCH_ORGANISATIONS_SUCCESS");
export const FETCH_ORGANISATIONS_FAILURE = Symbol("FETCH_ORGANISATIONS_FAILURE");

export const fetchOrganisations = (bypassCache = false): ReduxAPICall => ({
  attemptToFetchFromStore: bypassCache ? undefined : path(["byID", "organisations"]),
  endpoint: "/organisations",
  method: "GET",
  type: CALL_API,
  types: [
    FETCH_ORGANISATIONS_REQUEST,
    FETCH_ORGANISATIONS_SUCCESS,
    FETCH_ORGANISATIONS_FAILURE,
  ],
});
