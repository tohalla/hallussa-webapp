import { map, props, values } from "ramda";

import { APIResponsePayload } from "../store/middleware/api/actions";
import { EntitiesState, ReduxState } from "../store/store";
import { OrganisationPayload } from "./actions";

// return all organisations as readonly array
export const getOrganisations = (state: ReduxState): ReadonlyArray<OrganisationPayload> | APIResponsePayload =>
  state.activeRequests.get["/organisations"] || values(state.entities.organisations);

export const getOrganisation = (
  state: ReduxState,
  organisationId?: number
): Readonly<OrganisationPayload> |  APIResponsePayload | undefined => {
  const request = state.activeRequests.get["/organisations"];
  if (typeof request !== "undefined") {
    return request; // if organisations fetching still hanging, return request status
  }
  if (typeof organisationId === "undefined") { // use current active organisation if not given
    if (state.session.activeOrganisation) {
      return getOrganisation(state, state.session.activeOrganisation);
    }
    return undefined; // if no active organisation, return undefined
  }
  return state.entities.organisations[organisationId] as OrganisationPayload;
};

export const getEntitiesByOrganisation = <T>(
  state: ReduxState,
  entityType: Exclude<keyof EntitiesState, "organisations">,
  organisationId?: number
): ReadonlyArray<T> | APIResponsePayload => {
  const organisation = getOrganisation(state, organisationId);
  if (typeof organisation === "undefined") {
    return []; // return empty array if organisation not found
  } else if (typeof (organisation as APIResponsePayload).isFetching === "undefined") {
    return organisation as APIResponsePayload; // if organisation fetching still hanging, return request status
  }
  const request = state.activeRequests.get[`organisations/${(organisation as OrganisationPayload).id}/${entityType}`];
  if (typeof request === "undefined") {
    return props<string, T>(
      map(String, (organisation as OrganisationPayload).appliances),
      state.entities[entityType] as any
    );
  }
  return request; // if entity fetching still hanging, return request status
};
