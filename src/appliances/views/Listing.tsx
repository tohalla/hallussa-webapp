import { path } from "ramda";
import React, { Component } from "react";
import { connect } from "react-redux";

interface ListingProps {
  appliances: any;
  maintainers: any;
}

class ListingView extends Component<ListingProps>{
  public render() {
    return (
      <div>List of Appliances</div>
    )
  }
}

const mapStateToProps = (state = {}) => ({
  appliances: path(["organisation", "appliances"], state),
  maintainers: path(["organisation", "maintainers"], state),
});

export default connect(
  mapStateToProps
)(ListingView);
