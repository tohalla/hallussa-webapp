import React, { Component } from "react";
import { connect } from "react-redux";

import { addTab, changeTab, closeTab } from "./actions";
import TabComponent from "./TabComponent";

interface TabsContainerProps {
  activeTab: string;
  tabs: {
    [key: string]: {
      content: Node;
      label: string;
      sticky?: boolean;
      onClose: (isActive: boolean) => boolean;
      onSelect?: () => void;
    };
  };
  path: string;
  addTab(): void;
  changeTab(payload: { nextTab: string }, path: string): void;
  closeTab(payload: { targetTab: string }, path: string): void;
}

class TabsContainer extends Component<TabsContainerProps> {
  public handleTabChange = (key: string, tab: any) => {
    const { onSelect } = tab;
    if (onSelect && typeof onSelect === "function") {
      onSelect();
    }

    this.props.changeTab({ nextTab: key }, this.props.path);
  }

  public handleTabClose = (key: string, tab: any, isActive: boolean) => () => {
    if (tab.onClose(isActive)) {
      this.props.closeTab({ targetTab: key }, this.props.path);
    }
  }

  public render() {
    const { activeTab, tabs } = this.props;
    return (
      <div>
        {Object.keys(tabs).map((k) => {
          const { label, onClose } = tabs[k];
          const isActive = activeTab === k;
          return (
            <TabComponent
              onClick={() => {
                if (!isActive) {
                  this.handleTabChange(k, tabs[k]);
                }
              }}
              closable={onClose(isActive)}
              onClose={this.handleTabClose(k, tabs[k], isActive)}
              key={`tab_${k}`}
              active={isActive}>
              {label}
            </TabComponent>
          );
        })}
      </div>
    );
  }
}

export default connect(
  undefined,
  {
    addTab,
    changeTab,
    closeTab,
  }
)(TabsContainer);
