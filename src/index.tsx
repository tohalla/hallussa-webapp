import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./store";

import { navGroup, navItem, topbar } from "./emotion-styles/src/topbar";

ReactDOM.render(
  <Provider store={store}>
    <div>
      <div className={topbar}>
        <nav className={navGroup}>
          <a className={navItem} href="#">Hello world!</a>
          <a className={navItem} href="#">abc</a>
          <a className={navItem} href="#">one two three</a>
        </nav>
        <nav className={navGroup}>
          <a className={navItem} href="#">Log in / Sign up</a>
        </nav>
      </div>
      <div>{"CS-E4400"}</div>
    </div>
  </Provider>,
  document.getElementById("app")
);
