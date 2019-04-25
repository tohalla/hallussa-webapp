import React, { ReactFragment } from "react";
import { connect, MapStateToProps } from "react-redux";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import Table from "../../component/Table";
import { getEntitiesByOrganisation } from "../../organisation/state";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import { emptyContainer } from "../../style/container";
import Loadable from "../../util/hoc/Loadable";
import { AppliancePayload } from "../actions";
import Status from "./Status";

interface StateProps {
  appliances: ReadonlyArray<AppliancePayload> | APIResponsePayload;
}

interface Props {
  header?: ReactFragment;
}

export const ApplianceList = ({header, appliances}: Props & StateProps) => {
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
      <>
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
      </>
  );
};

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state) => ({
  appliances: getEntitiesByOrganisation(state, "appliances"),
});

export default connect<StateProps, {}, Props, ReduxState>(
  mapStateToProps
)(Loadable(ApplianceList));
