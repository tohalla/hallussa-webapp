import { path as p } from "ramda";
import React from "react";
import { connect } from "react-redux";
import TabsContainer from "../components/tabbed/TabsContainer";

const path = ["views", "appliances"];

const Tabs = (props: any) => <TabsContainer {...props} view="appliances" />;

const mapStateToProps = (state: any) => ({
  tabs: p([...path, "tabs"], state),
});
​
export default connect(
  mapStateToProps
)(Tabs);
