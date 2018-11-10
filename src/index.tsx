import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Appliances from "./appliances";
import Home from "./home";
import Maintainers from "./maintainers";
import Navigation from "./navigation";
import store from "./store";
import { authenticate } from "./auth/auth";


// TODO: nginx jwt check
(async () => {
  const token = localStorage.getItem("token");
  if (token && (await authenticate(token))) {
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <Navigation />
          <Route exact path="/" component={Home} />
          <Route path="/appliances" component={Appliances} />
          <Route path="/maintainers" component={Maintainers} />
        </Router>
      </Provider>,
      document.getElementById("app")
    );
    return;
  }
  window.location.href = window.location.origin + "/authentication.html";
})();
