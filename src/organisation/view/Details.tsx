import classNames from "classnames";
import React from "react";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";

import { useTranslation } from "react-i18next";
import { Redirect, Route, Switch } from "react-router";
import { Link, RouteComponentProps } from "react-router-dom";
import DoubleClickButton from "../../component/button/DoubleClickButton";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import button from "../../style/button";
import { actionGroup, rowContainer, spacedHorizontalContainer, spread } from "../../style/container";
import { alertIndication } from "../../style/inline";
import { spacer } from "../../style/variables/spacing";
import Loadable from "../../util/hoc/Loadable";
import { deleteOrganisation, OrganisationPayload, setActiveOrganisation } from "../actions";
import OrganisationSelect from "../component/OrganisationSelect";
import { getOrganisation, getOrganisations } from "../state";
import Edit from "./Edit";

interface StateProps {
  activeOrganisation?: Readonly<OrganisationPayload> | APIResponsePayload;
  organisation?: OrganisationPayload;
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
  ...props
}: Props & StateProps & DispatchProps & {organisations: Readonly<OrganisationPayload[]>}) => {
  const {t} = useTranslation();
  const organisation = props.organisation || activeOrganisation as OrganisationPayload;
  const handleDeleteOrganisation = () => props.deleteOrganisation(organisation);

  const NewOrganisation = () =>
    <Link to="/organisations/new" className={button}>{t("organisation.action.create")}</Link>;

  if (organisations.length === 0) {
    return (
      <div className={classNames(rowContainer, spread)}>
        {t("organisation.noOrganisations")}
        <NewOrganisation />
      </div>
    );
  } else if (typeof organisation === "undefined") {
    return <Redirect to={`/organisations/${organisations[0].id}`} />;
  } else if (organisation.id !== Number(match.params.organisation)) {
    return <Redirect to={`/organisations/${organisation.id}`} />;
  }

  const {name, organisationIdentifier} = organisation;

  const renderContent = () => (
    <>
      <div>
        <div className={spread}>
          <h1>{name}</h1>
          <div className={spacedHorizontalContainer}>
            <DoubleClickButton
              plain={true}
              secondaryClassName={alertIndication}
              onClick={handleDeleteOrganisation}
            >
              {t("organisation.action.delete")}
            </DoubleClickButton>
            <Link to={`/organisations/${organisation.id}/edit`}>
              {t("organisation.action.edit")}
            </Link>
          </div>
        </div>
        {organisationIdentifier}
      </div>
      <div className={spacer} />
      <div className={spread}>
        <div className={actionGroup}>
          <OrganisationSelect organisation={organisation} history={history} />
          <NewOrganisation />
        </div>
      </div>
    </>
  );

  return (
    <Switch>
      <Route exact={true} path={match.url} render={renderContent} />
      <Route exact={true} path={`${match.path}/edit`} component={Edit} />
    </Switch>
  );
};

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state, ownProps: Props) => ({
  activeOrganisation: getOrganisation(state),
  organisation: ownProps.match.params.organisation ?
    state.entities.organisations[ownProps.match.params.organisation] : undefined,
  organisations: getOrganisations(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, Props> = {
  deleteOrganisation,
  setActiveOrganisation,
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(Loadable<Props, {organisations: Readonly<OrganisationPayload[]>}>(Organisation));
