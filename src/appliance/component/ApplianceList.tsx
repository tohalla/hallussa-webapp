import React, { ReactFragment } from "react";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import Table from "../../component/Table";
import { emptyContainer } from "../../style/container";
import { AppliancePayload } from "../actions";
import Status from "./Status";

interface Props {
  appliances: Readonly<AppliancePayload[]>;
  header?: ReactFragment;
}

export default ({header, appliances}: Props) => {
  const {t} = useTranslation();

  const columns: Column[] = [
    {Header: t("appliance.field.id"), accessor: "id", id: "id", maxWidth: 50},
    {
      Header: t("appliance.field.name"),
      accessor: (appliance) => <Link to={`/appliances/${appliance.id}`}>{appliance.name}</Link>,
      id: "name",
      resizable: true,
    },
    {
      Header: t("appliance.field.description"),
      accessor: "description",
      id: "description",
      resizable: true,
    },
    {
      Header: t("appliance.field.status"),
      accessor: ({status}) => <Status status={status} />,
      id: "status",
      maxWidth: 100,
      resizable: true,
    },
    {
      Header: t("appliance.field.location"),
      accessor: "location",
      id: "location",
      resizable: true,
    },
  ];

  return (
      <div>
        {header}
        {(appliances as Readonly<AppliancePayload[]>).length === 0 ?
          <div className={emptyContainer}>{t("appliance.listing.noAppliances")}</div>
        :
          <Table
            columns={columns}
            pageSize={20}
            data={appliances as AppliancePayload[]}
          />
        }
      </div>
  );
};
