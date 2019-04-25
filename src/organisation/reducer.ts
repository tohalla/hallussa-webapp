import { append, assoc, cond, dissoc, equals, lensPath, merge, mergeWith, over, Pred, T, union, without } from "ramda";
import { Reducer } from "redux";

import { CREATE_APPLIANCE_SUCCESS, DELETE_APPLIANCE_SUCCESS } from "../appliance/actions";
import { CREATE_MAINTAINER_SUCCESS, DELETE_MAINTAINER_SUCCESS, MaintainerPayload } from "../maintainer/actions";
import {
  CREATE_ORGANISATION_SUCCESS,
  DELETE_ORGANISATIONS_SUCCESS,
  FETCH_ORGANISATIONS_SUCCESS,
  OrganisationAction,
  UPDATE_ORGANISATION_SUCCESS
} from "./actions";

const getEntityHandlers = (
  key: string,
  {createType, deleteType}: {createType: string, deleteType: string}
): ReadonlyArray<[Pred, (...a: any[]) => any]> => ([
  [equals(createType), (type: string, state: {}, {organisation, id}: MaintainerPayload) => {
    if (id && organisation) {
      return over(lensPath([String(organisation), key]), append(id), state);
    }
    return state;
  }],
  [equals(deleteType), (type: string, state: any, payload: any, entity: any) => {
    return over(lensPath([String(entity.organisation), key]), without([entity.id]), state);
  }],
]);

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
  ...getEntityHandlers("maintainers", {createType: CREATE_MAINTAINER_SUCCESS, deleteType: DELETE_MAINTAINER_SUCCESS}),
  ...getEntityHandlers("appliances", {createType: CREATE_APPLIANCE_SUCCESS, deleteType: DELETE_APPLIANCE_SUCCESS}),
  [T, (type, state, payload) => state],
]);

const reducer: Reducer<{[key: number]: any}, OrganisationAction> = (
  state = {},
  {payload, type, extra}: OrganisationAction
) =>
  typeHandler(type, state, payload, extra);

export default reducer;
