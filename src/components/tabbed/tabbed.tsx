import { path, pick } from "ramda";
import React from "react";
import { connect, MapStateToProps } from "react-redux";

import { RouteComponentProps } from "react-router";
import { ReduxState } from "../../store/store";
import { TabPayload } from "./actions";
import { ViewsState } from "./reducer";
import TabsContainer from "./TabsContainer";

interface StateProps {
  tabs: {[key: string]: TabPayload};
}

export default (view: keyof ViewsState) => {
  const mapStateToProps: MapStateToProps<StateProps, RouteComponentProps, ReduxState> = (state) => ({
    tabs: state.views[view].tabs,
  });

  return (Component: any) => {
    const Tabbed = (props: StateProps & RouteComponentProps) => {
      const routerProps: RouteComponentProps = pick(
        ["history", "match", "location"],
        props
      );
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
