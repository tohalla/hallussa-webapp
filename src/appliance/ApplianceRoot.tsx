import React, { Component } from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import ApplianceTabs from "./tabs/ApplianceTabs";
import Details from "./views/Details";
import Listing from "./views/Listing";
import New from "./views/New";

export default class ApplianceRoot extends Component {
  public render() {
    return (
      <Router basename="/appliances">
        <>
          <ApplianceTabs />
          <Route path="/" component={Listing} />
          <Route path="/:applianceId" component={Details} />
          <Route path="/new" component={New} />
        </>
      </Router>
    );
  }
}
