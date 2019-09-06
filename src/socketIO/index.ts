import io from "socket.io-client";

import { getAndCheckJWT } from "../auth/auth";
import { wsPrefix, wsURL } from "../config";
import entityUpdateHandler from "./entityUpdateHandler";

export let socketIO: SocketIOClient.Socket;

(async () => {
  socketIO = io(
    `${wsURL}`,
    {
      path: wsPrefix,
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: await getAndCheckJWT(),
          },
        },
      },
    }
  );

  socketIO.on("maintenanceEvent", entityUpdateHandler("maintenanceEvents"));
  socketIO.on("applianceStatus", entityUpdateHandler("applianceStatus"));
})();
