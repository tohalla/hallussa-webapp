import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { appContainer, authContainer, centerContent } from "style/container";
import "whatwg-fetch"; // fetch polyfill, replaces standard fetch

import "style";

import { baseUrl } from "../config";
import i18n from "../i18n";
import { authenticate } from "./auth";
import AuthenticationForm from "./AuthenticationForm";
import RegistrationForm from "./RegistrationForm";

document.body.hidden = false; // hack to disable rendering before loading js

const render = () =>
  ReactDOM.render(
    (
      <main className={centerContent}>
        <div className={authContainer}>
          <Router>
            <Switch>
              <Route exact={true} path={"/"} component={AuthenticationForm} />
              <Route exact={true} path={"/register"} component={RegistrationForm} />
              <Redirect path="*" to="/" />
            </Switch>
          </Router>
        </div>
      </main>
    ),
    document.getElementById("app")
  );

// TODO: nginx jwt check
const mount = async () => {
  const token = localStorage.getItem("token");
  if (token && (await authenticate(token))) {
    window.location.href = baseUrl;
    return;
  }

  await i18n();

  (document.getElementById("app") as HTMLElement).className = appContainer;

  return process.env.NODE_ENV === "production" ? render() : (() => {
    const axe = require("react-axe");
    axe(React, ReactDOM, 1000);
    render();
  })();
};

mount();

if (module.hot) {
  module.hot.accept(mount);
}
