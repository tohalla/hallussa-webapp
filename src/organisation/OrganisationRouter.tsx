import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import ViewContainer from "../component/layout/ViewContainer";
import OrganisationRoot from "./OrganisationRoot";
import Create from "./view/Create";
import NoneCreated from "./view/NoneCreated";

export default () => (
  <ViewContainer>
    <Switch>
      <Route exact={true} path="/organisations" component={NoneCreated} />
      <Route exact={true} path="/organisations/new" component={Create} />
      <Route path="/organisations/:organisation" component={OrganisationRoot} />
      <Redirect path="/organisations/*" to="/organisations" />
    </Switch>
  </ViewContainer>
);
