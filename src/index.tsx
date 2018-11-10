import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { authenticate } from "./auth/auth";
import Router from "./Router";
import store from "./store/store";

// TODO: nginx jwt check
(async () => {
  const token = localStorage.getItem("token");
  if (token && (await authenticate(token))) {
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
