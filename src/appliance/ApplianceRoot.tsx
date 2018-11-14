import React, { Component } from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import { openTab } from "../components/tabbed/actions";
import store from "../store/store";
import ApplianceTabs from "./ApplianceTabs";
import ApplianceListingView from "./views/ApplianceListingView";
import ApplianceView from "./views/ApplianceView";
import NewApplianceView from "./views/NewApplianceView";

store.dispatch(openTab("appliances", {key: "1", label: "test"}));

export default class ApplianceRoot extends Component {
  public render() {
    return (
      <Router basename="/appliances">
        <>
          <ApplianceTabs />
          <Switch>
            <Route exact={true} path="/" component={ApplianceListingView} />
            <Route exact={true} path="/:applianceId" component={ApplianceView} />
            <Route exact={true} path="/new" component={NewApplianceView} />
            <Redirect path="*" to="/" />
          </Switch>
        </>
      </Router>
    );
  }
}
