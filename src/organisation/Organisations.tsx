import { path } from "ramda";
import React from "react";
import { connect } from "react-redux";

import { ReduxAPICall } from "../store/middleware/api";
import { fetchOrganisations } from "./actions";

const mapStateToProps = (state: object) => ({
  organisations: path(["entities", "organisations"], state),
});

interface AccountDispatchProps {
  fetchOrganisations(): ReduxAPICall;
}

class Organisations extends React.Component<AccountDispatchProps> {
  public componentWillMount() {
    this.props.fetchOrganisations();
  }

  public render() {
    return <div />;
  }
}

export default connect(
  mapStateToProps,
  {fetchOrganisations}
)(Organisations);
