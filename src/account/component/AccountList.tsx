import { filter, path, prop } from "ramda";
import React, { ReactFragment } from "react";
import { Column } from "react-table";

import { useTranslation } from "react-i18next";
import { connect, MapStateToProps } from "react-redux";
import Table from "../../component/Table";
import { OrganisationPayload } from "../../organisation/actions";
import { getOrganisation } from "../../organisation/state";
import { EntityGroup } from "../../store/reducer";
import { ReduxState } from "../../store/store";
import Loadable from "../../util/hoc/Loadable";
import { AccountPayload } from "../actions";
import { UserRolePayload } from "../user-role/actions";

interface StateProps {
  userRoles: EntityGroup<UserRolePayload>;
}

interface Props {
  accounts: Readonly<AccountPayload[]>;
  organisation?: OrganisationPayload;
  header?: ReactFragment;
}

const AccountList = ({accounts, header, userRoles}: Props & StateProps) => {
  const {t} = useTranslation();
  const columns: Column[] = [
    {Header: t("account.field.id"), accessor: "id", id: "id", maxWidth: 50},
    {
      Header: t("account.field.name"),
      accessor: ({firstName, lastName}) => `${firstName} ${lastName}`,
      id: "name",
      resizable: true,
    },
    {Header: t("account.field.email"), accessor: "email", id: "email", resizable: true},
    {
      Header: t("account.field.role"),
      accessor: ({userRole}) => {
        const roleName = path([userRole, "name"], userRoles);
        return typeof roleName === "string" ? t(`role.${roleName}`) : t("notSet");
      },
      id: "userRole",
    },
  ];
  return (
    <>
      {header}
      <Table
        columns={columns}
        data={accounts}
      />
    </>
  );
};

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (
  state,
  {organisation = getOrganisation(state)}
) => {
  const organisationId = prop<any, any>("id", organisation);
  return {
    userRoles: filter(
      (userRole) => userRole.isShared || userRole.organisation === organisationId,
      state.entities.userRoles
    ),
  };
};

export default connect(
  mapStateToProps
)(Loadable<StateProps, Props>(AccountList));
