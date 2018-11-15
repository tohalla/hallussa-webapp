import { path, pick } from "ramda";
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
    const Tabbed = (props: StateProps) => {
      const routerProps = pick(["history", "match", "location"], props);
      return (
        <>
          <TabsContainer view={view} tabs={props.tabs} {...routerProps} />
          <Component {...routerProps} />
        </>
      );
    };

    return connect(
      mapStateToProps
    )(Tabbed);
  };
};
