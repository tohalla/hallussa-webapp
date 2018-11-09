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
  public handleTabChange = (key: string, tab: any) => {
    this.props.changeTab({ nextTab: key }, this.props.path);
    // this.props.changeView()
  }

  public handleTabClose = (key: string, tab: any, isActive: boolean) => () => {
    this.props.closeTab({ targetTab: key }, this.props.path);
  }

  public getPath = (key: string, tab: any) => {
    const { path: p } = this.props;
    const path = [p[p.length - 1], key];
    if (tab.type === "details") {
      path.splice(1, 0, "id");
    }
    return `/${path.join("/")}`;
  }

  public render() {
    const { activeTab, tabs } = this.props;
    return (
      <div>
        {Object.keys(tabs).map((k) => {
          const { label } = tabs[k];
          const isActive = activeTab === k;
          return (
            <TabComponent
              onClick={() => {
                if (!isActive) {
                  this.handleTabChange(k, tabs[k]);
                }
              }}
              closable={true}
              onClose={this.handleTabClose(k, tabs[k], isActive)}
              key={`tab_${k}`}
              active={isActive}>
              <Link to={this.getPath(k, tabs[k])}>
                {label}
              </Link>
            </TabComponent>
          );
        })}
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
