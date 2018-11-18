import classNames from "classnames";
import React from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import ViewContainer from "../components/layouts/ViewContainer";
import { padded, viewContentContainer } from "../emotion-styles/src/container";
import Organisation from "./views/Organisation";

export default () => (
  <Router basename="/organisations">
    <ViewContainer className={classNames(viewContentContainer, padded)}>
      <Switch>
        <Route exact={true} path="/" component={Organisation} />
        <Redirect path="*" to="/" />
      </Switch>
    </ViewContainer>
  </Router>
);
