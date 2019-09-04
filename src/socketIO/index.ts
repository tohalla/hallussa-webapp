import io from "socket.io-client";

import { getAndCheckJWT } from "../auth/auth";
import { wsPrefix, wsURL } from "../config";

export let socketIO: SocketIOClient.Socket;

(async () => {
  socketIO = io(
    `${wsURL}/updates`,
    {
      path: wsPrefix,
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: (await getAndCheckJWT()),
          },
        },
      },
    }
  );
})();
