import { map, values } from "ramda";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { changeTab, closeTab, createTab, TabPayload } from "./actions";
import TabComponent from "./TabComponent";

interface Props {
  tabs: {[key: string]: TabPayload};
  view: string;
}

interface DispatchProps {
  closeTab(view: string, payload: string): any;
  changeTab(view: string, payload: string): void;
}

class TabsContainer extends Component<Props & DispatchProps> {
  public handleTabChange = (tab: TabPayload) => () => {
    this.props.changeTab(this.props.view, tab.key);
  }

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
        handleOpen={this.handleTabChange(tab)}
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
    changeTab,
    closeTab,
    createTab,
  }
)(TabsContainer);
