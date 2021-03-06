import classnames from "classnames";
import { pick } from "ramda";
import React from "react";
import { connect, MapStateToProps } from "react-redux";

import { RouteComponentProps } from "react-router";
import { UserRolePayload } from "../../account/user-role/actions";
import { ReduxState } from "../../store/store";
import { viewContentContainer } from "../../style/container";
import { TabbedView, ViewsState } from "./reducer";
import TabsContainer from "./TabsContainer";

interface Options {
  contentContainerClassName?: string;
  contentComponentProps?: {[key: string]: any};
  userRole?: UserRolePayload;
}

type StateProps = TabbedView;

export default ({view, pathPostfix}: {view: keyof ViewsState, pathPostfix?: string}) => {
  const mapStateToProps: MapStateToProps<StateProps, RouteComponentProps, ReduxState> = (state) => ({
    tabs: state.views[view].tabs,
  });

  return (Component: any, {userRole, contentContainerClassName, contentComponentProps}: Options = {}) => {
    const Tabbed = (props: StateProps & RouteComponentProps) => {
      const routerProps: RouteComponentProps = pick(
        ["history", "match", "location"],
        props
      );
      return (
        <>
          <TabsContainer
            view={view}
            pathPostfix={pathPostfix}
            tabs={props.tabs}
            userRole={userRole}
            {...routerProps}
          />
          <div className={classnames(viewContentContainer, contentContainerClassName)}>
            {Component && <Component {...contentComponentProps} {...routerProps} />}
          </div>
        </>
      );
    };

    return connect(mapStateToProps)(Tabbed);
  };
};
