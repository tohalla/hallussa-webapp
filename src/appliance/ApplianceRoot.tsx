import React from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import ViewContainer from "../components/layouts/ViewContainer";
import tabbed from "../components/tabbed/tabbed";
import { padded } from "../emotion-styles/src/container";
import ApplianceForm from "./components/ApplianceForm";
import Appliance from "./views/Appliance";
import ApplianceListing from "./views/ApplianceListing";

const view = tabbed("appliances");

export default () => (
  <Router basename="/appliances">
    <ViewContainer>
      <Switch>
        <Route exact={true} path="/" component={view(ApplianceListing)} />
        <Route
          exact={true}
          path="/new"
          component={view(ApplianceForm, {
            contentComponentProps: {header: <h1>New appliance</h1>},
            contentContainerClassName: padded,
          })}
        />
        <Route exact={true} path="/:appliance" component={view(Appliance, {contentContainerClassName: padded})} />
        <Redirect path="*" to="/" />
      </Switch>
    </ViewContainer>
  </Router>
);
