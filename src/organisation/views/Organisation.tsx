import classNames from "classnames";
import { pick } from "ramda";
import React from "react";
import { connect, MapStateToProps } from "react-redux";

import { rowContainer, spread } from "emotion-styles/container";
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
  organisations: ReadonlyArray<OrganisationPayload> | APIResponsePayload;
}

type Props = RouteComponentProps<{organisation?: string}>;

const NewOrganisation = () => <Link to="/new" className={button}>Create a new organisation</Link>;

class Organisation extends React.Component<Props & StateProps> {
  public render() {
    const {activeOrganisation, organisation, history, match, location} = this.props;
    const organisations = this.props.organisations as ReadonlyArray<OrganisationPayload>;
    if (typeof activeOrganisation === "undefined" && organisations.length === 0) {
      return (
        <div className={classNames(rowContainer, spread)}>
          It seems you don't have any organisations created.
          <NewOrganisation />
        </div>
      );
    }

    const {name, organisationIdentifier} = organisation || activeOrganisation as OrganisationPayload;
    const routerProps: RouteComponentProps = pick(
      ["history", "match", "location"],
      this.props
    );

    return (
      <>
        <div className={spread}>
          <OrganisationSelect organisation={organisation} {...routerProps} />
          <NewOrganisation />
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
