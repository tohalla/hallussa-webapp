import {
  append,
  assoc,
  cond,
  dissoc,
  equals,
  lensPath,
  merge,
  mergeWith,
  over,
  Pred,
  prop,
  T as alwaysTrue,
  union,
  without
} from "ramda";

import { AnyAction } from "redux";
import { ADD_ACCOUNT_SUCCESS } from "../account/actions";
import { AppliancePayload, CREATE_APPLIANCE_SUCCESS, DELETE_APPLIANCE_SUCCESS } from "../appliance/actions";
import { CREATE_MAINTAINER_SUCCESS, DELETE_MAINTAINER_SUCCESS, MaintainerPayload } from "../maintainer/actions";
import {
  CREATE_ORGANISATION_SUCCESS,
  DELETE_ORGANISATIONS_SUCCESS,
  FETCH_ORGANISATIONS_SUCCESS,
  OrganisationAction,
  UPDATE_ORGANISATION_SUCCESS
} from "./actions";

export const getEntityHandlers = <T extends {organisation: number}>(
  {
    key,
    types: {createType, deleteType},
    getId = prop<any>("id"),
    parseEntityFromPayload = prop<any>("id"),
  }: {
    types: {createType?: string, deleteType?: string},
    key: string
    getId?(entity: T): any,
    parseEntityFromPayload?(entity: T): any,
  }
): ReadonlyArray<[Pred, (...a: any[]) => any]> => {
  const handlers: Array<[Pred, (...a: any[]) => any]> = [];
  if (createType) {
    handlers.push(
      [equals(createType), (type: string, state: {}, payload: T) => {
        const entity = parseEntityFromPayload(payload);
        if (entity && payload.organisation) {
          return over(lensPath([String(payload.organisation), key]), append(entity), state);
        }
        return state;
      }]
    );
  }
  if (deleteType) {
    handlers.push(
      [equals(deleteType), (type: string, state: any, payload: any, entity: T) => {
        return over(lensPath([String(entity.organisation), key]), without([getId(entity)]), state);
      }]
    );
  }
  return handlers;
};

const typeHandler = cond<any, any>([
  [equals(FETCH_ORGANISATIONS_SUCCESS), (type, state, payload) => merge(state, payload)],
  [equals(DELETE_ORGANISATIONS_SUCCESS), (type, state, payload, organisation) => dissoc(organisation.id, state)],
  [equals(CREATE_ORGANISATION_SUCCESS), (type, state, payload) => payload.id ?
    assoc(String(payload.id), payload, state) : state,
  ],
  [equals(UPDATE_ORGANISATION_SUCCESS),(type, state, payload) => payload.id ?
    assoc(
      String(payload.id),
      mergeWith(
        (as, bs) => Array.isArray(as) ? union(as, bs) : as,
        payload,
        state[String(payload.id)]
      ),
      state
    ) : state,
  ],
  ...getEntityHandlers<any>({
    getId: prop("account"),
    key: "accounts",
    parseEntityFromPayload: (e) => e,
    types: {createType: ADD_ACCOUNT_SUCCESS},
  }),
  ...getEntityHandlers<MaintainerPayload>({
    key: "maintainers",
    types: {createType: CREATE_MAINTAINER_SUCCESS, deleteType: DELETE_MAINTAINER_SUCCESS},
  }),
  ...getEntityHandlers<AppliancePayload>({
    key: "appliances",
    types: {createType: CREATE_APPLIANCE_SUCCESS, deleteType: DELETE_APPLIANCE_SUCCESS},
  }),
  [alwaysTrue, (type, state, payload) => state],
]);

export default (
  state = {},
  {payload, type, extra}: OrganisationAction | AnyAction
) => typeHandler(type, state, payload, extra);
