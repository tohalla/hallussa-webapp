import React from "react";
import { connect, MapStateToProps } from "react-redux";
import { Column } from "react-table";

import { Link } from "react-router-dom";
import Table from "../../components/Table";
import { getEntitiesByOrganisation } from "../../organisation/state";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import loadable from "../../util/hoc/loadable";
import { MaintainerPayload } from "../actions";

interface State {
  appliances: ReadonlyArray<MaintainerPayload> | APIResponsePayload;
}

class MaintainerList extends React.Component<State> {
  public static columns: Array<Column<MaintainerPayload>> = [
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
    const appliances = this.props.appliances as MaintainerPayload[];
    return (
      <Table
        columns={MaintainerList.columns}
        data={appliances}
      />
    );
  }
}

const mapStateToProps: MapStateToProps<State, {}, ReduxState> = (state) => ({
  appliances: getEntitiesByOrganisation(state, "appliances"),
});

export default connect(mapStateToProps)(loadable(MaintainerList));
