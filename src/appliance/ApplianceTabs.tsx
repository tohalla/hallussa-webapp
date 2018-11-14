import { path as p } from "ramda";
import React from "react";
import { connect } from "react-redux";
import TabsContainer from "../../components/tabbed/TabsContainer";

const Tabs = (props: any) => <TabsContainer {...props} />;

const path = ["views", "appliances"];

const mapStateToProps = (state: any) => ({
  activeTab: p([...path, "activeTab"], state),
  path,
  tabs: p([...path, "tabs"], state),
});
​
export default connect(
  mapStateToProps
)(Tabs);
