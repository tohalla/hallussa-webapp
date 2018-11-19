import React from "react";
import { connect, MapStateToProps } from "react-redux";

import { spread } from "emotion-styles/container";
import { Link, RouteComponentProps } from "react-router-dom";
import button from "../../emotion-styles/src/button";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import loadable from "../../util/hoc/loadable";
import { OrganisationPayload } from "../actions";
import OrganisationSelect from "../OrganisationSelect";
import { getOrganisation, getOrganisations } from "../state";

interface StateProps {
  activeOrganisation?: Readonly<OrganisationPayload> | APIResponsePayload;
  organisation?: OrganisationPayload;
  organisations: ReadonlyArray<OrganisationPayload> | APIResponsePayload;
}

type Props = RouteComponentProps<{organisation?: string}>;

class Organisation extends React.Component<Props & StateProps> {
  public render() {
    const {activeOrganisation, organisation, history, match, location} = this.props;
    if (typeof activeOrganisation === "undefined") {
      return <div />;
    }

    const {name, organisationIdentifier} = organisation || activeOrganisation as OrganisationPayload;
    const routeProps = {history, match, location};

    return (
      <>
        <div className={spread}>
          <OrganisationSelect organisation={organisation} {...routeProps} />
          <Link to="/new" className={button}>Create a new organisation</Link>
        </div>
        <b>{name}</b>
        {organisationIdentifier}
      </>
    );
  }
}

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state, ownProps: Props) => ({
  activeOrganisation: getOrganisation(state),
  organisation: ownProps.match.params.organisation ?
    state.entities.organisations[ownProps.match.params.organisation] : undefined,
  organisations: getOrganisations(state),
});

export default connect(
  mapStateToProps
)(loadable(Organisation));
