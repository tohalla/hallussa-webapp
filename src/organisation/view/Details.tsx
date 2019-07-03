import classnames from "classnames";
import React from "react";
import { connect, MapStateToProps } from "react-redux";

import { useTranslation } from "react-i18next";
import { Link, RouteComponentProps } from "react-router-dom";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import button from "../../style/button";
import {
  alignFlexStart,
  flex1,
  rowContainer,
  spread
} from "../../style/container";
import { spacer } from "../../style/variables/spacing";
import Loadable from "../../util/hoc/Loadable";
import { OrganisationPayload } from "../actions";
import Actions from "../component/Actions";
import OrganisationSelect from "../component/OrganisationSelect";
import { getOrganisation } from "../state";

interface StateProps {
  activeOrganisation?: Readonly<OrganisationPayload> | APIResponsePayload;
  organisation?: OrganisationPayload;
}

type Props = RouteComponentProps<{organisation?: string}>;

const Organisation = ({
  history,
  match,
  activeOrganisation,
  ...props
}: Props & StateProps & {organisations: Readonly<OrganisationPayload[]>}) => {
  const {t} = useTranslation();
  const organisation = props.organisation || activeOrganisation as OrganisationPayload;

  const {name, organisationIdentifier} = organisation;

  return (
    <>
      <div>
        <div className={classnames(spread, alignFlexStart)}>
          <h1>{name}</h1>
          <Actions organisation={organisation} />
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
};

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state, ownProps: Props) => {
  const organisation = ownProps.match.params.organisation ?
    state.entities.organisations[ownProps.match.params.organisation] : undefined;
  return ({
    activeOrganisation: getOrganisation(state),
    organisation,
  });
};

export default connect(
  mapStateToProps
)(Loadable<Props, {organisations: Readonly<OrganisationPayload[]>}>(Organisation));
