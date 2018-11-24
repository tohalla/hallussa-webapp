import { isEmpty } from "ramda";
import { Dispatch } from "redux";
import { fetchAppliances } from "../appliance/actions";
import { resetTabs } from "../components/tabbed/actions";
import { fetchMaintainers } from "../maintainer/actions";
import { APIResponseAction, CALL_API } from "../store/middleware/api/actions";
import { ReduxAPICall } from "../store/middleware/api/api";
import { authenticatedFetch } from "../util/utilityFunctions";

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
  accounts: ReadonlyArray<{id: number, isAdmin: boolean}>;
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
  parameters: {eager: "[accounts, maintainers, appliances]"},
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

export const deleteOrganisation = (organisation: OrganisationPayload) => ({
  body: organisation,
  endpoint: `/organisations/${organisation.id}`,
  extra: organisation,
  method: "delete",
  successType: DELETE_ORGANISATIONS_SUCCESS,
  type: CALL_API,
});

export const setActiveOrganisation = (organisation: number, fetchRelated = true) =>
  async (dispatch: Dispatch) => {
    localStorage.setItem("organisation", String(organisation)); // remember organisation for next session
    if (fetchRelated) {
      await Promise.all([
        dispatch(fetchAppliances(organisation)),
        dispatch(fetchMaintainers(organisation)),
      ]);
    }
    dispatch(resetTabs); // should close all opened tabs
    return dispatch({
      payload: {activeOrganisation: organisation},
      type: SET_ACTIVE_ORGANISATION,
    });
  };
