import { path as p } from "ramda";
import React from "react";
import { connect } from "react-redux";
import TabsContainer from "../../components/tabs/TabsContainer";

const Tabs = (props: any) => (
  <TabsContainer
    {...props}
  />
);

const path = ["views", "appliance"];

const mapStateToProps = (state: any) => ({
  activeTab: p([...path, "activeTab"], state),
  path,
  tabs: p([...path, "tabs"], state),
});
​
const ApplianceTabs = connect(
  mapStateToProps
)(Tabs);

export default ApplianceTabs;
