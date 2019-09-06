import { prop } from "ramda";
import { Middleware } from "redux";

import { FETCH_APPLIANCES_SUCCESS } from "../../appliance/actions";
import { socketIO } from "../../socketIO";

const organisationJoined: {[k: number]: boolean} = {};

const listenActionTypes = [FETCH_APPLIANCES_SUCCESS];

const organisationUpdates: Middleware = () => (next) => (action) => {
  if (listenActionTypes.includes(action.type)) {
    new Set<number>((Object.values(action.payload) as any).map(prop("organisation"))).forEach((organisation) => {
      if (organisationJoined[organisation]) {
        return;
      }
      socketIO.emit("organisation", organisation);
      organisationJoined[organisation] = true;
    });
  }

  return next(action);
};

export default organisationUpdates;
