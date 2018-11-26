import { path } from "ramda";
import React, { ReactFragment } from "react";
import { connect, MapStateToProps } from "react-redux";
import { Column } from "react-table";

import { Link } from "react-router-dom";
import Table from "../../components/Table";
import { emptyContainer } from "../../emotion-styles/src/container";
import { error, success } from "../../emotion-styles/src/inline";
import { getEntitiesByOrganisation } from "../../organisation/state";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import loadable from "../../util/hoc/loadable";
import { AppliancePayload } from "../actions";

interface StateProps {
  appliances: ReadonlyArray<AppliancePayload> | APIResponsePayload;
}

interface Props {
  header: ReactFragment;
}

export class ApplianceList extends React.Component<StateProps & Props> {
  public static defaultProps = {
    header: <h1>Appliance listing</h1>,
  };

  public static columns: Array<Column<AppliancePayload>> = [
    {Header: "Id", accessor: "id", maxWidth: 50},
    {
      Header: "Name",
      accessor: (appliance) => <Link to={`/appliances/${appliance.id}`}>{appliance.name}</Link>,
      id: "name",
      resizable: true,
    },
    {Header: "Description", accessor: "description", resizable: true},
    {
      Header: "Status",
      accessor: (appliance) => path(["status", "isMalfunctioning"], appliance) ?
        <span className={error}>Malfunctioning</span>
      : <span className={success}>OK</span>,
      id: "status",
      width: 100,
    },
    {Header: "Location", accessor: "location", resizable: true},
  ];

  public render() {
    const {header} = this.props;
    const appliances = this.props.appliances as AppliancePayload[];
    return (
      <>
        {header}
        {appliances.length === 0 ?
          <div className={emptyContainer}>No appliances found</div>
        :
          <Table
            columns={ApplianceList.columns}
            data={appliances}
          />
        }
      </>
    );
  }
}

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state) => ({
  appliances: getEntitiesByOrganisation(state, "appliances"),
});

export default connect(mapStateToProps)(loadable(ApplianceList));
