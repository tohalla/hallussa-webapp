import { paramCase } from "change-case";
import { append, reduce, values } from "ramda";

import { APIResponsePayload } from "../store/middleware/api/actions";
import { EntitiesState, ReduxState } from "../store/store";
import { OrganisationPayload } from "./actions";

// return all organisations as readonly array
export const getOrganisations = (state: ReduxState): ReadonlyArray<OrganisationPayload> | APIResponsePayload =>
  state.activeRequests.get["/organisations"] || values(state.entities.organisations);

type EntityType = Exclude<keyof EntitiesState, "organisations">;

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

export const getEntitiesByOrganisation = <T>(
  state: ReduxState,
  entityType: EntityType,
  organisationId?: number,
  key: string = "id" // key used to determine the entity if relation is an object
): ReadonlyArray<T> | APIResponsePayload => {
  const organisation = getOrganisation(state, organisationId);
  return getStatus(state, entityType, organisation) // if entity fetching still hanging, return request status
    || reduce<any, any>(
      (prev, curr) => append(
        typeof curr === "object" ?
          {...curr, ...state.entities[entityType][curr[key]]}
        : state.entities[entityType][String(curr)],
        prev
      ),
      [],
      (organisation as OrganisationPayload)[entityType]
    );
};

// object used to track if entity path differs from general form of /organisations/{orgId}/{entityType}
const entityPaths: {[key in EntityType]?: string} = {
  accounts: "users/accounts",
};

export const getStatus = (
  state: ReduxState,
  entityType: EntityType,
  organisation?: OrganisationPayload | APIResponsePayload
): APIResponsePayload | undefined  => {
  if (typeof organisation === "undefined") {
    organisation = getOrganisation(state); // fetch organisation if not set
  }
  if (typeof organisation === "undefined") { // ... if still missing, wrong organisation was requested
    throw new Error("organisation not defined");
  }
  if (typeof (organisation as APIResponsePayload).isFetching === "undefined") {
    return state.activeRequests.get[`/organisations/${
      (organisation as OrganisationPayload).id
    }/${entityType in entityPaths ? entityPaths[entityType] : paramCase(entityType)}` ];
  } else {
    return organisation as APIResponsePayload;
  }
};
