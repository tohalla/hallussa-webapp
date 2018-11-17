import React, { Component } from "react";
import { connect, MapStateToProps } from "react-redux";
import { getEntitiesByOrganisation } from "../../organisation/state";
import { ReduxState } from "../../store/store";
import { AppliancePayload } from "../actions";

import WithSidebar from "../../components/layouts/WithSidebar";

import Latest from "../drawers/latest/Latest";
import Summary from "../drawers/summary/Summary";

import { WithDrawerHOCProps as OwnProps } from "../../components/hocs/WithDrawerHOC";

// import withDrawer from "./components/hocs/WithSidebarHOC";

interface StateProps {
  appliances: ReadonlyArray<AppliancePayload>;
}

type Props = OwnProps & StateProps;

class ApplianceListing extends Component<Props> {
  public renderContent = () => {
    return (
      <>
        List of appliances...
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

const mapStateToProps: MapStateToProps<StateProps, {}, ReduxState> = (
  state: ReduxState
): StateProps => ({
  appliances: getEntitiesByOrganisation(state, "appliances"),
});

export default connect(
  mapStateToProps
)(ApplianceListing);
