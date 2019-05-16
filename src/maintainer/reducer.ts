import { prop } from "ramda";

import {
  ASSING_MAINTAINER_TO_APPLIANCE_SUCCESS,
  DELETE_APPLIANCE_SUCCESS,
  REMOVE_MAINTAINER_FROM_APPLIANCE_SUCCESS
} from "../appliance/actions";
import { getEntityHandlers, getEntityRelationHandlersGenerator } from "../store/entityHandler";
import {
  CREATE_MAINTAINER_SUCCESS,
  DELETE_MAINTAINER_SUCCESS,
  FETCH_MAINTAINERS_SUCCESS,
  MaintainerAction,
  UPDATE_MAINTAINER_SUCCESS
} from "./actions";

const getEntityRelationHandlers = getEntityRelationHandlersGenerator<"maintainer">("maintainer");

const entityHandlers = {
  ...getEntityHandlers({
    types: {
      create: CREATE_MAINTAINER_SUCCESS,
      delete: DELETE_MAINTAINER_SUCCESS,
      fetch: FETCH_MAINTAINERS_SUCCESS,
      update: UPDATE_MAINTAINER_SUCCESS,
    },
  }),
  ...getEntityRelationHandlers({
    getId: prop("appliance"),
    parseRelationFromPayload: prop("appliance"),
    relation: "appliances",
    types: {
      add: ASSING_MAINTAINER_TO_APPLIANCE_SUCCESS,
      delete: [DELETE_APPLIANCE_SUCCESS, {getId: prop("id"), parseRelationFromPayload: prop("id")}],
      remove: REMOVE_MAINTAINER_FROM_APPLIANCE_SUCCESS,
    },
  }),
};

export default (state = {}, action: MaintainerAction) =>
  action.type in entityHandlers ? entityHandlers[action.type](state, action) : state;
