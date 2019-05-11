import { assoc, path } from "ramda";
import { createSelector, Selector } from "reselect";

import { APIResponsePayload } from "../store/middleware/api/actions";
import { ReduxState } from "../store/store";
import { OrganisationPayload } from "./actions";
import { EntityType, getStatus } from "./state";

let selectors: {
  [key in EntityType]?: {
    _org: number,
    selector: Selector<any, any>
  }
} = {};

export const getEntitiesByOrganisationSelector = <T extends EntityType, Entity extends {} = any>(
  entityType: T,
  organisationId?: number,
  {key}: {
    key?: keyof Required<OrganisationPayload>[T][0]
  } = {}
) => {
  if (typeof organisationId === "undefined") {
    return () => []; // when organisation is not defined, should just return empty array
  }
  if (path([entityType, "_org"], selectors) === organisationId) {
    return path([entityType, "selector"], selectors) as Selector<any, Readonly<Entity[]> | APIResponsePayload>;
  }
  const selector = createSelector<
    ReduxState,
    any,
    Readonly<Entity[]> | APIResponsePayload
  >(
    [
      ({entities}) => entities[entityType],
      ({entities, session}) => organisationId ? entities.organisations[organisationId]
      : session.activeOrganisation && entities.organisations[session.activeOrganisation],
      ({activeRequests, session}) =>
        getStatus(activeRequests, entityType, organisationId || session.activeOrganisation),
    ],
    (s, organisation, status) => {
      if (typeof organisation === "undefined") {
        return [];
      }
      if (status) { // if entity fetching still hanging, return request status
        return status;
      }
      const entities: Entity[] = [];
      for (const relation of ((organisation as OrganisationPayload)[entityType] || []) as Readonly<any[]>) {
        const entity: Partial<Entity> = {};
        if (typeof relation === "object" && key && relation.hasOwnProperty(key)) {
          Object.assign(entity, relation, s[relation[key]]);
        } else {
          Object.assign(entity, s[relation]);
        }
        entities.push(entity as Entity);
      }
      return entities as Readonly<Entity[]>;
    }
  );
  selectors = assoc(entityType, {_org: organisationId, selector}, selectors);
  return selector;
};
