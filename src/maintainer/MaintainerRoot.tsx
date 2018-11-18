import React from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import tabbed from "../components/tabbed/tabbed";
import Maintainer from "./views/Maintainer";
import MaintainerListing from "./views/MaintainerListing";
import NewMaintainer from "./views/NewMaintainer";

const view = tabbed("maintainers");

export default () => (
  <Router basename="/maintainers">
    <Switch>
      <Route exact={true} path="/" component={view(MaintainerListing)} />
      <Route exact={true} path="/new" component={view(NewMaintainer)} />
      <Route exact={true} path="/:maintainer" component={view(Maintainer)} />
      <Redirect path="*" to="/" />
    </Switch>
  </Router>
);
