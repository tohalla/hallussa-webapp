import { AppliancePayload } from "../../appliance/actions";
import { CALL_API } from "../../store/middleware/api/actions";
import { ReduxAPICall } from "../../store/middleware/api/api";

export const FETCH_MAINTENANCE_EVENT_SUCCESS = "FETCH_MAINTENANCE_EVENT_SUCCESS";
// export const UPDATE_MAINTENANCE_EVENT_SUCCESS = "UPDATE_MAINTENANCE_EVENT_SUCCESS";
// export const DELETE_MAINTENANCE_EVENT_SUCCESS = "DELETE_MAINTENANCE_EVENT_SUCCESS";

export interface MaintenanceEventPayload {
  createdAt: string;
  description: string;
  resolvedAt: string;
  assignedTo: number;
}

export interface MaintenanceEventAction {
  type: string;
  payload: MaintenanceEventPayload;
}

export const fetchApplianceEvents = (appliance: AppliancePayload): ReduxAPICall => ({
  endpoint: `/organisations/${appliance.organisation}/appliances/${appliance.id}/maintenance-events`,
  method: "get",
  successType: FETCH_MAINTENANCE_EVENT_SUCCESS,
  type: CALL_API,
});
