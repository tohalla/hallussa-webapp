import classnames from "classnames";
import { path } from "ramda";
import React from "react";
import { useTranslation } from "react-i18next";
import { connect, MapStateToProps } from "react-redux";

import { RouteComponentProps } from "react-router";
import { AccountPayload } from "../../account/actions";
import AccountList from "../../account/component/AccountList";
import AddAccount from "../../account/component/AddAccount";
import Restricted from "../../component/Restricted";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import { contentVerticalSpacing, rowContainer, spread } from "../../style/container";
import Loadable from "../../util/hoc/Loadable";
import { OrganisationPayload } from "../actions";
import { getEntitiesByOrganisation, getOrganisation } from "../state";

interface StateProps {
  accounts: Readonly<AccountPayload[]> |  APIResponsePayload;
  organisation?: OrganisationPayload | APIResponsePayload;
}

type Props = StateProps & RouteComponentProps<{organisation: string}> & {
  accounts: Readonly<AccountPayload[]>;
  organisation: OrganisationPayload;
};

const Users = ({accounts, organisation}: Props) => {
  const {t} = useTranslation();
  return (
    <>
      <h1>{t("organisation.users.title")}</h1>
      <div className={contentVerticalSpacing}>
        <AccountList accounts={accounts} />
        <Restricted requirements={{userRole: {allowManageUsers: true}}}>
          <div className={classnames(rowContainer, spread)}>
            <div />
            <AddAccount organisation={organisation}/>
          </div>
        </Restricted>
      </div>
      <h2>{t("organisation.logins.title")}</h2>
    </>
  );
};

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state, ownProps) => {
  const organisation = Number(path(["match", "params", "organisation"], ownProps));
  return ({
    accounts: getEntitiesByOrganisation(state, "accounts", organisation),
    organisation: getOrganisation(state, organisation),
  });
};

export default connect(
  mapStateToProps
)(Loadable<StateProps>(Users));
