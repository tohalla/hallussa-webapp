import React, { Component } from "react";
import { connect } from "react-redux";

import WithSidebar from "../../components/layouts/WithSidebar";

import ApplianceList from "../list/ApplianceList";
import ApplianceTabs from "../tabs/ApplianceTabs";

import Sidebar from "../../components/layouts/Sidebar";
import Latest from "../drawers/latest/Latest";
import Summary from "../drawers/summary/Summary";

interface Props {
  openDrawer: string;
}

class ApplianceView extends Component<Props> {
  public renderContent = () => {
    return (
      <div>
        Hey
      </div>
    )
  }

  public renderSidebarContent = () => {
    return (
      <Sidebar>
        <Summary {...this.props}} />
        <Latest {...this.props} />
      </Sidebar>
    );
  }

  public render() {
    return (
      <WithSidebar
        content={this.renderContent()}
        sidebarContent={this.renderSidebarContent()}
      />
      // <div>
      //   {/* <ApplianceTabs />
      //   <ApplianceList /> */}
      //   Hello world!
      // </div>
    )
  }
}

const mapStateToProps = (state: object) => ({
  // TODO: Load from redux store
  openDrawer: "summary",
});

export default connect(
  mapStateToProps
)(ApplianceView);
