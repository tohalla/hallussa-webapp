import { path, map } from "ramda";
import React, { Component } from "react";
import { connect } from "react-redux";

import { Dispatch } from "redux";
import { addTab, changeTab, closeTab } from "../../components/tabs/actions";

import AddTab from "../../components/tabs/AddTab";
import Tab from "../../components/tabs/Tab";
import TabComponent from "../../components/tabs/TabComponent";
import TabContainer, { TabInterface } from "../../components/tabs/TabContainer";

interface TabsProps {
  activeTab: string;
  tabs: {
    [key: string]: TabInterface
  };
}

class Tabs extends Component<TabsProps> {
  public handleTabCreate = () => {
    const { addTab } = this.props;
    return () => addTab();
  }

  public handleTabChange = (tab: string) => {
    const { changeTab } = this.props;
    return () => changeTab(k);
  }

  public handleTabClose = (tab: string) => {
    const { closeTab } = this.props;
    return () => closeTab();
  }

  public render() {
    const { activeTab, tabs } = this.props;
   
    );
  }
}

const mapStateToProps = (state: any) => ({
  activeTab: path(["views", "appliance", "activeTab"], state),
  tabs: path(["views", "appliance", "tabs"], state),
});
​
const ApplianceTabs = connect(
  mapStateToProps
)(Tabs);

export default ApplianceTabs;
