import { MaintainerPayload } from "../../maintainer/actions";
import { CALL_API } from "../../store/middleware/api/actions";
import { ReduxAPICall } from "../../store/middleware/api/api";

export const FETCH_MAINTENANCE_TASK_SUCCESS = "FETCH_MAINTENANCE_TASK_SUCCESS";
// export const UPDATE_MAINTENANCE_TASK_SUCCESS = "UPDATE_MAINTENANCE_TASK_SUCCESS";
// export const DELETE_MAINTENANCE_TASK_SUCCESS = "DELETE_MAINTENANCE_TASK_SUCCESS";

export interface MaintenanceTaskPayload {
  updatedAt?: string;
  createdAt?: string;
  hash?: string;
  maintenanceEvent?: number;
  description?: string;
  maintainer?: number;
}

export interface MaintenanceTaskAction {
  type: string;
  payload: MaintenanceTaskPayload;
}

export const fetchMaintainerTasks = (
  maintainer: MaintainerPayload
): ReduxAPICall => ({
  endpoint: `/organisations/${maintainer.organisation}/maintainers/${maintainer.id}/maintenance-tasks`,
  method: "get",
  successType: FETCH_MAINTENANCE_TASK_SUCCESS,
  type: CALL_API,
});
