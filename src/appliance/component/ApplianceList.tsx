import { props as getProps } from "ramda";
import React, { memo, ReactFragment } from "react";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import Table from "../../component/Table";
import { AppliancePayload } from "../actions";
import Status from "./Status";

interface Props {
  additionalColumns: {[key: string]: Column};
  appliances: Readonly<AppliancePayload[]>;
  columns: ReadonlyArray<"description" | "id" | "name" | "status" | "location" | string>;
  header?: ReactFragment;
}

const ApplianceList = ({header, appliances, columns, additionalColumns}: Props) => {
  const {t} = useTranslation();
  return (
      <div>
        {header}
        <Table
          emptyLabel={t("appliance.listing.noAppliances")}
          columns={getProps(columns, {
            description: {
              Header: t("appliance.field.description"),
              accessor: "description",
              id: "description",
              resizable: true,
            },
            id: {Header: t("appliance.field.id"), accessor: "id", id: "id", maxWidth: 50},
            location: {
              Header: t("appliance.field.location"),
              accessor: "location",
              id: "location",
              resizable: true,
            },
            name: {
              Header: t("appliance.field.name"),
              accessor: (appliance) => <Link to={`/appliances/${appliance.id}`}>{appliance.name}</Link>,
              id: "name",
              resizable: true,
            },
            status: {
              Header: t("appliance.field.status"),
              accessor: ({status}) => <Status status={status} />,
              id: "status",
              maxWidth: 120,
              resizable: false,
            },
            ...additionalColumns,
          })}
          pageSize={20}
          data={appliances as AppliancePayload[]}
        />
      </div>
  );
};

ApplianceList.defaultProps = {
  additionalColumns: {},
  columns: ["id", "name", "description", "status", "location"],
};

export default memo(ApplianceList);
