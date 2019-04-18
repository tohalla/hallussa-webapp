import React, { Component } from "react";
import { AppliancePayload } from "../actions";

import WithSidebar from "../../component/layout/WithSidebar";

import Drawers from "../../component/drawer/Drawers";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import ApplianceList from "../component/ApplianceList";
import Summary from "../drawer/Summary";

interface StateProps {
  appliances: ReadonlyArray<AppliancePayload> | APIResponsePayload;
}

export default class ApplianceListing extends Component<StateProps> {
  public renderSidebarContent = () => {
    return (
      <Drawers
        drawers={{
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
