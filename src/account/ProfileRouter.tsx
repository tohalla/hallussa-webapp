import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import ViewContainer from "../component/layout/ViewContainer";
import tabbed from "../component/tabbed/tabbed";
import { padded } from "../style/container";
import Details from "./view/Details";
import Preferences from "./view/Preferences";
import Security from "./view/Security";

const Tabbed = tabbed({view: "profile"});

export default () => (
  <ViewContainer>
    <Switch>
      <Route exact={true} path="/profile" component={Tabbed(Details, {contentContainerClassName: padded})} />
      <Route path="/profile/security" component={Tabbed(Security, {contentContainerClassName: padded})} />
      <Route path="/profile/preferences" component={Tabbed(Preferences, {contentContainerClassName: padded})} />
      <Redirect path="/profile/*" to="/profile" />
    </Switch>
  </ViewContainer>
);
