import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { addTab, changeTab, closeTab } from "./actions";
import TabComponent from "./TabComponent";

interface TabsContainerProps {
  activeTab: string;
  tabs: {
    [key: string]: {
      label: string;
      sticky?: boolean;
    };
  };
  path: string;
  addTab(): void;
  changeTab(payload: { nextTab: string }, path: string): void;
  closeTab(payload: { targetTab: string }, path: string): void;
}

class TabsContainer extends Component<TabsContainerProps> {
  public handleTabChange = (key: string, tab: any, isActive: boolean) => () => {
    if (!isActive) {
      this.props.changeTab({ nextTab: key }, this.props.path);
      // this.props.changeView()
    }
  }

  public handleTabClose = (key: string, tab: any, isActive: boolean) => () => {
    this.props.closeTab({ targetTab: key }, this.props.path);
  }

  public getPath = (key: string, tab: any) => {
    const { path } = this.props;
    return `/${path[path.length - 1]}/${key}`;
  }

  public renderTab = (key: string, tab: { label: string }) => {
    const { activeTab } = this.props;
    const { label } = tab;
    const isActive = activeTab === key;
    return (
      <TabComponent
        onClick={this.handleTabChange(key, tab, isActive)}
        closable={true}
        onClose={this.handleTabClose(key, tab, isActive)}
        key={`tab_${key}`}
        active={isActive}>
        <Link to={this.getPath(key, tab)}>
          {label}
        </Link>
      </TabComponent>
    );
  }

  public render() {
    const { tabs } = this.props;
    return (
      <div>
        {Object.keys(tabs).map((k) => this.renderTab(k, tabs[k]))}
      </div>
    );
  }
}

export default connect<{}, {}, TabsContainerProps>(
  undefined,
  {
    addTab,
    changeTab,
    closeTab,
  }
)(TabsContainer);
