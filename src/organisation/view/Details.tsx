import classnames from "classnames";
import { findIndex, path } from "ramda";
import React from "react";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";

import { useTranslation } from "react-i18next";
import { Redirect, Route, Switch } from "react-router";
import { Link, RouteComponentProps } from "react-router-dom";
import { UserRolePayload } from "../../account/user-role/actions";
import DoubleClickButton from "../../component/button/DoubleClickButton";
import Restricted, { RestrictedRoute } from "../../component/Restricted";
import tabbed from "../../component/tabbed/tabbed";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import button from "../../style/button";
import {
  alignFlexStart,
  contentHorizontalSpacing,
  flex1,
  padded,
  rowContainer,
  spread
} from "../../style/container";
import { alertIndication } from "../../style/inline";
import { spacer } from "../../style/variables/spacing";
import Loadable from "../../util/hoc/Loadable";
import { deleteOrganisation, OrganisationPayload, setActiveOrganisation } from "../actions";
import OrganisationSelect from "../component/OrganisationSelect";
import { getOrganisation, getOrganisations } from "../state";
import Edit from "./Edit";
import Users from "./Users";

interface StateProps {
  activeOrganisation?: Readonly<OrganisationPayload> | APIResponsePayload;
  organisation?: OrganisationPayload;
  userRole?: UserRolePayload;
  organisations: Readonly<OrganisationPayload[]> | APIResponsePayload;
}

interface DispatchProps {
  setActiveOrganisation(organisation?: number): any;
  deleteOrganisation(organisation: OrganisationPayload): any;
}

type Props = RouteComponentProps<{organisation?: string}>;

const Organisation = ({
  history,
  match,
  organisations,
  activeOrganisation,
  userRole,
  ...props
}: Props & StateProps & DispatchProps & {organisations: Readonly<OrganisationPayload[]>}) => {
  const {t} = useTranslation();
  const organisation = props.organisation || activeOrganisation as OrganisationPayload;
  const handleDeleteOrganisation = () => props.deleteOrganisation(organisation);

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
  const {name, organisationIdentifier} = organisation;

  const Content = () => (
    <>
      <div>
        <div className={classnames(spread, alignFlexStart)}>
          <h1>{name}</h1>
          <div className={classnames(rowContainer, contentHorizontalSpacing)}>
            <Restricted userRole={userRole} requirements={{userRole: {allowDeleteOrganisation: true}}}>
              <DoubleClickButton
                plain={true}
                secondaryClassName={alertIndication}
                onClick={handleDeleteOrganisation}
              >
                {t("organisation.action.delete")}
              </DoubleClickButton>
            </Restricted>
            <Restricted userRole={userRole} requirements={{userRole: {allowUpdateOrganisation: true}}}>
              <Link to={`/organisations/${organisation.id}/edit`}>
                {t("organisation.action.edit")}
              </Link>
            </Restricted>
          </div>
        </div>
        {organisationIdentifier}
      </div>
      <div className={spacer} />
      <div className={spread}>
        <div className={classnames(rowContainer, spread, flex1)}>
          <OrganisationSelect organisation={organisation} history={history} />
          <Link to="/organisations/new" className={button}>{t("organisation.action.create")}</Link>
        </div>
      </div>
    </>
  );

  return (
    <Switch>
      <Route
        exact={true}
        path={match.path}
        component={Tabbed(Content, {userRole, contentContainerClassName: padded})}
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
        component={Tabbed(undefined, {contentContainerClassName: padded})}
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
    activeOrganisation: getOrganisation(state),
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

const mapDispatchToProps: MapDispatchToProps<DispatchProps, Props> = {
  deleteOrganisation,
  setActiveOrganisation,
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(Loadable<Props, {organisations: Readonly<OrganisationPayload[]>}>(Organisation));
