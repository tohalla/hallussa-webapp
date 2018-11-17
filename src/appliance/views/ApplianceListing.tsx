import React, { Component } from "react";
import { connect, MapStateToProps } from "react-redux";
import { getEntitiesByOrganisation } from "../../organisation/state";
import { ReduxState } from "../../store/store";
import { AppliancePayload } from "../actions";

interface StateProps {
  appliances: ReadonlyArray<AppliancePayload>;
}

class ApplianceListing extends Component<StateProps> {
  public render() {
    return (
      <div>List of Appliances</div>
    );
  }
}

const mapStateToProps: MapStateToProps<StateProps, {}, ReduxState> = (state): StateProps => ({
  appliances: getEntitiesByOrganisation(state, "appliances"),
});

export default connect(
  mapStateToProps
)(ApplianceListing);
