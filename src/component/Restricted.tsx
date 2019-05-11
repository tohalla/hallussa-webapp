import { path, whereEq } from "ramda";
import React, { memo, ReactElement } from "react";
import { connect, MapStateToProps } from "react-redux";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router";

import { UserRolePayload } from "../account/user-role/actions";
import { getEntitiesByOrganisationSelector } from "../organisation/selectors";
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

const mapStateToProps: MapStateToProps<StateProps, any, ReduxState> = (state, ownProps) => {
  const organisation = Number(path(["match", "params", "organisation"], ownProps)) || state.session.activeOrganisation;
  return {
    activeUserRole: state.session.activeUserRole ? state.entities.userRoles[state.session.activeUserRole] : {},
    userRoles: getEntitiesByOrganisationSelector<"userRoles">("userRoles", organisation)(state),
  };
};

export default connect<StateProps, {}, Props, ReduxState>(mapStateToProps)(
  ({children, ...props}: Props & StateProps) => allowAccess(props) && children ? children : null
);

export const RestrictedRoute = memo(({
  component: Component,
  to,
  path: routePath,
  requirements,
}: RestrictedRouteProps) => {
  const C = ({activeUserRole, ...props}: StateProps & RouteComponentProps) =>
    allowAccess({requirements, activeUserRole}) && Component ?
      <Component {...props} /> : <Redirect to={to} />;

  return (
    <Route
      path={routePath}
      component={requirements ? connect(mapStateToProps)(Loadable(C)) : C}
    />
  );
});
