import React from "react";
import { NavLink, RouteComponentProps } from "react-router-dom";

import { connect, MapStateToProps } from "react-redux";
import { activeItem, navItem } from "style/topbar";
import { OrganisationPayload } from "../organisation/actions";
import { getOrganisation } from "../organisation/state";
import { APIResponsePayload } from "../store/middleware/api/actions";
import { ReduxState } from "../store/store";
import Loadable from "../util/hoc/Loadable";

interface StateProps {
  organisation?: OrganisationPayload | APIResponsePayload;
}

type Props = StateProps & RouteComponentProps;

const OrganisationNavItem = ({organisation}: Props & {organisation?: OrganisationPayload}) => {
  if (!organisation) {
    return <div />;
  }
  return (
    <NavLink activeClassName={activeItem} className={navItem} to="/organisations">
      {organisation.name}
    </NavLink>
  );
};

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state): StateProps => ({
  organisation: getOrganisation(state),
});

export default connect(mapStateToProps)(
  Loadable<Props, {organisation?: OrganisationPayload}>(OrganisationNavItem)
);
