import { head, last, path } from "ramda";
import React, { Component } from "react";
import { connect } from "react-redux";

import { CreatePayload } from "../../components/tabs/reducer";

interface ViewDispatchProps {
  activeTab: string;
  location: {
    pathname: string;
  };
  openTab: (view: string, payload: CreatePayload) => void;
}

class DetailsView extends Component<ViewDispatchProps> {
  public componentWillMount() {
    
  }

  public handleClick() {
    console.log("todo");
  }

  public render() {
    return (
      <>
        <div>Details of an appliance</div>
        <button onClick={this.handleClick}>Click to edit</button>
      </>
    )
  }
}

const mapStateToProps = (state: object) => ({
  activeTab: path(["views", "appliances", "activeTab"], state),
});

export default connect(
  mapStateToProps
)(DetailsView as any);
