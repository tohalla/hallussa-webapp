import classNames from "classnames";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import ViewContainer from "../component/layout/ViewContainer";
import { padded, viewContentContainer } from "../style/container";
import Create from "./view/Create";
import Details from "./view/Details";
import NoneCreated from "./view/NoneCreated";

export default () => (
  <ViewContainer className={classNames(viewContentContainer, padded)}>
    <Switch>
      <Route exact={true} path="/organisations/" component={NoneCreated} />
      <Route exact={true} path="/organisations/new" component={Create} />
      <Route path="/organisations/:organisation" component={Details} />
      <Redirect path="/organisations/*" to="/organisations" />
    </Switch>
  </ViewContainer>
);
