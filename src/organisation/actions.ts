import { isEmpty, path } from "ramda";
import { AnyAction, Dispatch } from "redux";
import { fetchAppliances } from "../appliance/actions";
import { fetchMaintainers } from "../maintainer/actions";
import { CALL_API, ReduxAPICall } from "../store/middleware/api";

export const FETCH_ORGANISATIONS_REQUEST = "FETCH_ORGANISATIONS_REQUEST";
export const FETCH_ORGANISATIONS_SUCCESS = "FETCH_ORGANISATIONS_SUCCESS";
export const FETCH_ORGANISATIONS_FAILURE = "FETCH_ORGANISATIONS_FAILURE";

export const SET_ACTIVE_ORGANISATION = "SET_ACTIVE_ORGANISATION";

export interface OrganisationPayload {
  id: string;
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
  payload: OrganisationPayload;
}

export const fetchOrganisations = ({bypassCache = false} = {}): ReduxAPICall => ({
  attemptToFetchFromStore: bypassCache ? undefined : (state) =>
    !isEmpty(state.entities.organisations) && state.entities.organisations,
  endpoint: "/organisations?eager=[accounts,maintainers,appliances]",
  method: "GET",
  type: CALL_API,
  types: [
    FETCH_ORGANISATIONS_REQUEST,
    FETCH_ORGANISATIONS_SUCCESS,
    FETCH_ORGANISATIONS_FAILURE,
  ],
});

export const setActiveOrganisation = (organisation: number, isAdmin: boolean, fetchRelated = true) =>
  (dispatch: Dispatch) => {
    if (fetchRelated) {
      dispatch(fetchAppliances(organisation));
      dispatch(fetchMaintainers(organisation));
    }
    return dispatch({
      payload: {activeOrganisation: organisation, isAdmin},
      type: SET_ACTIVE_ORGANISATION,
    });
  };
