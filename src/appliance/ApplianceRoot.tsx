import React, { Component } from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import tabbed from "../components/tabbed/tabbed";
import Appliance from "./views/Appliance";
import ApplianceListing from "./views/ApplianceListing";
import NewAppliance from "./views/NewAppliance";

const view = tabbed("appliances");

export default class ApplianceRoot extends Component {
  public render() {
    return (
      <Router basename="/appliances">
        <>
          <Switch>
            <Route exact={true} path="/" component={view(ApplianceListing)} />
            <Route exact={true} path="/new" component={view(NewAppliance)} />
            <Route exact={true} path="/:appliance" component={view(Appliance)} />
            <Redirect path="*" to="/" />
          </Switch>
        </>
      </Router>
    );
  }
}
