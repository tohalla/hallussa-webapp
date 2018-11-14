import { last } from "ramda";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { changeTab, closeTab, openTab } from "./actions";
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
  openTab(): void;
  changeTab(path: string, payload: string): void;
  closeTab(path: string, payload: string): void;
}

class TabsContainer extends Component<TabsContainerProps> {
  public handleTabChange = (key: string, tab: any, isActive: boolean) => () => {
    if (!isActive) {
      this.props.changeTab(last(this.props.path), key);
    }
  }

  public handleTabClose = (key: string, tab: any, isActive: boolean) => () => {
    this.props.closeTab(last(this.props.path), key);
  }

  public getPath = (key: string, tab: any) => {
    const { path } = this.props;
    return `/${last(path)}/${key}`;
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
        key={key}
        active={isActive}
      >
        <Link to={this.getPath(key, tab)}>
          {label}
        </Link>
      </TabComponent>
    );
  }

  public render() {
    const { tabs } = this.props;
    console.log(tabs);
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
    changeTab,
    closeTab,
    openTab,
  }
)(TabsContainer);
