import React, { ReactFragment } from "react";
import { connect, MapStateToProps } from "react-redux";

import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import Table from "../../components/Table";
import { MaintainerPayload } from "../../maintainer/actions";
import { getEntitiesByOrganisation } from "../../organisation/state";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import { emptyContainer } from "../../styles/container";
import loadable from "../../util/hoc/loadable";
import { MaintenanceEventPayload } from "../actions";

interface StateProps {
  maintainers: ReadonlyArray<MaintainerPayload> | APIResponsePayload;
}

interface Props {
  maintenanceEvents: MaintenanceEventPayload[];
  header?: ReactFragment;
}

export const EventList = ({header, maintenanceEvents, maintainers}: StateProps & Props) => {
  const {t} = useTranslation();

  const columns: Column[] = [
    {
      Header: t("maintenanceEvent.field.createdAt"),
      accessor: (event) => format(event.createdAt, "D.M.YYYY - HH:mm"),
      id: "createdAt",
      width: 150,
    },
    {
      Header: t("maintenanceEvent.field.resolvedAt"),
      accessor: (event) => event.resolvedAt && format(event.resolvedAt, "D.M.YYYY - HH:mm"),
      id: "resolvedAt",
      width: 150,
    },
    {
      Header: t("maintenanceEvent.field.description"),
      accessor: "description",
      id:"description",
      resizable: true,
    },
    {
      Header: t("maintenanceEvent.field.assignedTo"),
      accessor: (event) => {
        if (!event.assignedTo) { return null; }
        const maintainer = (maintainers as MaintainerPayload[])[event.assignedTo];
        return maintainer && (
          <Link to={`/maintainers/${maintainer.id}`}>
            {maintainer.firstName} {maintainer.lastName}
          </Link>
        );
      },
      id: "assignedTo",
      width: 150,
    },
  ];

  return (
    <>
      {header}
      {maintenanceEvents.length === 0 ?
        <div className={emptyContainer}>No events found</div>
      :
        <Table
          columns={columns}
          data={maintenanceEvents}
        />
      }
    </>
  );
};

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state) => ({
  maintainers: getEntitiesByOrganisation(state, "maintainers"),
});

export default connect<StateProps, {}, Props, ReduxState>(
  mapStateToProps
)(loadable(EventList));
