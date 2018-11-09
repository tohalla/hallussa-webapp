import React, { ReactChild } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import DetailsView from "./views/Details";
import ListingView from "./views/Listing";
import NewView from "./views/New";

import ApplianceTabs from "./tabs/ApplianceTabs";

export default () => (
  <Router>
    <div>
      <Route path="/appliances/id/:appliance_id" component={DetailsView} />
      <Route path="/appliances/new" exact component={NewView} />
      <Route path="/appliances/listing" exact component={ListingView} />
      <ApplianceTabs />
    </div>
  </Router>
);
