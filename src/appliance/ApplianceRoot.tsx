import React, { Component } from "react";

import ApplianceList from "./list/ApplianceList";
import ApplianceTabs from "./tabs/ApplianceTabs";

export default class ApplianceView extends Component {
  public render() {
    return (
      <div>
        <ApplianceTabs />
        <ApplianceList />
      </div>
    );
  }
}
