import React from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import ViewContainer from "../components/layouts/ViewContainer";
import tabbed from "../components/tabbed/tabbed";
import { padded } from "../emotion-styles/src/container";
import MaintainerForm from "./components/MaintainerForm";
import Maintainer from "./views/Maintainer";
import MaintainerListing from "./views/MaintainerListing";

const view = tabbed("maintainers");

export default () => (
  <Router basename="/maintainers">
    <ViewContainer>
      <Switch>
        <Route exact={true} path="/" component={view(MaintainerListing, {contentContainerClassName: padded})} />
        <Route
          exact={true}
          path="/new"
          component={view(MaintainerForm, {
            contentComponentProps: {header: <h1>New maintainer</h1>},
            contentContainerClassName: padded,
          })}
        />
        <Route exact={true} path="/:maintainer" component={view(Maintainer, {contentContainerClassName: padded})} />
        <Redirect path="*" to="/" />
      </Switch>
    </ViewContainer>
  </Router>
);
