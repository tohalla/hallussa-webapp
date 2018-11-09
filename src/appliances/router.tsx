import React, { ReactChild } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import DetailsView from "./views/Details";
import ListingView from "./views/Listing";
import NewView from "./views/New";

import ApplianceTabs from "./tabs/ApplianceTabs";

export default () => (
  <Router>
    <div>
      <ApplianceTabs />
      <Switch>
          <Route path="/appliances/new" exact={true} component={NewView} />
          <Route path="/appliances/listing" exact={true} component={ListingView} />
          <Route path="/appliances/:appliance_id" component={DetailsView} />
      </Switch>
    </div>
  </Router>
);
