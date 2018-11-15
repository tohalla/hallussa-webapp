import React, { Component } from "react";
import { connect, MapStateToProps } from "react-redux";
import { getEntitiesByOrganisation } from "../../organisation/state";
import { ReduxState } from "../../store/store";
import { MaintainerPayload } from "../actions";

interface StateProps {
  maintainers: ReadonlyArray<MaintainerPayload>;
}

class MaintainerListing extends Component<StateProps> {
  public render() {
    return (
      <div>List of maintainers</div>
    );
  }
}

const mapStateToProps: MapStateToProps<StateProps, {}, ReduxState> = (
  state: ReduxState
) => ({
  maintainers: getEntitiesByOrganisation(state, "maintainers"),
});

export default connect(
  mapStateToProps
)(MaintainerListing);
