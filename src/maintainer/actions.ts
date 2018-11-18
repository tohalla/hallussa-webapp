import { find } from "ramda";
import { CALL_API } from "../store/middleware/api/actions";
import { ReduxAPICall } from "../store/middleware/api/api";

export const FETCH_MAINTAINERS_SUCCESS = "FETCH_MAINTAINERS_SUCCESS";

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
  endpoint: `/organisations/${organisation}/maintainers`,
  method: "get",
  parameters: {eager: "appliances"},
  successType: FETCH_MAINTAINERS_SUCCESS,
  type: CALL_API,
});
