import React from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import Topbar from "./navigation/Topbar";

const PlaceHolder = (content: string) => () => <div>{content}</div>;

export default () => (
  <Router>
    <>
      <Topbar />
      <Switch>
        <Route path="/appliances" component={PlaceHolder("Appliances")} />
        <Route path="/maintainers" component={PlaceHolder("Maintainers")} />
        <Redirect path="*" to="/appliances" />
      </Switch>
    </>
  </Router>
);
