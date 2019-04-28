import { find } from "ramda";
import { CALL_API } from "../../store/middleware/api/actions";
import { ReduxAPICall } from "../../store/middleware/api/api";

export const FETCH_USER_ROLES_SUCCESS = "FETCH_USER_ROLES_SUCCESS";

export interface UserRolePayload {
  id: number;
  name: string;
  organisation: number;
  allowCreateAppliance: boolean;
  allowCreateMaintainer: boolean;
  allowDeleteAppliance: boolean;
  allowDeleteMaintainer: boolean;
  allowDeleteOrganisation: boolean;
  allowManageMaintenanceTask: boolean;
  allowManageRoles: boolean;
  allowUpdateAppliance: boolean;
  allowUpdateMaintainer: boolean;
  allowUpdateOrganisation: boolean;
  isShared: boolean;
}

export interface UserRoleAction {
  type: string;
  payload: UserRolePayload;
}

export const fetchRoles = (organisation?: number, {bypassCache = false} = {}): ReduxAPICall => ({
  attemptToFetchFromStore: bypassCache || !organisation ? undefined : (state) =>
    state.entities.userRoles && !Boolean(find(// check if store contains all roles defined in organisation
      (userRole) => typeof state.entities.userRoles[userRole] === "undefined",
      state.entities.organisations[organisation].userRoles
    )),
  endpoint: typeof organisation === "undefined" ? "/user-roles" : `/organisations/${organisation}/user-roles`,
  method: "get",
  successType: FETCH_USER_ROLES_SUCCESS,
  type: CALL_API,
});
