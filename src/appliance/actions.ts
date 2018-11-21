import { find } from "ramda";
import { Dispatch } from "redux";
import { APIResponseAction, CALL_API } from "../store/middleware/api/actions";
import { ReduxAPICall } from "../store/middleware/api/api";

export const FETCH_APPLIANCES_SUCCESS = "FETCH_APPLIANCES_SUCCESS";
export const CREATE_APPLIANCE_SUCCESS = "CREATE_APPLIANCE_SUCCESS";

export interface AppliancePayload {
  createdAt: string;
  hash: string;
  id: number;
  maintainers: ReadonlyArray<number>;
  name: string;
  description: string;
  organisation: number;
  updatedAt: string;
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

export const createAppliance = (organisation: number, appliance: AppliancePayload) => async (dispatch: Dispatch) => {
  const response = await dispatch<APIResponseAction<AppliancePayload>>({
    body: appliance,
    endpoint: `/organisations/${organisation}/appliances`,
    method: "post",
    successType: CREATE_APPLIANCE_SUCCESS,
    type: CALL_API,
  });
  return response.payload as AppliancePayload;
};
