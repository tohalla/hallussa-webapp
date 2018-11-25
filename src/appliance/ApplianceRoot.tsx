import React from "react";
import { Link, Redirect, Route, Switch } from "react-router-dom";

import ViewContainer from "../components/layouts/ViewContainer";
import tabbed from "../components/tabbed/tabbed";
import { padded } from "../emotion-styles/src/container";
import ApplianceForm from "./components/ApplianceForm";
import Appliance from "./views/Appliance";
import ApplianceListing from "./views/ApplianceListing";

const view = tabbed("appliances");

export default () => (
  <ViewContainer>
    <Switch>
      <Route exact={true} path="/appliances" component={view(ApplianceListing)} />
      <Route
        exact={true}
        path="/appliances/new"
        component={view(ApplianceForm, {
          contentComponentProps: {
            header: <h1>New appliance</h1>,
            secondary: <Link to={"/appliances"}>Cancel</Link>,
          },
          contentContainerClassName: padded,
        })}
      />
      <Route exact={true} path="/appliances/:appliance" component={view(Appliance)} />
      <Redirect path="/appliances/*" to="/appliances" />
    </Switch>
  </ViewContainer>
);
