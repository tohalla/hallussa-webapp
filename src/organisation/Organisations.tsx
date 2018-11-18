import { values } from "ramda";
import React from "react";
import { connect, MapStateToProps } from "react-redux";

import { ReduxAPICall } from "../store/middleware/api/api";
import { ReduxState } from "../store/store";
import { fetchOrganisations, OrganisationPayload } from "./actions";

interface StateProps {
  organisations: ReadonlyArray<OrganisationPayload>;
}

interface DispatchProps {
  fetchOrganisations(): ReduxAPICall;
}

class Organisations extends React.Component<DispatchProps> {
  public componentWillMount() {
    this.props.fetchOrganisations();
  }

  public render() {
    return <div />;
  }
}

const mapStateToProps: MapStateToProps<StateProps, {}, ReduxState> = (state) => ({
  organisations: values(state.entities.organisations),
});

export default connect(
  mapStateToProps,
  {fetchOrganisations}
)(Organisations);
