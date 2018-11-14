import { head, last, path } from "ramda";
import React, { Component } from "react";
import { connect } from "react-redux";

import { CreatePayload, openTab } from "../../components/tabs/actions";

interface ViewDispatchProps {
  activeTab: string;
  tab: string;
  // tab: {
  //   [x: string]: string;
  // };
  openTab: (view: string, payload: CreatePayload) => void;
}

interface Props extends ViewDispatchProps {
  location: {
    pathname: string;
  };
}

class DetailsView extends Component<ViewDispatchProps> {
  public constructor(props: Props) {
    super(props);
    // console.log(props);
    const {
      activeTab,
      tab: tabName,
      // tab: {
      //   key: tabName,
      // },
    } = props;
    this.props.openTab(
      "appliances",
      {
        activeTab,
        tabName,
      }
    );
  }

  public handleClick() {
    // TODO
  }

  public render() {
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
  // tab: {
  //   details: (
//     path(["views", "appliances", "tabs", last(path(["location", "pathname"], ownProps) as string) as string], state)
  //   ),
  //   key: last(path(["location", "pathname"], ownProps) as string),
  // },
});

export default connect(
  mapStateToProps,
  { openTab }
)(DetailsView as any);
