import { FETCH_MAINTENANCE_EVENT_SUCCESS } from "../maintenance/event/actions";
import store, { EntitiesState } from "../store/store";
import { indexByKeys } from "../util/utilityFunctions";

const actionTypeMappings: Partial<{[k in keyof EntitiesState]: string}> = {
  maintenanceEvents: FETCH_MAINTENANCE_EVENT_SUCCESS,
};

export default (type: keyof EntitiesState) => (entity?: any & {} | Array<any & {}>) => {
  // should not dispatch action if type not defined
  if (!actionTypeMappings.hasOwnProperty(type)) {
    return;
  }

  store.dispatch({
    payload: indexByKeys(["id", "hash"], entity),
    type: actionTypeMappings[type],
  });
};
