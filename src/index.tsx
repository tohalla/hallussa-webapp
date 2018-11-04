import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./store";

import ApplianceView from "./appliances/view/ApplianceView";
import { navGroup, navItem, topbar } from "./emotion-styles/src/topbar";

ReactDOM.render(
  <Provider store={store}>
    <div>
      <ApplianceView />
      <div>{"CS-E4400"}</div>
    </div>
  </Provider>,
  document.getElementById("app")
);
