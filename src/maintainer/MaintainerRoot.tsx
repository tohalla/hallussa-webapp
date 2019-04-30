import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import ViewContainer from "../component/layout/ViewContainer";
import { RestrictedRoute } from "../component/Restricted";
import tabbed from "../component/tabbed/tabbed";
import TabRouteIndexLookup from "../component/tabbed/TabRouteIndexLookup";
import { padded } from "../style/container";
import { MaintainerPayload } from "./actions";
import Create from "./view/Create";
import Details from "./view/Details";
import Listing from "./view/Listing";

const MaintainersTabbed = tabbed({view: "maintainers"});

const TabRoute = TabRouteIndexLookup<MaintainerPayload>({
  accessor: "maintainer",
  context: "maintainers",
  getLabel: ({firstName, lastName}) => `${firstName} ${lastName}`,
  rootPath: "/maintainers",
});

export default () => (
  <ViewContainer>
    <Switch>
      <Route
        exact={true}
        path="/maintainers"
        component={MaintainersTabbed(Listing, {contentContainerClassName: padded})}
      />
      <RestrictedRoute
        component={MaintainersTabbed(Create)}
        path="/maintainers/new"
        requirements={{userRole: {allowCreateMaintainer: true}}}
        to="/maintainers"
      />
      <TabRoute path="/maintainers/:maintainer" component={MaintainersTabbed(Details)} />
      <Redirect path="/maintainers/*" to="/maintainers" />
    </Switch>
  </ViewContainer>
);
