import { last, path } from "ramda";
import React, { Component } from "react";
import { connect } from "react-redux";

interface ApplianceViewProps {
  match: {
    params: {
      applianceId: string
    };
  };
}

class ApplianceViewProps extends Component<ApplianceViewProps> {
  public constructor(props: ApplianceViewProps) {
    super(props);
    // console.log(props);
  }

  public handleClick() {
    // TODO
  }

  public render() {
    console.log(this.props);
    return (
      <>
        <div>Details of an appliance</div>
        <button onClick={this.handleClick}>Click to edit</button>
      </>
    );
  }
}

const mapStateToProps = (state: object, ownProps: any) => ({
  activeTab: path(["views", "appliances", "activeTab"], state),
  tab: last(path(["location", "pathname"], ownProps) as string),
});

export default connect(
  mapStateToProps,
  {}
)(ApplianceViewProps as any);
