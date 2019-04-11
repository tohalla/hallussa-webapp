import React from "react";
import { connect, MapStateToProps } from "react-redux";

import { activeItem, navGroup, navItem } from "styles/topbar";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import { ReduxState } from "../store/store";
import OrganisationSelect from "./OrganisationNavItem";

interface StateProps {
  organisationSelected: boolean;
}

const OrganisationNavigation = ({organisationSelected}: StateProps & RouteComponentProps) => (
  <div className={navGroup}>
    {
      organisationSelected ? (
        <>
          <OrganisationSelect />
          <NavLink activeClassName={activeItem} className={navItem} to="/appliances">Appliances</NavLink>
          <NavLink activeClassName={activeItem} className={navItem} to="/maintainers">Maintainers</NavLink>
        </>
      ) : <NavLink activeClassName={activeItem} className={navItem} to="/organisation">Organisations</NavLink>
    }
  </div>
);

const mapStateToProps: MapStateToProps<StateProps, {}, ReduxState> = (state) => ({
  organisationSelected: typeof state.session.activeOrganisation === "number",
});

export default withRouter(connect(
  mapStateToProps
)(OrganisationNavigation));
