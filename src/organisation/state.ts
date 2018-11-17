import { dissoc, map, props, values } from "ramda";

import { EntitiesState, ReduxState } from "../store/store";
import { OrganisationPayload } from "./actions";

// return all organisations as readonly array
export const getOrganisations = (state: ReduxState): ReadonlyArray<OrganisationPayload> =>
  values(state.entities.organisations);

export const getOrganisation = (
  state: ReduxState,
  organisationId?: number
): Readonly<OrganisationPayload> | undefined => {
  if (typeof organisationId === "undefined") { // use current active organisation if not given
    if (state.session.activeOrganisation) {
      return getOrganisation(state, state.session.activeOrganisation);
    }
    return undefined; // if no active organisation, return undefined
  }
  return state.entities.organisations[organisationId];
};

export const getEntitiesByOrganisation = <T>(
  state: ReduxState,
  entityType: Exclude<keyof EntitiesState, "organisations">,
  organisationId?: number
): ReadonlyArray<T> => {
  const organisation = getOrganisation(state, organisationId);
  if (typeof organisation === "undefined") {
    return []; // return empty array if organisation not found
  }
  return props<string, T>(
    map(String, organisation.appliances),
    state.entities[entityType] as any
  );
};
