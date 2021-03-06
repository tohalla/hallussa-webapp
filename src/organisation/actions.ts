import { isEmpty } from "ramda";
import { AnyAction, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { fetchAccounts } from "../account/actions";
import { updateActiveUserRole } from "../account/user-role/actions";
import { fetchAppliances } from "../appliance/actions";
import { resetTabs } from "../component/tabbed/actions";
import { fetchMaintainers } from "../maintainer/actions";
import { CALL_API } from "../store/middleware/api/actions";
import { ReduxAPICall } from "../store/middleware/api/api";
import { ReduxState } from "../store/store";

export const CREATE_ORGANISATION_SUCCESS = "CREATE_ORGANISATION_SUCCESS";
export const UPDATE_ORGANISATION_SUCCESS = "UPDATE_ORGANISATION_SUCCESS";
export const FETCH_ORGANISATIONS_SUCCESS = "FETCH_ORGANISATIONS_SUCCESS";
export const REMOVE_ORGANISATION_SUCCESS = "REMOVE_ORGANISATION_SUCCESS";
export const SET_ACTIVE_ORGANISATION = "SET_ACTIVE_ORGANISATION";

export interface OrganisationPreferences {
  allowResolvingEvents?: boolean;
  qrCodes?: boolean;
}

export interface OrganisationPayload {
  id: number;
  language?: string;
  name: string;
  organisationIdentifier?: string;
  createdAt?: string;
  updatedAt?: string;
  maintainers?: ReadonlyArray<number>;
  appliances?: ReadonlyArray<number>;
  userRoles?: ReadonlyArray<number>;
  accounts?: ReadonlyArray<{account: number, userRole: number}>;
  preferences?: OrganisationPreferences;
}

export interface OrganisationAction {
  type: string;
  extra: object;
  payload: OrganisationPayload;
}

export const fetchOrganisations = ({bypassCache = false} = {}): ReduxAPICall => ({
  attemptToFetchFromStore: bypassCache ? undefined : (state) =>
    isEmpty(state.entities.organisations) ? undefined : state.entities.organisations,
  endpoint: "/organisations",
  method: "get",
  parameters: {eager: "[accounts,maintainers,appliances,userRoles]"},
  successType: FETCH_ORGANISATIONS_SUCCESS,
  type: CALL_API,
});

export const createOrganisation = (organisation: OrganisationPayload) => (dispatch: Dispatch<ReduxAPICall>) =>
  dispatch({
    data: organisation,
    endpoint: "/organisations",
    method: "post",
    successType: CREATE_ORGANISATION_SUCCESS,
    type: CALL_API,
  });

export const updateOrganisation = (organisation: Partial<OrganisationPayload>) => (dispatch: Dispatch<ReduxAPICall>) =>
  dispatch({
    data: organisation,
    endpoint: `/organisations/${organisation.id}`,
    method: "patch",
    successType: UPDATE_ORGANISATION_SUCCESS,
    type: CALL_API,
  });

export const removeOrganisation: (
  organisation: OrganisationPayload
) => ThunkAction<any, ReduxState, any, AnyAction> = (organisation) => (dispatch, getState) => {
  dispatch({payload: organisation, type: REMOVE_ORGANISATION_SUCCESS});
  if (getState().session.activeOrganisation === organisation.id) {
    dispatch({
      payload: undefined,
      type: SET_ACTIVE_ORGANISATION,
    });
  }
};

// Calls API requesting removal of given organisation, will use removeOrganisation to drop it from redux state
export const deleteOrganisation: (
  organisation: OrganisationPayload
) => ThunkAction<any, ReduxState, any, AnyAction> = (organisation) => (dispatch) =>
  dispatch<ReduxAPICall<OrganisationPayload>>({
    data: organisation,
    endpoint: `/organisations/${organisation.id}`,
    method: "delete",
    onSuccess: () => dispatch(removeOrganisation(organisation)),
    type: CALL_API,
  });

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
