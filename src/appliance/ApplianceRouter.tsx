import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import ViewContainer from "../component/layout/ViewContainer";
import { RestrictedRoute } from "../component/Restricted";
import tabbed from "../component/tabbed/tabbed";
import TabRouteIndexLookup from "../component/tabbed/TabRouteIndexLookup";
import Edit from "../maintainer/view/Edit";
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
      <RestrictedRoute
        to="/appliances"
        path="/appliances/new"
        component={AppliancesTabbed(Create)}
        requirements={{userRole: {allowCreateAppliance: true}}}
      />
      <Route path="/appliances/:appliance">
        <Switch>
          <TabRoute exact={true} path={"/appliances/:appliance"} component={AppliancesTabbed(Details)} />
          <TabRoute
            path={"/appliances/:appliance/edit"}
            component={Edit}
            requirements={{userRole: {allowUpdateAppliance: true}}}
          />
        </Switch>
      </Route>
      <Redirect to="/appliances" />
    </Switch>
  </ViewContainer>
);
