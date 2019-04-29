import React from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import { connect, MapStateToProps } from "react-redux";
import AccountRoot from "./account/AccountRoot";
import ApplianceRoot from "./appliance/ApplianceRoot";
import MaintainerRoot from "./maintainer/MaintainerRoot";
import Topbar from "./navigation/Topbar";
import OrganisationsRoot from "./organisation/OrganisationsRoot";
import { ReduxState } from "./store/store";

interface StateProps {
  organisationSelected: boolean;
}

const RootRouter = ({organisationSelected}: StateProps) => {
  const routes = [
    <Route key="organisations" path="/organisations" component={OrganisationsRoot} />,
    <Route key="profile" path="/profile" component={AccountRoot} />,
    ...organisationSelected ? [
      <Route key="appliances" path="/appliances" component={ApplianceRoot} />,
      <Route key="maintainers" path="/maintainers" component={MaintainerRoot} />,
    ] : [],
  ];
  return (
    <Router>
      <>
        <Topbar />
        <Switch>
          {routes}
          <Redirect path="*" to="/organisations" />
        </Switch>
      </>
    </Router>
  );
};

const mapStateToProps: MapStateToProps<StateProps, {}, ReduxState> = (state) => ({
  organisationSelected: typeof state.session.activeOrganisation === "number",
});

export default connect(
  mapStateToProps
)(RootRouter);
