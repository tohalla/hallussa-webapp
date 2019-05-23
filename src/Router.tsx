import React from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import { connect, MapStateToProps } from "react-redux";
import ProfileRouter from "./account/ProfileRouter";
import ApplianceRouter from "./appliance/ApplianceRouter";
import MaintainerRouter from "./maintainer/MaintainerRouter";
import Topbar from "./navigation/Topbar";
import OrganisationsRouter from "./organisation/OrganisationRouter";
import { ReduxState } from "./store/store";

interface StateProps {
  organisationSelected: boolean;
}

const RootRouter = ({organisationSelected}: StateProps) => {
  const routes = [
    <Route key="organisations" path="/organisations" component={OrganisationsRouter} />,
    <Route key="profile" path="/profile" component={ProfileRouter} />,
    ...organisationSelected ? [
      <Route key="appliances" path="/appliances" component={ApplianceRouter} />,
      <Route key="maintainers" path="/maintainers" component={MaintainerRouter} />,
    ] : [],
  ];
  return (
    <Router>
      <>
        <Topbar />
        <main>
          <Switch>
            {routes}
            <Redirect path="*" to="/organisations" />
          </Switch>
        </main>
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
