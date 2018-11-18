import classnames from "classnames";
import { map, values } from "ramda";
import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import { RouteComponentProps } from "react-router";
import { actionTab, tab as tabStyle, tabActive, tabsContainer } from "../../emotion-styles/src/tabbed";
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

class TabsContainer extends Component<Props & DispatchProps> {
  public handleTabClose = (tab: TabPayload) => () => {
    const {history, location, view} = this.props;
    if (location.pathname.endsWith(tab.key)) {
      history.push("/"); // move to default tab if tab to be closed is open
    }
    this.props.closeTab(view, tab.key);
  }

  public getPath = (tab: TabPayload) => {
    const { view } = this.props;
    return view === tab.key ? "/" : `/${tab.key}`;
  }

  public renderTab = (tab: TabPayload) => {
    const {activeLabel, label, key, accent} = tab;
    const {match: {path}} = this.props;
    return (
      <NavLink
        className={classnames(tabStyle, {[actionTab]: accent})}
        activeClassName={tabActive}
        exact={true}
        key={key}
        to={this.getPath(tab)}
      >
        <TabComponent
          {...tab}
          label={path.startsWith(`/${key}`) && activeLabel ? activeLabel : label}
          onClose={this.handleTabClose(tab)}
        />
      </NavLink>
    );
  }

  public render() {
    const { tabs } = this.props;
    return (
      <div className={tabsContainer}>
        {map<TabPayload, JSX.Element>(this.renderTab, values(tabs))}
      </div>
    );
  }
}

export default connect(undefined, {closeTab, createTab})(TabsContainer);
