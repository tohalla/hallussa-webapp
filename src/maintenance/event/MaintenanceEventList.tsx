import { format } from "date-fns";
import React, { ReactFragment } from "react";
import { useTranslation } from "react-i18next";
import { connect, MapStateToProps } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";

import Table from "../../component/Table";
import { MaintainerPayload } from "../../maintainer/actions";
import { MaintenanceEventPayload } from "../../maintenance/event/actions";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { EntityGroup } from "../../store/reducer";
import { ReduxState } from "../../store/store";
import { emptyContainer } from "../../style/container";
import Loadable from "../../util/hoc/Loadable";

interface StateProps {
  maintainers: EntityGroup<MaintainerPayload> | APIResponsePayload;
}

interface Props {
  maintainers: EntityGroup<MaintainerPayload>;
  maintenanceEvents: Readonly<MaintenanceEventPayload[]>;
  header?: ReactFragment;
}

const MaintenanceEventList = ({header, maintenanceEvents, maintainers}: Props & StateProps) => {
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
        const maintainer = maintainers[event.assignedTo];
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
    <div>
      {header}
      {maintenanceEvents.length === 0 ?
        <div className={emptyContainer}>No events found</div>
      :
        <Table
          columns={columns}
          data={maintenanceEvents}
        />
      }
    </div>
  );
};

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state) => ({
  maintainers: state.entities.maintainers,
});

export default connect<StateProps, {}, Props, ReduxState>(
  mapStateToProps
)(Loadable<StateProps, Props>(MaintenanceEventList));