import { find } from "ramda";
import { CALL_API } from "../store/middleware/api/actions";
import { ReduxAPICall } from "../store/middleware/api/api";

export const FETCH_APPLIANCES_SUCCESS = "FETCH_APPLIANCES_SUCCESS";

export interface AppliancePayload {
  id: number;
  hash: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  maintainers: ReadonlyArray<number>;
}

export interface ApplianceAction {
  type: string;
  payload: AppliancePayload;
}

export const fetchAppliances = (organisation: number, {bypassCache = false} = {}): ReduxAPICall => ({
  attemptToFetchFromStore: bypassCache ? undefined : (state) =>
    !Boolean(find(// check if store contains all maintainers defined in organisation
      (appliance) => typeof state.entities.appliances[appliance] === "undefined",
      state.entities.organisations[organisation].appliances
    )) && state.entities.appliances,
  endpoint: `/organisations/${organisation}/appliances`,
  method: "get",
  parameters: {eager: "maintainers"},
  successType: FETCH_APPLIANCES_SUCCESS,
  type: CALL_API,
});
