import React from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import tabbed from "../components/tabbed/tabbed";

export default () => (
  <Router basename="/organisations">
    <Switch>
      <Route exact={true} path="/" component={() => <div />} />
      <Redirect path="*" to="/" />
    </Switch>
  </Router>
);
