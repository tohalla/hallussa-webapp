import React, { Component } from "react";

import ApplianceList from "../components/appliances/ApplianceList";
import ApplianceTabs from "../components/appliances/ApplianceTabs";

export default class ApplianceView extends Component {
  public render() {
    return (
      <div>
        <ApplianceTabs />
        <ApplianceList />
      </div>
    )
  }
}
