import { isEmpty } from "ramda";
import { AnyAction, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { fetchAccounts } from "../account/actions";
import { updateActiveUserRole } from "../account/user-role/actions";
import { fetchAppliances } from "../appliance/actions";
import { resetTabs } from "../component/tabbed/actions";
import { fetchMaintainers } from "../maintainer/actions";
import { APIResponseAction, CALL_API } from "../store/middleware/api/actions";
import { ReduxAPICall } from "../store/middleware/api/api";
import { ReduxState } from "../store/store";

export const CREATE_ORGANISATION_SUCCESS = "CREATE_ORGANISATION_SUCCESS";
export const UPDATE_ORGANISATION_SUCCESS = "UPDATE_ORGANISATION_SUCCESS";
export const FETCH_ORGANISATIONS_SUCCESS = "FETCH_ORGANISATIONS_SUCCESS";
export const DELETE_ORGANISATIONS_SUCCESS = "DELETE_ORGANISATIONS_SUCCESS";
export const SET_ACTIVE_ORGANISATION = "SET_ACTIVE_ORGANISATION";

export interface OrganisationPayload {
  id: number;
  name: string;
  organisationIdentifier: string;
  createdAt: string;
  updatedAt: string;
  maintainers: ReadonlyArray<number>;
  appliances: ReadonlyArray<number>;
  userRoles: ReadonlyArray<number>;
  accounts: ReadonlyArray<{id: number, userRole: number}>;
}

export interface OrganisationAction {
  type: string;
  extra: object;
  payload: OrganisationPayload;
}

export const fetchOrganisations = ({bypassCache = false} = {}): ReduxAPICall => ({
  attemptToFetchFromStore: bypassCache ? undefined : (state) =>
    !isEmpty(state.entities.organisations) && state.entities.organisations,
  endpoint: "/organisations",
  method: "get",
  parameters: {eager: "[accounts,maintainers,appliances,userRoles]"},
  successType: FETCH_ORGANISATIONS_SUCCESS,
  type: CALL_API,
});

export const createOrganisation = (organisation: OrganisationPayload) => async (dispatch: Dispatch) => {
  const response = await dispatch<APIResponseAction<OrganisationPayload>>({
    body: organisation,
    endpoint: "/organisations",
    method: "post",
    successType: CREATE_ORGANISATION_SUCCESS,
    type: CALL_API,
  });
  return response.payload as OrganisationPayload;
};

export const updateOrganisation = (organisation: OrganisationPayload) => async (dispatch: Dispatch) => {
  const response = await dispatch<APIResponseAction<OrganisationPayload>>({
    body: organisation,
    endpoint: `/organisations/${organisation.id}`,
    method: "patch",
    successType: UPDATE_ORGANISATION_SUCCESS,
    type: CALL_API,
  });
  return response.payload as OrganisationPayload;
};

export const deleteOrganisation: (
  organisation: OrganisationPayload
) => ThunkAction<any, ReduxState, any, AnyAction> = (organisation) => (dispatch, getState) => {
  if (getState().session.activeOrganisation === organisation.id) {
    dispatch({
      payload: undefined,
      type: SET_ACTIVE_ORGANISATION,
    });
  }
  return dispatch({
    body: organisation,
    endpoint: `/organisations/${organisation.id}`,
    extra: organisation,
    method: "delete",
    successType: DELETE_ORGANISATIONS_SUCCESS,
    type: CALL_API,
  });
};

export const setActiveOrganisation = (organisation?: number, fetchRelated = true) =>
  async (dispatch: Dispatch<any>) => {
    // remember organisation for next session
    if (organisation) {
      localStorage.setItem("organisation", String(organisation));
      if (fetchRelated) {
        dispatch(fetchAppliances(organisation));
        dispatch(fetchMaintainers(organisation));
        dispatch(fetchAccounts(organisation));
      }
    }
    dispatch(resetTabs); // should close all opened tabs
    dispatch({
      payload: organisation,
      type: SET_ACTIVE_ORGANISATION,
    });
    return dispatch(updateActiveUserRole);
  };
