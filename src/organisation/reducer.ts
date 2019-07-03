import { dissoc, prop } from "ramda";

import { ADD_ACCOUNT_SUCCESS, REMOVE_ACCOUNT_SUCCESS, SET_ACCOUNT_USER_ROLE } from "../account/actions";
import { CREATE_APPLIANCE_SUCCESS, DELETE_APPLIANCE_SUCCESS } from "../appliance/actions";
import { CREATE_MAINTAINER_SUCCESS, DELETE_MAINTAINER_SUCCESS } from "../maintainer/actions";
import { getEntityHandlers, getEntityRelationHandlersGenerator } from "../store/entityHandler";
import { EntitiesState } from "../store/store";
import {
  CREATE_ORGANISATION_SUCCESS,
  FETCH_ORGANISATIONS_SUCCESS,
  OrganisationAction,
  REMOVE_ORGANISATION_SUCCESS,
  UPDATE_ORGANISATION_SUCCESS
} from "./actions";

const getEntityRelationHandlers = getEntityRelationHandlersGenerator<"organisation">("organisation");

const entityHandlers = {
  ...getEntityHandlers<EntitiesState["organisations"]>({types: {
    create: CREATE_ORGANISATION_SUCCESS,
    delete: REMOVE_ORGANISATION_SUCCESS,
    fetch: FETCH_ORGANISATIONS_SUCCESS,
    update: UPDATE_ORGANISATION_SUCCESS,
  }}),
  ...getEntityRelationHandlers({
    getId: prop("account"),
    parseRelationFromPayload: dissoc("organisation"),
    relation: "accounts",
    types: {add: ADD_ACCOUNT_SUCCESS, update: SET_ACCOUNT_USER_ROLE, remove: REMOVE_ACCOUNT_SUCCESS},
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
