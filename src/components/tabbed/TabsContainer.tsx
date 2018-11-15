import { map, values } from "ramda";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { closeTab, createTab, TabPayload } from "./actions";
import TabComponent from "./TabComponent";

interface Props {
  tabs: {[key: string]: TabPayload};
  view: string;
}

interface DispatchProps {
  closeTab(view: string, payload: string): any;
}

class TabsContainer extends Component<Props & DispatchProps> {
  public handleTabClose = (tab: TabPayload) => () => {
    this.props.closeTab(this.props.view, tab.key);
  }

  public getPath = (tab: TabPayload) => {
    const { view } = this.props;
    return view === tab.key ? "/" : `/${tab.key}`;
  }

  public renderTab = (tab: TabPayload) => {
    const { label } = tab;
    return (
      <TabComponent
        {...tab}
        handleClose={this.handleTabClose(tab)}
      >
        <Link to={this.getPath(tab)}>
          {label}
        </Link>
      </TabComponent>
    );
  }

  public render() {
    const { tabs } = this.props;
    return (
      <div>
        {map<TabPayload, JSX.Element>(this.renderTab, values(tabs))}
      </div>
    );
  }
}

export default connect(
  undefined,
  {
    closeTab,
    createTab,
  }
)(TabsContainer);
