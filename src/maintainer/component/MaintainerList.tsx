import React, { ReactFragment } from "react";
import { Column } from "react-table";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Table from "../../component/Table";
import { emptyContainer } from "../../style/container";
import { MaintainerPayload } from "../actions";

interface Props {
  maintainers: Readonly<MaintainerPayload[]>;
  header?: ReactFragment;
}

export default ({maintainers, header}: Props) => {
  const {t} = useTranslation();

  const columns: Column[] = [
    {Header: t("maintainer.field.id"), accessor: "id", id: "id", maxWidth: 50},
    {
      Header: t("maintainer.field.name"),
      accessor: ({id, firstName, lastName}) => <Link to={`/maintainers/${id}`}>{firstName} {lastName}</Link>,
      id: "name",
      resizable: true,
    },
    {Header: t("maintainer.field.email"), accessor: "email", id: "email", resizable: true},
    {Header: t("maintainer.field.phone"), accessor: "phone", id: "phone", resizable: true},
  ];

  return (
    <>
      {header}
        <Table
          emptyLabel={t("maintainer.listing.noMaintainers")}
          columns={columns}
          data={maintainers}
        />
    </>
  );
};
