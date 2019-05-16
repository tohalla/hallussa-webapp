import { dissoc, prop } from "ramda";

import { ADD_ACCOUNT_SUCCESS, SET_ACCOUNT_USER_ROLE } from "../account/actions";
import { CREATE_APPLIANCE_SUCCESS, DELETE_APPLIANCE_SUCCESS } from "../appliance/actions";
import { CREATE_MAINTAINER_SUCCESS, DELETE_MAINTAINER_SUCCESS } from "../maintainer/actions";
import { getEntityHandlers, getEntityRelationHandlersGenerator } from "../store/entityHandler";
import { EntitiesState } from "../store/store";
import {
  CREATE_ORGANISATION_SUCCESS,
  DELETE_ORGANISATIONS_SUCCESS,
  FETCH_ORGANISATIONS_SUCCESS,
  OrganisationAction,
  UPDATE_ORGANISATION_SUCCESS
} from "./actions";

const getEntityRelationHandlers = getEntityRelationHandlersGenerator<"organisation">("organisation");

const entityHandlers = {
  ...getEntityHandlers<EntitiesState["organisations"]>({types: {
    create: CREATE_ORGANISATION_SUCCESS,
    delete: DELETE_ORGANISATIONS_SUCCESS,
    fetch: FETCH_ORGANISATIONS_SUCCESS,
    update: UPDATE_ORGANISATION_SUCCESS,
  }}),
  ...getEntityRelationHandlers({
    getId: prop("account"),
    parseRelationFromPayload: dissoc("organisation"),
    relation: "accounts",
    types: {add: ADD_ACCOUNT_SUCCESS, update: SET_ACCOUNT_USER_ROLE},
  }),
  ...getEntityRelationHandlers({
    relation: "maintainers",
    types: {add: CREATE_MAINTAINER_SUCCESS, remove: DELETE_MAINTAINER_SUCCESS},
  }),
  ...getEntityRelationHandlers({
    relation: "appliances",
    types: {add: CREATE_APPLIANCE_SUCCESS, remove: DELETE_APPLIANCE_SUCCESS},
  }),
};

export default (state = {}, action: OrganisationAction) =>
  action.type in entityHandlers ? entityHandlers[action.type](state, action) : state;
