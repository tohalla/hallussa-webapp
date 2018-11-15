import React, { Component } from "react";
import { connect } from "react-redux";

import WithSidebar from "../../components/layouts/WithSidebar";

import Latest from "../drawers/latest/Latest";
import Summary from "../drawers/summary/Summary";

interface Props {
  openDrawer: string;
  toggleActiveDrawer: (view: string, drawer: string) => void;
}

export default class ApplianceView extends Component<Props> {
  public renderContent = () => {
    return (
      <>
        Hey
      </>
    )
  }

  public renderSidebarContent = () => {
    return (
      <>
        <Summary
          drawerCount={2}
          toggleActiveDrawer={this.props.toggleActiveDrawer}
          openDrawer={this.props.openDrawer}
        />
        <Latest
          drawerCount={2}
          toggleActiveDrawer={this.props.toggleActiveDrawer}
          openDrawer={this.props.openDrawer}
        />
      </>
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
