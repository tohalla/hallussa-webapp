import React from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import { connect, MapStateToProps } from "react-redux";
import ApplianceRoot from "./appliance/ApplianceRoot";
import MaintainerRoot from "./maintainer/MaintainerRoot";
import Topbar from "./navigation/Topbar";
import OrganisationsRoot from "./organisation/OrganisationsRoot";
import { ReduxState } from "./store/store";

interface StateProps {
  organisationSelected: boolean;
}

const RootRouter = ({organisationSelected}: StateProps) => (
  <Router>
    <>
      <Topbar />
      <Switch>
        <Route path="/organisations" component={OrganisationsRoot} />
        {organisationSelected &&
          <>
            <Route path="/appliances" component={ApplianceRoot} />
            <Route path="/maintainers" component={MaintainerRoot} />
          </>
        }
        <Redirect path="*" to="/organisations" />
      </Switch>
    </>
  </Router>
);

const mapStateToProps: MapStateToProps<StateProps, {}, ReduxState> = (state) => ({
  organisationSelected: typeof state.session.activeOrganisation === "number",
});

export default connect(
  mapStateToProps
)(RootRouter);
