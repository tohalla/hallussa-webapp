import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { appContainer } from "emotion-styles/container";
import { authenticate } from "./auth/auth";
import Router from "./Router";
import store from "./store/store";

// TODO: nginx jwt check
(async () => {
  const token = localStorage.getItem("token");
  if (token && (await authenticate(token))) {
    (document.getElementById("app") as HTMLElement).className = appContainer;

    return ReactDOM.render(
      <Provider store={store}>
        <Router />
      </Provider>,
      document.getElementById("app")
    );
  }
  // forward to authentication if user not authenticated
  window.location.href = window.location.origin + "/authentication.html";
})();
