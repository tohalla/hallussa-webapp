import { find } from "ramda";
import { OrganisationPayload } from "../organisation/actions";
import { CALL_API, ReduxAPICall } from "../store/middleware/api";

export const FETCH_MAINTAINERS_REQUEST = "FETCH_MAINTAINERS_REQUEST";
export const FETCH_MAINTAINERS_SUCCESS = "FETCH_MAINTAINERS_SUCCESS";
export const FETCH_MAINTAINERS_FAILURE = "FETCH_MAINTAINERS_FAILURE";

export interface MaintainerPayload {
  id: number;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  appliances: ReadonlyArray<number>;
}

export interface MaintainerAction {
  type: string;
  payload: MaintainerPayload;
}

export const fetchMaintainers = (organisation: number, {bypassCache = false} = {}): ReduxAPICall => ({
  attemptToFetchFromStore: bypassCache ? undefined : (state) =>
    !Boolean(find(// check if store contains all maintainers defined in organisation
      (maintainer) => typeof state.entities.maintainers[maintainer] === "undefined",
      state.entities.organisations[organisation].maintainers
    )) && state.entities.maintainers,
  endpoint: `/organisations/${organisation}/maintainers?eager=appliances`,
  method: "GET",
  type: CALL_API,
  types: [
    FETCH_MAINTAINERS_REQUEST,
    FETCH_MAINTAINERS_SUCCESS,
    FETCH_MAINTAINERS_FAILURE,
  ],
});
