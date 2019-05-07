import classnames from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";
import { connect, MapStateToProps } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import button from "../../style/button";
import { padded, rowContainer, spread, viewContentContainer } from "../../style/container";
import Loadable from "../../util/hoc/Loadable";
import { OrganisationPayload } from "../actions";
import { getOrganisation } from "../state";

interface StateProps {
  activeOrganisation?: Readonly<OrganisationPayload> | APIResponsePayload;
}

const NoneCreated = ({activeOrganisation}: {activeOrganisation: Readonly<OrganisationPayload>}) => {
  const {t} = useTranslation();

  if (activeOrganisation) {
    return <Redirect to={`/organisations/${activeOrganisation.id}`} />;
  }

  return (
    <div className={classnames(viewContentContainer, padded)}>
      <div className={classnames(rowContainer, spread)}>
        {t("organisation.noOrganisations")}
        <Link to="/organisations/new" className={button}>{t("organisation.action.create")}</Link>
      </div>
    </div>
  ) ;
};

const mapStateToProps: MapStateToProps<StateProps, {}, ReduxState> = (state) => ({
  activeOrganisation: getOrganisation(state),
});

export default connect(mapStateToProps)(Loadable<StateProps>(NoneCreated));
