import React, { ReactElement } from "react";
import AddTab from "./AddTab";
import Tab from "./Tab";
import TabComponent from "./TabComponent";

interface TabInterface {
  content: ReactElement<AddTab | Tab>;
  onClick(): void;
}

interface TabContainerProps {
  tabs: TabInterface[];
  activeTab: number;
}

/**
 * TabContainer - Functional React Component
 * Renders a wrapper for the contents of all Tabs (of type Tab or AddTab)
 * wrapped inside a TabComponent.
 */
const TabContainer = (props: TabContainerProps) => {
  const { tabs, activeTab } = props;
  return (
    <div>
      {tabs.map(({ content, onClick }, i) => (
        <TabComponent
          key={`tab_${i}`}
          active={i === activeTab}
          onClick={onClick}>
          {content}
        </TabComponent>
      ))}
    </div>
  )
};

export default TabContainer;
