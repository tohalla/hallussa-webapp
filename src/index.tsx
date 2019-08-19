import "core-js/stable";
import "regenerator-runtime/runtime";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "react-day-picker/lib/style";
import "style";

import { appContainer } from "style/container";
import { authenticate } from "./auth/auth";
import i18n from "./i18n";
import Router from "./Router";
import store, { initializeStore } from "./store/store";

// if (process.env.NODE_ENV === "development") {
//   (() => {
//     const axe = require("react-axe");
//     axe(React, ReactDOM, 1000, {runOnly: { type: "tag", values: ["wcag2a"] }});
//   })();
// }

const mount = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    await Promise.all([
      authenticate(token),
      initializeStore(),
      i18n(),
    ]);

    (document.getElementById("app") as HTMLElement).className = appContainer;

    return ReactDOM.render(
      <Provider store={store}><Router /></Provider>,
      document.getElementById("app")
    );
  }
  // forward to authentication if user not authenticated
  window.location.href = window.location.origin + "/authentication.html";
};

mount();

if (module.hot) {
  module.hot.accept(mount);
}
