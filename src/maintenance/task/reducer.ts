import { DELETE_MAINTAINER_SUCCESS } from "../../maintainer/actions";
import { getEntityHandlers, getEntityRelationHandlersGenerator } from "../../store/entityHandler";
import { FETCH_MAINTENANCE_TASK_SUCCESS, MaintenanceTaskAction } from "./actions";

const getEntityRelationHandlers = getEntityRelationHandlersGenerator<"maintenanceTask">("maintenanceTask");

const entityHandlers = {
  ...getEntityHandlers({
    types: {
      fetch: FETCH_MAINTENANCE_TASK_SUCCESS,
    },
  }),
  ...getEntityRelationHandlers({
    relation: "maintainer",
    types: {
      delete: DELETE_MAINTAINER_SUCCESS,
    },
  }),
};

export default (state = {}, action: MaintenanceTaskAction) =>
  action.type in entityHandlers ? entityHandlers[action.type](state, action) : state;
