import React, { Component } from "react";
import { connect } from "react-redux";

import { addTab, changeTab, closeTab } from "./actions";
import TabComponent from "./TabComponent";

interface TabsContainerProps {
  activeTab: string;
  tabs: {
    [key: string]: {
      content: Node;
      label: ((isActive: boolean) => string) | string;
      sticky?: boolean;
      handleClose?: (isActive: boolean) => boolean;
    };
  };
  path: string;
}

class TabsContainer extends Component<TabsContainerProps> {
  public handleTabChange = (tab: string) => {
    const { changeTab, path } = this.props;
    
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
              onSelect={handleTabChange(k)}
              onClose={handleTabClose(k)}
              key={`tab_${k}`}
              active={isActive}>>
              {typeof label === "function" ? label(isActive) : label}
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
