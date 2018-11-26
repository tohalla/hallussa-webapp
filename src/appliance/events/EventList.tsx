import React, { ReactFragment } from "react";
import { connect, MapStateToProps } from "react-redux";
import { Column } from "react-table";

import { format } from "date-fns";
import { Link } from "react-router-dom";
import Table from "../../components/Table";
import { emptyContainer } from "../../emotion-styles/src/container";
import { MaintainerPayload } from "../../maintainer/actions";
import { getEntitiesByOrganisation } from "../../organisation/state";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import loadable from "../../util/hoc/loadable";
import { AppliancePayload, MaintenanceEventPayload } from "../actions";

interface StateProps {
  maintainers: ReadonlyArray<MaintainerPayload> | APIResponsePayload;
}

interface Props {
  maintenanceEvents: MaintenanceEventPayload[];
  header?: ReactFragment;
}

export class EventList extends React.Component<StateProps & Props> {
  public static defaultProps = {
    header: <h3>Maintenance events</h3>,
  };

  public columns: Array<Column<MaintenanceEventPayload>> = [
    {
      Header: "Reported at",
      accessor: (event) => format(event.createdAt, "D.M.YYYY - HH:mm"),
      id: "createdAt",
      width: 150,
    },
    {
      Header: "Resolved",
      accessor: (event) => event.resolvedAt && format(event.resolvedAt, "D.M.YYYY - HH:mm"),
      id: "resolvedAt",
      width: 150,
    },
    {Header: "Description", accessor: "description", resizable: true},
    {
      Header: "Assigned to",
      accessor: (event) => {
        if (!event.assignedTo) { return null; }
        const maintainers = this.props.maintainers as MaintainerPayload[];
        return (
          <Link to={`/maintainers/${maintainers[event.assignedTo].id}`}>
            {maintainers[event.assignedTo].firstName} {maintainers[event.assignedTo].lastName}
          </Link>
        );
      },
      id: "assignedTo",
      width: 150,
    },
  ];

  public render() {
    const {header, maintenanceEvents} = this.props;
    return (
      <>
        {header}
        {maintenanceEvents.length === 0 ?
          <div className={emptyContainer}>No events found</div>
        :
          <Table
            columns={this.columns}
            data={maintenanceEvents}
          />
        }
      </>
    );
  }
}

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state) => ({
  maintainers: getEntitiesByOrganisation(state, "maintainers"),
});

export default connect<StateProps, {}, Props, ReduxState>(
  mapStateToProps
)(loadable(EventList));
