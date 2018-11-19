import React from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import ApplianceRoot from "./appliance/ApplianceRoot";
import MaintainerRoot from "./maintainer/MaintainerRoot";
import Topbar from "./navigation/Topbar";
import Organisations from "./organisation/Organisations";

export default () => (
  <Router>
    <>
      <Topbar />
      <Switch>
        <Route path="/organisation" component={Organisations} />
        <Route path="/appliances" component={ApplianceRoot} />
        <Route path="/maintainers" component={MaintainerRoot} />
        <Redirect path="*" to="/organisation" />
      </Switch>
    </>
  </Router>
);
