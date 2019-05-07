import classnames from "classnames";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import ViewContainer from "../component/layout/ViewContainer";
import { padded, viewContentContainer } from "../style/container";
import Details from "./view/Details";

export default () => (
  <ViewContainer className={classnames(viewContentContainer, padded)}>
    <Switch>
      <Route exact={true} path="/profile" component={Details} />
      <Redirect path="/profile/*" to="/profile" />
    </Switch>
  </ViewContainer>
);
