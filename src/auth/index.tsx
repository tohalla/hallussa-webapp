import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import defaultContainer, { appContainer, centerContent } from "style/container";
import "whatwg-fetch"; // fetch polyfill, replaces standard fetch

import "style";

import { baseUrl } from "../config";
import i18n from "../i18n";
import { authenticate } from "./auth";
import AuthenticationForm from "./AuthenticationForm";
import RegistrationForm from "./RegistrationForm";

document.body.hidden = false; // hack to disable rendering before loading js

// TODO: nginx jwt check
const mount = async () => {
  const token = localStorage.getItem("token");
  if (token && (await authenticate(token))) {
    window.location.href = baseUrl;
    return;
  }

  await i18n();

  (document.getElementById("app") as HTMLElement).className = appContainer;

  ReactDOM.render(
    (
      <div className={centerContent}>
        <div className={defaultContainer}>
          <Router>
            <Switch>
              <Route exact={true} path={"/"} component={AuthenticationForm} />
              <Route exact={true} path={"/register"} component={RegistrationForm} />
              <Redirect path="*" to="/" />
            </Switch>
          </Router>
        </div>
      </div>
    ),
    document.getElementById("app")
  );
};

mount();

if (module.hot) {
  module.hot.accept(mount);
}
