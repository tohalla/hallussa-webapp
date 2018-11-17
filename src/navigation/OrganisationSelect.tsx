import React from "react";
import { Link } from "react-router-dom";

import { navItem } from "emotion-styles/topbar";
import { connect, MapStateToProps } from "react-redux";
import { OrganisationPayload } from "../organisation/actions";
import { getOrganisation, getOrganisations } from "../organisation/state";
import { ReduxState } from "../store/store";
import loadable from "../util/hoc/loadable";

interface StateProps {
  organisation?: OrganisationPayload;
  organisations?: ReadonlyArray<OrganisationPayload>;
}

class OrganisationSelect extends React.Component<StateProps> {
  public render() {
    const {organisation} = this.props;
    return (
      <>
        <Link className={navItem} to="/organisation">
          {typeof organisation === "undefined" ? "Organisation" : organisation.name}
        </Link>
      </>
    );
  }
}

const mapStateToProps: MapStateToProps<StateProps, {}, ReduxState> = (state) => ({
  organisation: getOrganisation(state),
  organisations: getOrganisations(state),
});

export default connect(mapStateToProps)(loadable(OrganisationSelect));
