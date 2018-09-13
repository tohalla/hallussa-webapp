import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <div>{"CS-E4400"}</div>
  </Provider>,
  document.getElementById("app")
);
