import { Dispatch } from "redux";
import { CALL_API } from "../store/middleware/api/actions";
import { ReduxAPICall } from "../store/middleware/api/api";

export const FETCH_APPLIANCES_SUCCESS = "FETCH_APPLIANCES_SUCCESS";
export const CREATE_APPLIANCE_SUCCESS = "CREATE_APPLIANCE_SUCCESS";
export const UPDATE_APPLIANCE_SUCCESS = "UPDATE_APPLIANCE_SUCCESS";
export const DELETE_APPLIANCE_SUCCESS = "DELETE_APPLIANCE_SUCCESS";

export const REMOVE_MAINTAINER_FROM_APPLIANCE_SUCCESS = "REMOVE_MAINTAINER_FROM_APPLIANCE_SUCCESS";
export const ASSING_MAINTAINER_TO_APPLIANCE_SUCCESS = "ASSING_MAINTAINER_TO_APPLIANCE_SUCCESS";

export const UPDATE_APPLIANCE_STATUS = "UPDATE_APPLIANCE_STATUS";

export interface ApplianceStatus {
  appliance: number;
  averageMaintenanceTime: number;
  maintenanceEventCount: number;
  isMalfunctioning: boolean;
}

export interface AppliancePayload {
  createdAt: string;
  hash: string;
  id: number;
  maintainers: ReadonlyArray<number>;
  name: string;
  location?: string;
  description: string;
  organisation: number;
  updatedAt?: string;
  status?: ApplianceStatus;
  maintenanceEvents?: ReadonlyArray<number>;
}

export interface ApplianceAction {
  type: string;
  payload: AppliancePayload;
}

export const fetchAppliances = (organisation: number): ReduxAPICall => ({
  endpoint: `/organisations/${organisation}/appliances`,
  method: "get",
  parameters: {eager: "[maintainers,status]"},
  successType: FETCH_APPLIANCES_SUCCESS,
  type: CALL_API,
});

export const createAppliance = (
  organisation: number,
  appliance: AppliancePayload
) => (dispatch: Dispatch<ReduxAPICall>) => dispatch({
  data: appliance,
  endpoint: `/organisations/${organisation}/appliances`,
  method: "post",
  successType: CREATE_APPLIANCE_SUCCESS,
  type: CALL_API,
});

export const updateAppliance = (appliance: AppliancePayload) => (dispatch: Dispatch<ReduxAPICall>) => dispatch({
  data: appliance,
  endpoint: `/organisations/${appliance.organisation}/appliances/${appliance.id}`,
  method: "patch",
  successType: UPDATE_APPLIANCE_SUCCESS,
  type: CALL_API,
});

export const deleteAppliance = (appliance: AppliancePayload): ReduxAPICall => ({
  additionalPayload: appliance,
  data: appliance,
  endpoint: `/organisations/${appliance.organisation}/appliances/${appliance.id}`,
  method: "delete",
  successType: DELETE_APPLIANCE_SUCCESS,
  type: CALL_API,
});

export const assignMaintainerToAppliance = (
  organisation: number,
  appliance: number,
  maintainer: number
): ReduxAPICall => ({
  additionalPayload: {appliance, maintainer},
  endpoint: `/organisations/${organisation}/appliances/${appliance}/maintainers/${maintainer}`,
  method: "post",
  successType: ASSING_MAINTAINER_TO_APPLIANCE_SUCCESS,
  type: CALL_API,
});

export const removeMaintainerFromAppliance = (
  organisation: number,
  appliance: number,
  maintainer: number
): ReduxAPICall => ({
  additionalPayload: {appliance, maintainer},
  endpoint: `/organisations/${organisation}/appliances/${appliance}/maintainers/${maintainer}`,
  method: "delete",
  successType: REMOVE_MAINTAINER_FROM_APPLIANCE_SUCCESS,
  type: CALL_API,
});
