import { find } from "ramda";

import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { Omit } from "../../../misc";
import { CALL_API } from "../../store/middleware/api/actions";
import { ReduxAPICall } from "../../store/middleware/api/api";
import { ReduxState } from "../../store/store";

export const FETCH_USER_ROLES_SUCCESS = "FETCH_USER_ROLES_SUCCESS";
export const SET_ACTIVE_USER_ROLE = "SET_ACTIVE_USER_ROLE";

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
  allowManageUsers: boolean;
  allowUpdateAppliance: boolean;
  allowUpdateMaintainer: boolean;
  allowUpdateOrganisation: boolean;
  isShared: boolean;
}

export type UserRoleRights = Omit<
  UserRolePayload,
  "id" | "name" | "isShared" | "organisation"
> | {[key: string]: false};

export interface UserRoleAction {
  type: string;
  payload: UserRolePayload;
}

export const fetchRoles = (organisation?: number, {bypassCache = false} = {}): ReduxAPICall => ({
  endpoint: typeof organisation === "undefined" ? "/user-roles" : `/organisations/${organisation}/user-roles`,
  method: "get",
  successType: FETCH_USER_ROLES_SUCCESS,
  type: CALL_API,
});

export const updateActiveUserRole: ThunkAction<any, ReduxState, any, AnyAction> = (dispatch, getState) => {
  const {entities: {organisations}, session: {activeAccount, activeOrganisation}} = getState();
  if (activeAccount && activeOrganisation) {
    const joinRelation = find(
      ({account}) => String(account) === String(activeAccount),
      organisations[activeOrganisation].accounts || []
    );
    if (joinRelation) {
      return dispatch({
        payload: joinRelation.userRole,
        type: SET_ACTIVE_USER_ROLE,
      });
    }
  }

  return dispatch({
    type: SET_ACTIVE_USER_ROLE,
  });
};
