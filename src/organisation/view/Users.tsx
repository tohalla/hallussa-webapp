import classnames from "classnames";
import { filter, path } from "ramda";
import React from "react";
import { useTranslation } from "react-i18next";
import { connect, MapStateToProps } from "react-redux";

import { RouteComponentProps } from "react-router";
import { AccountPayload } from "../../account/actions";
import AccountList from "../../account/component/AccountList";
import AddAccount from "../../account/component/AddAccount";
import { UserRolePayload } from "../../account/user-role/actions";
import Restricted from "../../component/Restricted";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { EntityGroup } from "../../store/reducer";
import { ReduxState } from "../../store/store";
import { contentVerticalSpacing, emptyContainer, rowContainer, spread } from "../../style/container";
import Loadable from "../../util/hoc/Loadable";
import { OrganisationPayload } from "../actions";
import { getEntitiesByOrganisationSelector } from "../selectors";
import { getOrganisation } from "../state";

interface StateProps {
  accounts: Readonly<AccountPayload[]> |  APIResponsePayload;
  userRoles: EntityGroup<UserRolePayload>;
  organisation?: OrganisationPayload | APIResponsePayload;
}

type Props = StateProps & RouteComponentProps<{organisation: string}> & {
  accounts: Readonly<AccountPayload[]>;
  organisation: OrganisationPayload;
};

const Users = ({accounts, organisation, userRoles}: Props) => {
  const {t} = useTranslation();
  return (
    <>
      <h1>{t("organisation.users.title")}</h1>
      <div className={contentVerticalSpacing}>
        <AccountList accounts={accounts} userRoles={userRoles} organisation={organisation} />
        <Restricted requirements={{userRole: {allowManageUsers: true}}}>
          <div className={classnames(rowContainer, spread)}>
            <div />
            <AddAccount organisation={organisation}/>
          </div>
        </Restricted>
      </div>
      <h2>{t("organisation.logins.title")}</h2>
      <div className={emptyContainer}>{t("organisation.logins.noLogins")}</div>
    </>
  );
};

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state, ownProps) => {
  const organisation = Number(path(["match", "params", "organisation"], ownProps)) || state.session.activeOrganisation;
  return {
    accounts: getEntitiesByOrganisationSelector<"accounts">("accounts", organisation, { key: "account" })(state),
    organisation: getOrganisation(state, organisation),
    userRoles: filter(
      (userRole) => userRole.isShared || userRole.organisation === organisation,
      state.entities.userRoles
    ),
  };
};

export default connect(mapStateToProps)(Loadable<StateProps>(Users));
