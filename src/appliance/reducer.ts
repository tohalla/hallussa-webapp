import { prop } from "ramda";

import { DELETE_MAINTAINER_SUCCESS } from "../maintainer/actions";
import { getEntityHandlers, getEntityRelationHandlersGenerator } from "../store/entityHandler";
import {
  ApplianceAction,
  ASSING_MAINTAINER_TO_APPLIANCE_SUCCESS,
  CREATE_APPLIANCE_SUCCESS,
  DELETE_APPLIANCE_SUCCESS,
  FETCH_APPLIANCES_SUCCESS,
  REMOVE_MAINTAINER_FROM_APPLIANCE_SUCCESS,
  UPDATE_APPLIANCE_SUCCESS
} from "./actions";

const getEntityRelationHandlers = getEntityRelationHandlersGenerator<"appliance">("appliance");

const entityHandlers = {
  ...getEntityHandlers({
    types: {
      create: CREATE_APPLIANCE_SUCCESS,
      delete: DELETE_APPLIANCE_SUCCESS,
      fetch: FETCH_APPLIANCES_SUCCESS,
      update: UPDATE_APPLIANCE_SUCCESS,
    },
  }),
  ...getEntityRelationHandlers({
    getId: prop("maintainer"),
    parseRelationFromPayload: prop("maintainer"),
    relation: "maintainers",
    types: {
      add: ASSING_MAINTAINER_TO_APPLIANCE_SUCCESS,
      delete: [DELETE_MAINTAINER_SUCCESS, {getId: prop("id"), parseRelationFromPayload: prop("id")}],
      remove: REMOVE_MAINTAINER_FROM_APPLIANCE_SUCCESS,
    },
  }),
};

export default (state = {}, action: ApplianceAction) =>
  action.type in entityHandlers ? entityHandlers[action.type](state, action) : state;
