import classNames from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";
import { connect, MapStateToProps } from "react-redux";

import { AccountPayload } from "../../account/actions";
import AccountList from "../../account/component/AccountList";
import AddAccount from "../../account/component/AddAccount";
import Restricted from "../../component/Restricted";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import { rowContainer, spread } from "../../style/container";
import Loadable from "../../util/hoc/Loadable";
import { getEntitiesByOrganisation } from "../state";

interface StateProps {
  accounts: Readonly<AccountPayload[]> |  APIResponsePayload;
}

type Props = StateProps & {
  accounts: Readonly<AccountPayload[]>;
};

const Users = ({accounts}: Props) => {
  const {t} = useTranslation();
  return (
    <>
      <h1>{t("organisation.users.title")}</h1>
      <AccountList accounts={accounts} />
      <Restricted requirements={{userRole: {allowManageUsers: true}}}>
        <div className={classNames(rowContainer, spread)}>
          <div />
          <AddAccount />
        </div>
      </Restricted>
      <h2>{t("organisation.logins.title")}</h2>
    </>
  );
};

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state) => ({
  accounts: getEntitiesByOrganisation(state, "accounts"),
});

export default connect(
  mapStateToProps
)(Loadable<StateProps>(Users));
