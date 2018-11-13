import { path } from "ramda";
import { CALL_API, ReduxAPICall } from "../store/middleware/api";

export const FETCH_MAINTAINERS_REQUEST = Symbol("FETCH_MAINTAINERS_REQUEST");
export const FETCH_MAINTAINERS_SUCCESS = Symbol("FETCH_MAINTAINERS_SUCCESS");
export const FETCH_MAINTAINERS_FAILURE = Symbol("FETCH_MAINTAINERS_FAILURE");

export const fetchMaintainers = (organisation: number, {bypassCache = false} = {}): ReduxAPICall => ({
  attemptToFetchFromStore: bypassCache ? undefined : path(["entities", "maintainers"]),
  endpoint: `/organisations/${organisation}/maintainers`,
  method: "GET",
  type: CALL_API,
  types: [
    FETCH_MAINTAINERS_REQUEST,
    FETCH_MAINTAINERS_SUCCESS,
    FETCH_MAINTAINERS_FAILURE,
  ],
});
