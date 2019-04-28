import React, { ReactFragment } from "react";
import { Column } from "react-table";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Table from "../../component/Table";
import { AccountPayload } from "../actions";

interface Props {
  accounts: Readonly<AccountPayload[]>;
  header?: ReactFragment;
}

export default ({accounts, header}: Props) => {
  const {t} = useTranslation();

  const columns: Column[] = [
    {Header: t("account.field.id"), accessor: "id", id: "id", maxWidth: 50},
    {
      Header: t("account.field.name"),
      accessor: ({id, firstName, lastName}) => <Link to={`/accounts/${id}`}>{firstName} {lastName}</Link>,
      id: "name",
      resizable: true,
    },
    {Header: t("account.field.email"), accessor: "email", id: "email", resizable: true},
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
