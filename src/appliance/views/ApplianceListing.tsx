import React, { Component } from "react";
import { AppliancePayload } from "../actions";

import WithSidebar from "../../components/layouts/WithSidebar";

import Drawers from "../../components/drawers/Drawers";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import ApplianceList from "../components/ApplianceList";
import Latest from "../drawers/Latest";
import Summary from "../drawers/Summary";

interface StateProps {
  appliances: ReadonlyArray<AppliancePayload> | APIResponsePayload;
}

export default class ApplianceListing extends Component<StateProps> {
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
