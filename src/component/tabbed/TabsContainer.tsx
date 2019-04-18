import classnames from "classnames";
import { map, sort, values } from "ramda";
import React, { Component, MouseEventHandler } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import { RouteComponentProps } from "react-router";
import { actionTab, tab as tabStyle, tabActive, tabsContainer } from "../../style/tabbed";
import { closeTab, createTab, TabPayload } from "./actions";
import TabComponent from "./TabComponent";

interface Props extends RouteComponentProps {
  tabs: {[key: string]: TabPayload};
  view: string;
}

interface DispatchProps {
  closeTab(view: string, payload: string): any;
  createTab(view: string, payload: TabPayload): any;
}

const TabsContainer = ({history, view, match, tabs, ...props}: Props & DispatchProps) => {
  const handleTabClose = (tab: TabPayload): MouseEventHandler<HTMLElement> => (event) => {
    const destination = getPath(tab);
    event.stopPropagation();
    event.preventDefault();
    if (match.url === destination) {
      history.push(`/${view}`); // move to default tab if tab to be closed is open
    }
    props.closeTab(view, tab.key);
  };

  const getPath = (tab: TabPayload) => {
    return `/${view}` + (view === tab.key ? "" : `/${tab.key}`);
  };

  const renderTab = (tab: TabPayload) => {
    const destination = getPath(tab);
    const {activeLabel, label, key, accent} = tab;

    const TabLink = match.url === destination ? ({className, children}: any) =>
      <div className={classnames(className, tabActive)}>{children}</div> : NavLink;

    return (
      <TabLink
        className={classnames(tabStyle, {[actionTab]: accent})}
        activeClassName={tabActive}
        exact={match.url !== destination}
        key={key}
        to={destination}
      >
        <TabComponent
          {...tab}
          label={match.path.startsWith(destination) && activeLabel ? activeLabel : label}
          onClose={handleTabClose(tab)}
        />
      </TabLink>
    );
  };

  return (
    <div className={tabsContainer}>
      {map<TabPayload, JSX.Element>(
        renderTab,
        sort<TabPayload>(
          ({order: a = 0, createdAt: a2 = 0}, {order: b = 0, createdAt: b2 = 0}) => {
            if (a === b) { // ... sort by creation time if order is same
              return a2 - b2;
            }
            return a - b;
          },
          values(tabs)
        )
      )}
    </div>
  );
};

export default connect(undefined, {closeTab, createTab})(TabsContainer);
