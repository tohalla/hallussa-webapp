import { UPDATE_APPLIANCE_STATUS } from "../appliance/actions";
import { FETCH_MAINTENANCE_EVENT_SUCCESS } from "../maintenance/event/actions";
import store, { EntitiesState } from "../store/store";
import { indexByKeys } from "../util/utilityFunctions";

const actionTypeMappings: Partial<{[k in keyof EntitiesState | "applianceStatus"]: string}> = {
  applianceStatus: UPDATE_APPLIANCE_STATUS,
  maintenanceEvents: FETCH_MAINTENANCE_EVENT_SUCCESS,
};

export default (type: keyof EntitiesState | "applianceStatus") => (entity?: any & {} | Array<any & {}>) => {
  // should not dispatch action if type not defined
  if (!actionTypeMappings.hasOwnProperty(type)) {
    return;
  }
  const payload = type === "applianceStatus" ?
    entity : indexByKeys(["id", "hash"], entity);

  store.dispatch({
    payload,
    type: actionTypeMappings[type],
  });
};
