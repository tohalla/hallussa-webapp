import React, { Component } from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import tabbed from "../components/tabbed/tabbed";
import ApplianceListingView from "./views/ApplianceListingView";
import ApplianceView from "./views/ApplianceView";
import NewApplianceView from "./views/NewApplianceView";

const view = tabbed("appliances");

export default class ApplianceRoot extends Component {
  public render() {
    return (
      <Router basename="/appliances">
        <>
          <Switch>
            <Route exact={true} path="/" component={view(ApplianceListingView)} />
            <Route exact={true} path="/:appliance" component={view(ApplianceView)} />
            <Route exact={true} path="/new" component={view(NewApplianceView)} />
            <Redirect path="*" to="/" />
          </Switch>
        </>
      </Router>
    );
  }
}
