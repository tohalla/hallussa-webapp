import React from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import ApplianceView from "./appliance/view/ApplianceView";
import Topbar from "./navigation/Topbar";
import Organisations from "./organisation/Organisations";

const PlaceHolder = (content: string) => () => <div>{content}</div>;

import withDrawer from "./components/hocs/WithSidebarHOC";

export default () => (
  <Router>
    <>
      <Topbar />
      <Switch>
        <Route path="/organisation" component={Organisations} />
        <Route path="/appliances" component={withDrawer(ApplianceView)} />
        <Route path="/maintainers" component={PlaceHolder("Maintainers")} />
        <Redirect path="*" to="/organisation" />
      </Switch>
    </>
  </Router>
);
