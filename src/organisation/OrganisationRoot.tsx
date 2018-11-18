import React from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import tabbed from "../components/tabbed/tabbed";

const view = tabbed("organisation");

export default () => (
  <Router basename="/appliances">
    <>
      <Switch>
        <Redirect path="*" to="/" />
      </Switch>
    </>
  </Router>
);
