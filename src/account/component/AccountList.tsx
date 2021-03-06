import classnames from "classnames";
import React, { ReactFragment } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Column } from "react-table";

import SelectAndSet, { SelectAndSetProps } from "../../component/input/SelectAndSet";
import Restricted from "../../component/Restricted";
import Table from "../../component/Table";
import { OrganisationPayload } from "../../organisation/actions";
import { EntityGroup } from "../../store/reducer";
import { ReduxState } from "../../store/store";
import { flex1, justifyCenter, noPadding, stacked } from "../../style/container";
import { AccountPayload, setUserRole } from "../actions";
import { UserRolePayload } from "../user-role/actions";

interface DispatchProps {
  setUserRole: typeof setUserRole;
}

interface Props {
  accounts: Readonly<AccountPayload[]>;
  userRoles: EntityGroup<UserRolePayload>;
  organisation?: OrganisationPayload;
  header?: ReactFragment;
}

const AccountList = ({accounts, header, userRoles, organisation, ...props}: Props & DispatchProps) => {
  const {t} = useTranslation();
  const handleSetRole: (
    organisationId: number, account: number
  ) => SelectAndSetProps["onSet"] = (organisationId, account) => ({role}) =>
    props.setUserRole(organisationId, account, {userRole: role.value});

  const roleOptions = [
    {value: null, label: t("none")},
    ...Object.values(userRoles).map((role) => ({label: t(`userRole.name.${role.name}`), value: role.id})),
  ];

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
      Cell: ({value: userRole, original: account}) => organisation && roleOptions.length > 1 ? (
        <Restricted
          restrictedContent={
            <div className="rt-td">
              {userRoles[userRole] && t(`userRole.name.${userRoles[userRole].name}`)}
            </div>
          }
          requirements={{userRole: {allowManageUsers: true}}}
        >
          <SelectAndSet
            className={flex1}
            options={roleOptions}
            setLabel={t("userRole.action.setUserRole")}
            placeholder={t("notSet")}
            onSet={handleSetRole(organisation.id, account.id)}
            name="role"
            initialValue={
              userRoles[userRole] &&
              {label: t<string>(`userRole.name.${userRoles[userRole].name}`), value: userRoles[userRole].id}
            }
          />
        </Restricted>
      ) : <div>{userRoles[userRole] && t(`userRole.name.${userRoles[userRole].name}`)}</div>,
      Header: t("account.field.userRole"),
      accessor: "userRole",
      className: classnames(stacked, noPadding, flex1, justifyCenter),
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

export default connect<{}, DispatchProps, Props, ReduxState>(
  undefined, {setUserRole}
)(AccountList);
