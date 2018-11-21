import React from "react";
import { connect, MapStateToProps } from "react-redux";
import { Column } from "react-table";

import { Link } from "react-router-dom";
import Table from "../../components/Table";
import { emptyContainer } from "../../emotion-styles/src/container";
import { getEntitiesByOrganisation } from "../../organisation/state";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import loadable from "../../util/hoc/loadable";
import { AppliancePayload } from "../actions";

interface StateProps {
  appliances: ReadonlyArray<AppliancePayload> | APIResponsePayload;
}

class ApplianceList extends React.Component<StateProps> {
  public static columns: Array<Column<AppliancePayload>> = [
    {Header: "Id", accessor: "id"},
    {
      Header: "Name",
      accessor: (appliance) => <Link to={`/${appliance.id}`}>{appliance.name}</Link>,
      id: "name",
    },
    {Header: "Description", accessor: "description"},
    {Header: "Model", accessor: undefined},
    {Header: "Manufacturer", accessor: undefined},
  ];

  public render() {
    const appliances = this.props.appliances as AppliancePayload[];
    if (appliances.length === 0) {
      return <div className={emptyContainer}>No appliances created</div>;
    }
    return (
      <Table
        columns={ApplianceList.columns}
        data={appliances}
      />
    );
  }
}

const mapStateToProps: MapStateToProps<StateProps, {}, ReduxState> = (state) => ({
  appliances: getEntitiesByOrganisation(state, "appliances"),
});

export default connect(mapStateToProps)(loadable(ApplianceList));
