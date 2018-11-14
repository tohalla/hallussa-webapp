import { path } from "ramda";
import React, { Component } from "react";
import { connect } from "react-redux";

interface ApplianceListingProps {
  appliances: any;
  maintainers: any;
}

class ApplianceListingView extends Component<ApplianceListingProps> {
  public render() {
    return (
      <div>List of Appliances</div>
    );
  }
}

const mapStateToProps = (state = {}) => ({
  appliances: path(["organisation", "appliances"], state),
  maintainers: path(["organisation", "maintainers"], state),
});

export default connect(
  mapStateToProps
)(ApplianceListingView);
