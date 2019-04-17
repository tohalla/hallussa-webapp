import "@babel/polyfill";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "styles";

import { appContainer } from "styles/container";
import { authenticate } from "./auth/auth";
import i18n from "./i18n";
import Router from "./Router";
import store, { initializeStore } from "./store/store";

const mount = async () => {
  const token = localStorage.getItem("token");
  if (token && (await authenticate(token))) {
    (document.getElementById("app") as HTMLElement).className = appContainer;

    await Promise.all([
      initializeStore(),
      i18n(),
    ]);

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
