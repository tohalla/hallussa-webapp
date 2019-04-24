import classNames from "classnames";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import ViewContainer from "../component/layout/ViewContainer";
import { padded, viewContentContainer } from "../style/container";
import Details from "./view/Details";

export default () => (
  <ViewContainer className={classNames(viewContentContainer, padded)}>
    <Switch>
      <Route exact={true} path="/account" component={Details} />
      <Redirect path="/account/*" to="/account" />
    </Switch>
  </ViewContainer>
);
