import { whereEq } from "ramda";
import React, { memo, ReactElement } from "react";
import { connect, MapStateToProps } from "react-redux";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router";

import { UserRolePayload } from "../account/user-role/actions";
import { getEntitiesByOrganisation } from "../organisation/state";
import { ReduxState } from "../store/store";
import Loadable from "../util/hoc/Loadable";

export interface RequirementProps {
  userRole?: Partial<UserRolePayload>;
}

interface Props {
  requirements?: RequirementProps;
  children?: ReactElement | null;
}

interface StateProps {
  activeUserRole: Partial<UserRolePayload>;
}

interface RestrictedRouteProps extends Props {
  component?: RouteProps["component"];
  path?: RouteProps["path"];
  to: string;
}

const allowAccess = ({requirements, ...props}: Props & StateProps): boolean => !requirements ||
  (!requirements.userRole || props.activeUserRole && whereEq(requirements.userRole, props.activeUserRole));

const mapStateToProps: MapStateToProps<StateProps, any, ReduxState> = (state) => ({
  activeUserRole: state.session.activeUserRole ? state.entities.userRoles[state.session.activeUserRole] : {},
  userRoles: getEntitiesByOrganisation(state, "userRoles"),
});

export default connect<StateProps, {}, Props, ReduxState>(mapStateToProps)(
  ({children, ...props}: Props & StateProps) => allowAccess(props) && children ? children : null
);

export const RestrictedRoute = memo(({
  component: Component,
  to,
  path,
  requirements,
}: RestrictedRouteProps) => {
  const C = ({activeUserRole, ...props}: StateProps & RouteComponentProps) =>
    allowAccess({requirements, activeUserRole}) && Component ?
      <Component {...props} /> : <Redirect to={to} />;

  return (
    <Route
      path={path}
      component={requirements ? connect(mapStateToProps)(Loadable(C)) : C}
    />
  );
});
