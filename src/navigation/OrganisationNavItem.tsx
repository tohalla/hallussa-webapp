import React from "react";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";

import { connect, MapStateToProps } from "react-redux";
import { activeItem, navItem } from "style/topbar";
import { OrganisationPayload } from "../organisation/actions";
import { getOrganisation, getOrganisations } from "../organisation/state";
import { APIResponsePayload } from "../store/middleware/api/actions";
import { ReduxState } from "../store/store";
import Loadable from "../util/hoc/Loadable";

interface StateProps {
  organisation?: OrganisationPayload | APIResponsePayload;
  organisations?: ReadonlyArray<OrganisationPayload> | APIResponsePayload;
}

class OrganisationNavItem extends React.Component<StateProps & RouteComponentProps> {
  public render() {
    const organisation = this.props.organisation as OrganisationPayload;
    return (
      <NavLink activeClassName={activeItem} className={navItem} to="/organisations">
        {organisation.name}
      </NavLink>
    );
  }
}

const mapStateToProps: MapStateToProps<StateProps, {}, ReduxState> = (state) => ({
  organisation: getOrganisation(state),
  organisations: getOrganisations(state),
});

export default withRouter(connect(mapStateToProps)(
  Loadable<RouteComponentProps>(OrganisationNavItem)
));
