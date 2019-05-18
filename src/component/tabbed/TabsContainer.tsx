import classnames from "classnames";
import { map, path, sort, values } from "ramda";
import React, { MouseEventHandler, ReactNode } from "react";
import { connect, MapStateToProps } from "react-redux";
import { NavLink } from "react-router-dom";

import { RouteComponentProps } from "react-router";
import { UserRolePayload } from "../../account/user-role/actions";
import { getEntitiesByOrganisationSelector } from "../../organisation/selectors";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import { actionTab, tab as tabStyle, tabActive, tabsContainer } from "../../style/tabbed";
import Loadable from "../../util/hoc/Loadable";
import Restricted from "../Restricted";
import { closeTab, createTab, TabPayload } from "./actions";
import TabComponent from "./TabComponent";

interface Props extends RouteComponentProps {
  tabs: {[key: string]: TabPayload};
  view: string;
  pathPostfix?: string;
  userRole?: UserRolePayload;
}

interface StateProps {
  userRoles: Readonly<UserRolePayload[]> | APIResponsePayload;
  activeUserRole: Partial<UserRolePayload>;
}

interface DispatchProps {
  closeTab: typeof closeTab;
  createTab: typeof createTab;
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
    props.closeTab(view, tab);
  };

  const getPath = (tab: TabPayload) =>
    "/" + [view, pathPostfix, view === tab.key ? false : `${tab.key}`].filter(Boolean).join("/");

  const renderTab = ({requirements, ...tab}: TabPayload) => {
    const destination = getPath(tab);
    const {activeLabel, label, key, accent} = tab;

    const TabLink = match.url === destination ? ({className, children}: any) =>
      <div className={classnames(className, tabActive)}>{children}</div> : NavLink;

    return (
      <Restricted requirements={requirements} userRole={userRole} key={key}>
        <TabLink
          className={classnames(tabStyle, {[actionTab]: accent})}
          activeClassName={tabActive}
          exact={view === key}
          to={destination}
        >
          <TabComponent
            {...tab}
            label={match.path.startsWith(destination) && activeLabel ? activeLabel : label}
            onClose={handleTabClose(tab)}
          />
        </TabLink>
      </Restricted>
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

const mapStateToProps: MapStateToProps<StateProps, any, ReduxState> = (state, ownProps) => {
  const organisation = Number(path(["match", "params", "organisation"], ownProps)) || state.session.activeOrganisation;
  return {
    activeUserRole: ownProps.userRole || (
      state.session.activeUserRole ? state.entities.userRoles[state.session.activeUserRole] : {}
    ),
    userRoles: getEntitiesByOrganisationSelector<"userRoles">("userRoles", organisation)(state),
  };
};

export default connect(mapStateToProps, {closeTab, createTab})(Loadable(TabsContainer));
