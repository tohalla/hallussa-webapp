import React from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import Navigation from "./Navigation";

const PlaceHolder = (content: string) => () => <div>{content}</div>;

export default () => (
  <Router>
    <>
      <Navigation />
      <Switch>
        <Route path="/appliances" component={PlaceHolder("Appliances")} />
        <Route path="/maintainers" component={PlaceHolder("Maintainers")} />
        <Redirect path="*" to="/appliances" />
      </Switch>
    </>
  </Router>
);
