import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import store from "./store";

import ApplianceView from "./appliances/router";

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
