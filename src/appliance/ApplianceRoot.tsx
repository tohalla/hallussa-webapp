import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";

import { openTab } from "../components/tabbed/actions";
import store from "../store/store";
import ApplianceTabs from "./tabs/ApplianceTabs";
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
          <Route exact={true} path="/" component={ApplianceListingView} />
          <Route path="/:applianceId" component={ApplianceView} />
          <Route path="/new" component={NewApplianceView} />
        </>
      </Router>
    );
  }
}
