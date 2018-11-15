import "@babel/polyfill";
import defaultContainer, { appContainer, centerContent } from "emotion-styles/container";
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import "whatwg-fetch"; // fetch polyfill, replaces standard fetch

import "emotion-styles";

import { baseUrl } from "../config";
import { authenticate } from "./auth";
import AuthenticationForm from "./AuthenticationForm";

// TODO: nginx jwt check
(async () => {
  const token = localStorage.getItem("token");
  if (token && (await authenticate(token))) {
    window.location.href = baseUrl;
    return;
  }

  (document.getElementById("app") as HTMLElement).className = appContainer;

  ReactDOM.render(
    <div className={centerContent}>
      <div className={defaultContainer}>
        <Router>
          <Switch>
            <Route exact={true} path={"/"} component={AuthenticationForm} />
            <Route exact={true} path={"/register"} component={() => "register"} />
            <Redirect path="*" to="/" />
          </Switch>
        </Router>
      </div>
    </div>,
    document.getElementById("app")
  );
})();
