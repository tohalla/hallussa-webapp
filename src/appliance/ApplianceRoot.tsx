import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import ViewContainer from "../component/layout/ViewContainer";
import tabbed from "../component/tabbed/tabbed";
import TabRouteIndexLookup from "../component/tabbed/TabRouteIndexLookup";
import { AppliancePayload } from "./actions";
import Create from "./view/Create";
import Details from "./view/Details";
import Listing from "./view/Listing";

export const AppliancesTabbed = tabbed({view: "appliances"});

const TabRoute = TabRouteIndexLookup<AppliancePayload>({
  accessor: "appliance",
  context: "appliances",
  getLabel: (appliance) => appliance.name,
  rootPath: "/appliances",
});

export default () => (
  <ViewContainer>
    <Switch>
      <Route exact={true} path="/appliances" component={AppliancesTabbed(Listing)} />
      <Route
        exact={true}
        path="/appliances/new"
        component={AppliancesTabbed(Create)}
      />
      <TabRoute path="/appliances/:appliance" component={AppliancesTabbed(Details)} />
      <Redirect to="/appliances" />
    </Switch>
  </ViewContainer>
);
