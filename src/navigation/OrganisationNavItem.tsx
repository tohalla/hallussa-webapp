import React from "react";
import { Link } from "react-router-dom";

import { navItem } from "emotion-styles/topbar";
import { connect, MapStateToProps } from "react-redux";
import { OrganisationPayload } from "../organisation/actions";
import { getOrganisation, getOrganisations } from "../organisation/state";
import { APIResponsePayload } from "../store/middleware/api/actions";
import { ReduxState } from "../store/store";
import loadable from "../util/hoc/loadable";

interface StateProps {
  organisation?: OrganisationPayload | APIResponsePayload;
  organisations?: ReadonlyArray<OrganisationPayload> | APIResponsePayload;
}

class OrganisationNavItem extends React.Component<StateProps> {
  public render() {
    const organisation = this.props.organisation as OrganisationPayload;
    return (
      <Link className={navItem} to="/organisation">
        {organisation.name}
      </Link>
    );
  }
}

const mapStateToProps: MapStateToProps<StateProps, {}, ReduxState> = (state) => ({
  organisation: getOrganisation(state),
  organisations: getOrganisations(state),
});

export default connect(mapStateToProps)(loadable(OrganisationNavItem));
