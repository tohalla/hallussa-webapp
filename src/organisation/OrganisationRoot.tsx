import { findIndex, path } from "ramda";
import React from "react";
import { connect, MapStateToProps } from "react-redux";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router";

import { UserRolePayload } from "../account/user-role/actions";
import { RestrictedRoute } from "../component/Restricted";
import tabbed from "../component/tabbed/tabbed";
import { APIResponsePayload } from "../store/middleware/api/actions";
import { ReduxState } from "../store/store";
import { padded } from "../style/container";
import Loadable from "../util/hoc/Loadable";
import { OrganisationPayload } from "./actions";
import { getOrganisations } from "./state";
import Details from "./view/Details";
import Edit from "./view/Edit";
import Preferences from "./view/Preferences";
import Users from "./view/Users";

interface StateProps {
  activeOrganisation?: Readonly<OrganisationPayload> | APIResponsePayload;
  organisation?: OrganisationPayload;
  userRole?: UserRolePayload;
  organisations: Readonly<OrganisationPayload[]> | APIResponsePayload;
}

interface Props extends RouteComponentProps<{organisation?: string}> {
  organisations: Readonly<OrganisationPayload[]>;
}

const OrganisationRoot = ({
  organisation,
  organisations,
  match,
  userRole,
}: Props & StateProps) => {
  if (organisations.length === 0) {
    return <Redirect to="/organisations" />;
  }
  if (typeof organisation === "undefined") {
    return <Redirect to={`/organisations/${organisations[0].id}`} />;
  }
  if (organisation.id !== Number(match.params.organisation)) {
    return <Redirect to={`/organisations/${organisation.id}`} />;
  }

  const Tabbed = tabbed({view: "organisations", pathPostfix: String(organisation.id)});

  return (
    <Switch>
      <Route
        exact={true}
        path={match.path}
        component={Tabbed(Details, {userRole, contentContainerClassName: padded})}
      />
      <RestrictedRoute
        path={`${match.path}/edit`}
        to={match.url}
        component={Edit}
        requirements={{userRole: {allowUpdateOrganisation: true}}}
        userRole={userRole}
      />
      <Route
        exact={true}
        path={`${match.path}/users`}
        component={Tabbed(Users, {contentContainerClassName: padded})}
      />
      <RestrictedRoute
        path={`${match.path}/preferences`}
        to={match.url}
        component={Tabbed(Preferences, {contentComponentProps: {organisation}, contentContainerClassName: padded})}
        requirements={{userRole: {allowUpdateOrganisation: true}}}
        userRole={userRole}
      />
      <Redirect to={match.url} />
    </Switch>
  );
};

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state, ownProps: Props) => {
  const organisation = ownProps.match.params.organisation ?
    state.entities.organisations[ownProps.match.params.organisation] : undefined;
  return ({
    organisation,
    organisations: getOrganisations(state),
    userRole: organisation ? state.entities.userRoles[String(path([
      "accounts",
      String(findIndex(
        (account) => String(account.account) === String(state.session.activeAccount),
        organisation.accounts || [])
      ),
      "userRole",
    ], organisation))] : undefined,
  });
};

export default connect(
  mapStateToProps
)(Loadable<StateProps, Props>(OrganisationRoot));
