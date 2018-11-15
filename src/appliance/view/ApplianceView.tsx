import React, { Component } from "react";
import { connect } from "react-redux";

import WithSidebar from "../../components/layouts/WithSidebar";

import Sidebar from "../../components/layouts/Sidebar";
import Latest from "../drawers/latest/Latest";
import Summary from "../drawers/summary/Summary";

interface Props {
  openDrawer: string;
  toggleActiveDrawer: (view: string, drawer: string) => void;
}

export default class ApplianceView extends Component<Props> {
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
        <Summary
          toggleActiveDrawer={this.props.toggleActiveDrawer}
          openDrawer={this.props.openDrawer}
        />
        <Latest
          toggleActiveDrawer={this.props.toggleActiveDrawer}
          openDrawer={this.props.openDrawer}
        />
      </Sidebar>
    );
  }

  public render() {
    return (
      <WithSidebar
        content={this.renderContent()}
        sidebarContent={this.renderSidebarContent()}
      />
    );
  }
}

// const mapStateToProps = (state: object) => ({
//   // TODO: Load from redux store
//   openDrawer: "summary",
// });

// export default connect(
//   mapStateToProps
// )(ApplianceView);
