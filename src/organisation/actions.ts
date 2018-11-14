import { path } from "ramda";
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
  maintainers: [number];
  appliances: [number];
  accounts: [{id: number, isAdmin: boolean}];
}

export interface OrganisationAction {
  type: string;
  payload: OrganisationPayload;
}

export const fetchOrganisations = ({bypassCache = false} = {}): ReduxAPICall => ({
  attemptToFetchFromStore: bypassCache ? undefined : path(["entities", "organisations"]),
  endpoint: "/organisations",
  method: "GET",
  type: CALL_API,
  types: [
    FETCH_ORGANISATIONS_REQUEST,
    FETCH_ORGANISATIONS_SUCCESS,
    FETCH_ORGANISATIONS_FAILURE,
  ],
});

export const setActiveOrganisation = (organisation: number, isAdmin: boolean) => ({
  payload: {activeOrganisation: organisation, isAdmin},
  type: setActiveOrganisation,
});
