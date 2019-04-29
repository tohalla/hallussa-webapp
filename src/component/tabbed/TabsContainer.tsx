import classnames from "classnames";
import { map, sort, values } from "ramda";
import React, { MouseEventHandler, ReactNode } from "react";
import { connect, MapStateToProps } from "react-redux";
import { NavLink } from "react-router-dom";

import { RouteComponentProps } from "react-router";
import { UserRolePayload } from "../../account/user-role/actions";
import { getEntitiesByOrganisation } from "../../organisation/state";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import { actionTab, tab as tabStyle, tabActive, tabsContainer } from "../../style/tabbed";
import Loadable from "../../util/hoc/Loadable";
import { closeTab, createTab, TabPayload } from "./actions";
import TabComponent from "./TabComponent";

interface Props extends RouteComponentProps {
  tabs: {[key: string]: TabPayload};
  view: string;
  pathPostfix?: string;
}

interface StateProps {
  userRoles: Readonly<UserRolePayload[]> | APIResponsePayload;
  userRole: Partial<UserRolePayload>;
}

interface DispatchProps {
  closeTab(view: string, payload: string): any;
  createTab(view: string, payload: TabPayload): any;
}

const TabsContainer = ({
  history,
  view,
  match,
  pathPostfix,
  tabs,
  userRole,
  ...props
}: Props & StateProps & DispatchProps) => {
  const handleTabClose = (tab: TabPayload): MouseEventHandler<HTMLElement> => (event) => {
    const destination = getPath(tab);
    event.stopPropagation();
    event.preventDefault();
    if (match.url === destination) {
      history.push(`/${view}`); // move to default tab if tab to be closed is open
    }
    props.closeTab(view, tab.key);
  };

  const getPath = (tab: TabPayload) =>
    "/" + [view, pathPostfix, view === tab.key ? false : `${tab.key}`].filter(Boolean).join("/");

  const renderTab = ({allowRender, ...tab}: TabPayload) => {
    if (typeof allowRender === "function" && !allowRender({userRole})) {
      return null;
    }

    const destination = getPath(tab);
    const {activeLabel, label, key, accent} = tab;

    const TabLink = match.url === destination ? ({className, children}: any) =>
      <div className={classnames(className, tabActive)}>{children}</div> : NavLink;

    return (
      <TabLink
        className={classnames(tabStyle, {[actionTab]: accent})}
        activeClassName={tabActive}
        exact={view === key}
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
      {map<TabPayload, ReactNode>(
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

const mapStateToProps: MapStateToProps<StateProps, RouteComponentProps, ReduxState> = (state) => ({
  userRole: state.session.activeUserRole ? state.entities.userRoles[state.session.activeUserRole] : {},
  userRoles: getEntitiesByOrganisation(state, "userRoles"),
});

export default connect(mapStateToProps, {closeTab, createTab})(Loadable(TabsContainer));
