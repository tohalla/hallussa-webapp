import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter as Router, Route } from "react-router-dom";
import "whatwg-fetch"; // fetch polyfill, replaces standard fetch

import { authenticate } from "./auth/auth";
import store from "./store/store";

import ApplianceView from "./appliances";

// TODO: nginx jwt check
(async () => {
  const token = localStorage.getItem("token");
  if (token && (await authenticate(token))) {
    ReactDOM.render(
      <Provider store={store}>
        <div>
          <Router>
            <div>
              <Route path="/appliances" component={ApplianceView} />
            </div>
          </Router>
        </div>
      </Provider>,
      document.getElementById("app")
    );
    return;
  }
  window.location.href = window.location.origin + "/authentication.html";
})();
