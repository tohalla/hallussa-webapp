import React from "react";
import { connect, MapStateToProps } from "react-redux";
import { Column } from "react-table";

import { Link } from "react-router-dom";
import Table from "../../components/Table";
import { getEntitiesByOrganisation } from "../../organisation/state";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import loadable from "../../util/hoc/loadable";
import { AppliancePayload } from "../actions";

interface State {
  appliances: ReadonlyArray<AppliancePayload> | APIResponsePayload;
}

class ApplianceList extends React.Component<State> {
  public static columns: Array<Column<AppliancePayload>> = [
    {Header: "Id", accessor: "id"},
    {
      Header: "Name",
      accessor: (appliance) => <Link to={`/${appliance.id}`}>{appliance.name}</Link>,
      id: "name",
    },
    {Header: "Model", accessor: undefined},
    {Header: "Manufacturer", accessor: undefined},
  ];

  public render() {
    const appliances = this.props.appliances as AppliancePayload[];
    return (
      <Table
        columns={ApplianceList.columns}
        data={appliances}
      />
    );
  }
}

const mapStateToProps: MapStateToProps<State, {}, ReduxState> = (state) => ({
  appliances: getEntitiesByOrganisation(state, "appliances"),
});

export default connect(mapStateToProps)(loadable(ApplianceList));
