import { path } from "ramda";
import React from "react";
import { connect } from "react-redux";

import { ReduxState } from "../../store/store";
import { TabPayload } from "./actions";
import TabsContainer from "./TabsContainer";

interface StateProps {
  tabs: {[key: string]: TabPayload};
}

export default (view: string) => {
  const mapStateToProps = (state: ReduxState) => ({
    tabs: path(["views", view, "tabs"], state),
  });

  return (Component: any) => {
    const Tabbed = ({tabs, ...props}: StateProps) => (
      <>
        <TabsContainer view={view} tabs={tabs} />
        <Component {...props} />
      </>
    );

    return connect(
      mapStateToProps
    )(Tabbed);
  };
};
