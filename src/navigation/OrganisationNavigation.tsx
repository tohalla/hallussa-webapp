import React from "react";
import { connect, MapStateToProps } from "react-redux";

import { useTranslation } from "react-i18next";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import { ReduxState } from "../store/store";
import { activeItem, navGroup, navItem } from "../style/topbar";
import OrganisationNavItem from "./OrganisationNavItem";

interface StateProps {
  organisationSelected: boolean;
}

const OrganisationNavigation = ({organisationSelected}: StateProps & RouteComponentProps) => {
  const {t} = useTranslation();

  return (
    <div className={navGroup}>
      {
        organisationSelected ? (
          <>
            <OrganisationNavItem />
            <NavLink activeClassName={activeItem} className={navItem} to="/appliances">
              {t("navigation.item.appliances")}
            </NavLink>
            <NavLink activeClassName={activeItem} className={navItem} to="/maintainers">
              {t("navigation.item.maintainers")}
            </NavLink>
          </>
        ) : (
          <NavLink activeClassName={activeItem} className={navItem} to="/organisation">
            {t("navigation.item.organisations")}
          </NavLink>
        )
      }
    </div>
  );
};

const mapStateToProps: MapStateToProps<StateProps, {}, ReduxState> = (state) => ({
  organisationSelected: typeof state.session.activeOrganisation === "number",
});

export default withRouter(connect(
  mapStateToProps
)(OrganisationNavigation));
