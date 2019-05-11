import { paramCase } from "change-case";
import { values } from "ramda";

import { APIResponsePayload } from "../store/middleware/api/actions";
import { EntitiesState, ReduxState } from "../store/store";
import { OrganisationPayload } from "./actions";

// return all organisations as readonly array
export const getOrganisations = (state: ReduxState): ReadonlyArray<OrganisationPayload> | APIResponsePayload =>
  state.activeRequests.get["/organisations"] || values(state.entities.organisations);

export type EntityType = Exclude<keyof EntitiesState, "organisations">;

export const getOrganisation = (
  state: ReduxState,
  organisationId?: number
): Readonly<OrganisationPayload> | APIResponsePayload | undefined => {
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

// object used to track if entity path differs from general form of /organisations/{orgId}/{entityType}
const entityPaths: {[key in EntityType]?: string} = {
  accounts: "users/accounts",
};

// Will return api response payload if the request is still incomplete
export const getStatus = (
  activeRequests: ReduxState["activeRequests"],
  entityType: EntityType,
  organisation?: number
): APIResponsePayload | undefined => {
  if (typeof organisation === "undefined") { // ... if still missing, wrong organisation was requested
    throw new Error("organisation not defined");
  }
  const endpoint = entityType in entityPaths ? entityPaths[entityType] : paramCase(entityType);
  return activeRequests.get[`/organisations/${organisation}/${endpoint}`] || activeRequests.get[`/${endpoint}`];
};
