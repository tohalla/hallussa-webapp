import React from "react";
import { connect, MapStateToProps } from "react-redux";

import { navGroup, navItem } from "emotion-styles/topbar";
import { Link } from "react-router-dom";
import { ReduxState } from "../store/store";
import OrganisationSelect from "./OrganisationSelect";

interface StateProps {
  organisationSelected: boolean;
}

const OrganisationNavigation = ({organisationSelected}: StateProps) => (
  <div className={navGroup}>
    {
      organisationSelected ? (
        <>
          <OrganisationSelect />
          <Link className={navItem} to="/appliances">Appliances</Link>
          <Link className={navItem} to="/maintainers">Maintainers</Link>
        </>
      ) : <Link className={navItem} to="/organisation">Organisations</Link>
    }
  </div>
);

const mapStateToProps: MapStateToProps<StateProps, {}, ReduxState> = (state) => ({
  organisationSelected: typeof state.session.activeOrganisation === "number",
});

export default connect(
  mapStateToProps
)(OrganisationNavigation);
