import React, { Component } from "react";

import AddTab from "../../components/tabs/AddTab";
import Tab from "../../components/tabs/Tab";
import TabContainer from "../../components/tabs/TabContainer";

/**
 * Change tab and view by identifier.
 */
const changeTab = (identifier: number) => {
  // TODO
};

/**
 * Remove tab from list of tabs by identifier.
 */
const onTabRemove = (from: string, identifier: string | number) => {
  // TODO
};

/**
 * Add tab to list of tabs.
 */
const onTabAdd = (to: string) => {
  // TODO
};

// TODO: Tabs would be loaded from Redux, this is just a temp method.
const getTabs = (view: string) => {
  return [
    {
      content: (
        <Tab onClick={() => { onTabRemove("appliances", 1); }}>Hey</Tab>
      ),
      onClick: () => changeTab(1),
    },
    {
      content: (
        <AddTab visible={true} />
      ),
      onClick: () => onTabAdd("appliances"),
    },
  ];
};

export default class ApplianceTabs extends Component {
  public render() {
    return (
      <div>
        <TabContainer
          activeTab={0}
          tabs={getTabs("appliances")}
        />
      </div>
    )
  }
}
