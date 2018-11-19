import React from "react";
import { connect, MapStateToProps } from "react-redux";

import { rowContainer } from "emotion-styles/container";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import loadable from "../../util/hoc/loadable";
import { OrganisationPayload } from "../actions";
import OrganisationSelect from "../OrganisationSelect";
import { getOrganisation, getOrganisations } from "../state";

interface StateProps {
  activeOrganisation?: Readonly<OrganisationPayload> | APIResponsePayload;
  organisations: ReadonlyArray<OrganisationPayload> | APIResponsePayload;
}

class Organisation extends React.Component<StateProps> {
  public render() {
    const {activeOrganisation} = this.props;
    if (typeof activeOrganisation === "undefined") {
      return <div />;
    }

    const {name, organisationIdentifier} = activeOrganisation as OrganisationPayload;

    return (
      <>
        <div className={rowContainer}>
          <OrganisationSelect />
        </div>
        <b>{name}</b>
        {organisationIdentifier}
      </>
    );
  }
}

const mapStateToProps: MapStateToProps<StateProps, {}, ReduxState> = (state) => ({
  activeOrganisation: getOrganisation(state),
  organisations: getOrganisations(state),
});

export default connect(
  mapStateToProps
)(loadable(Organisation));
