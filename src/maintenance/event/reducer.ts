import { DELETE_APPLIANCE_SUCCESS } from "../../appliance/actions";
import { getEntityHandlers, getEntityRelationHandlersGenerator } from "../../store/entityHandler";
import { FETCH_MAINTENANCE_EVENT_SUCCESS, MaintenanceEventAction } from "./actions";

const getEntityRelationHandlers = getEntityRelationHandlersGenerator<"maintenanceTask">("maintenanceTask");

const entityHandlers = {
  ...getEntityHandlers({
    types: {
      fetch: FETCH_MAINTENANCE_EVENT_SUCCESS,
    },
  }),
  ...getEntityRelationHandlers({
    relation: "appliance",
    types: {
      delete: DELETE_APPLIANCE_SUCCESS,
    },
  }),
};

export default (state = {}, action: MaintenanceEventAction) =>
  action.type in entityHandlers ? entityHandlers[action.type](state, action) : state;
