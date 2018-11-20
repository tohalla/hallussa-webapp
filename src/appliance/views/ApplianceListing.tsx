import React, { Component } from "react";
import { connect, MapStateToProps } from "react-redux";
import { getEntitiesByOrganisation } from "../../organisation/state";
import { ReduxState } from "../../store/store";
import { AppliancePayload } from "../actions";

import WithSidebar from "../../components/layouts/WithSidebar";

import Drawers from "../../components/drawers/Drawers";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import loadable from "../../util/hoc/loadable";
import ApplianceList from "../components/ApplianceList";
import Latest from "../drawers/Latest";
import Summary from "../drawers/Summary";

interface StateProps {
  appliances: ReadonlyArray<AppliancePayload> | APIResponsePayload;
}

class ApplianceListing extends Component<StateProps> {
  public renderSidebarContent = () => {
    return (
      <Drawers
        drawers={{
          latest: {
            content: <Latest />,
            label: "Latest activity",
          },
          summary: {
            content: <Summary />,
            label: "Summary",
          },
        }}
      />
    );
  }

  public render() {
    return (
      <WithSidebar
        content={<ApplianceList />}
        sidebarContent={this.renderSidebarContent()}
      />
    );
  }
}

const mapStateToProps: MapStateToProps<StateProps, {}, ReduxState> = (state): StateProps => ({
  appliances: getEntitiesByOrganisation(state, "appliances"),
});

export default connect(
  mapStateToProps
)(loadable(ApplianceListing));
