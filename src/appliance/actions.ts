import { find } from "ramda";
import { Dispatch } from "redux";
import { APIResponseAction, CALL_API } from "../store/middleware/api/actions";
import { ReduxAPICall } from "../store/middleware/api/api";

export const FETCH_APPLIANCES_SUCCESS = "FETCH_APPLIANCES_SUCCESS";
export const CREATE_APPLIANCE_SUCCESS = "CREATE_APPLIANCE_SUCCESS";
export const UPDATE_APPLIANCE_SUCCESS = "UPDATE_APPLIANCE_SUCCESS";
export const DELETE_APPLIANCE_SUCCESS = "DELETE_APPLIANCE_SUCCESS";

export const REMOVE_MAINTAINER_FROM_APPLIANCE_SUCCESS = "REMOVE_MAINTAINER_FROM_APPLIANCE_SUCCESS";
export const ASSING_MAINTAINER_TO_APPLIANCE_SUCCESS = "ASSING_MAINTAINER_TO_APPLIANCE_SUCCESS";

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
  extra?: object;
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

export const updateAppliance = (organisation: number, appliance: AppliancePayload) => async (dispatch: Dispatch) => {
  const response = await dispatch<APIResponseAction<AppliancePayload>>({
    body: appliance,
    endpoint: `/organisations/${organisation}/appliances/${appliance.id}`,
    method: "patch",
    successType: UPDATE_APPLIANCE_SUCCESS,
    type: CALL_API,
  });
  return response.payload as AppliancePayload;
};

export const deleteAppliance = (appliance: AppliancePayload): ReduxAPICall => ({
  body: appliance,
  endpoint: `/organisations/${appliance.organisation}/appliances/${appliance.id}`,
  extra: appliance,
  method: "delete",
  successType: DELETE_APPLIANCE_SUCCESS,
  type: CALL_API,
});

export const assignMaintainerToAppliance = (
  organisation: number,
  appliance: number,
  maintainer: number
): ReduxAPICall => ({
  endpoint: `/organisations/${organisation}/appliances/${appliance}/maintainers/${maintainer}`,
  extra: {appliance, maintainer},
  method: "post",
  successType: ASSING_MAINTAINER_TO_APPLIANCE_SUCCESS,
  type: CALL_API,
});

export const removeMaintainerFromAppliance = (
  organisation: number,
  appliance: number,
  maintainer: number
): ReduxAPICall => ({
  endpoint: `/organisations/${organisation}/appliances/${appliance}/maintainers/${maintainer}`,
  extra: {appliance, maintainer},
  method: "delete",
  successType: REMOVE_MAINTAINER_FROM_APPLIANCE_SUCCESS,
  type: CALL_API,
});
