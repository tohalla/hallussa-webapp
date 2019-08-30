import { format, parseISO } from "date-fns";
import React, { ReactFragment } from "react";
import { useTranslation } from "react-i18next";
import { connect, MapStateToProps } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";

import Table from "../../../component/Table";
import { MaintainerPayload } from "../../../maintainer/actions";
import { APIResponsePayload } from "../../../store/middleware/api/actions";
import { EntityGroup } from "../../../store/reducer";
import { ReduxState } from "../../../store/store";
import Loadable from "../../../util/hoc/Loadable";
import { MaintenanceEventPayload } from "../actions";

interface StateProps {
  maintainers: EntityGroup<MaintainerPayload> | APIResponsePayload;
}

interface Props {
  maintenanceEvents: Readonly<MaintenanceEventPayload[]>;
  header?: ReactFragment;
}

const MaintenanceEventList = ({
  header,
  maintenanceEvents,
  maintainers,
}: Props & StateProps & {maintainers: EntityGroup<MaintainerPayload>}) => {
  const {t} = useTranslation();

  const columns: Column[] = [
    {
      Header: t("maintenanceEvent.field.createdAt"),
      accessor: (event) => format(parseISO(event.createdAt), "d.M.yyyy - HH:mm"),
      id: "createdAt",
      width: 150,
    },
    {
      Header: t("maintenanceEvent.field.resolvedAt"),
      accessor: (event) => event.resolvedAt && format(parseISO(event.resolvedAt), "d.M.yyyy - HH:mm"),
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
      <Table
        emptyLabel={t("maintenanceEvent.listing.noEvents")}
        columns={columns}
        data={maintenanceEvents}
      />
    </div>
  );
};

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state) => ({
  maintainers: state.entities.maintainers,
});

export default connect<StateProps, {}, Props, ReduxState>(
  mapStateToProps
)(Loadable<StateProps, Props>(MaintenanceEventList));
