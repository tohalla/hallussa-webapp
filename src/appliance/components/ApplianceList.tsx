import React from "react";
import { connect, MapStateToProps } from "react-redux";

import { getEntitiesByOrganisation } from "../../organisation/state";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import { AppliancePayload } from "../actions";

interface State {
  appliances: ReadonlyArray<AppliancePayload> | APIResponsePayload;
}

class ApplianceList extends React.Component {
  public render() {
    return (
      <div />
    );
  }
}

const mapStateToProps: MapStateToProps<State, {}, ReduxState> = (state) => ({
  appliances: getEntitiesByOrganisation(state, "appliances"),
});

export default connect(mapStateToProps)(ApplianceList);
