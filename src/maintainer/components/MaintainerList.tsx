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
  maintainers: ReadonlyArray<MaintainerPayload> | APIResponsePayload;
}

class MaintainerList extends React.Component<State> {
  public static columns: Array<Column<MaintainerPayload>> = [
    {Header: "Id", accessor: "id"},
    {
      Header: "Name",
      accessor: ({id, firstName, lastName}) => <Link to={`/${id}`}>{firstName} {lastName}</Link>,
      id: "name",
    },
    {Header: "Email", accessor: "email"},
    {Header: "Phone", accessor: "phone"},
  ];

  public render() {
    const maintainers = this.props.maintainers as MaintainerPayload[];
    return (
      <Table
        columns={MaintainerList.columns}
        data={maintainers}
      />
    );
  }
}

const mapStateToProps: MapStateToProps<State, {}, ReduxState> = (state) => ({
  maintainers: getEntitiesByOrganisation(state, "maintainers"),
});

export default connect(mapStateToProps)(loadable(MaintainerList));
