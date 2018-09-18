import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "whatwg-fetch"; // fetch polyfill, replaces standard fetch

import store from "./store/store";

ReactDOM.render(
  <Provider store={store}>
    <div>{"CS-E4400"}</div>
  </Provider>,
  document.getElementById("app")
);
