import React, { ReactFragment } from "react";
import { connect, MapStateToProps } from "react-redux";
import { Column } from "react-table";

import { Link } from "react-router-dom";
import Table from "../../components/Table";
import { emptyContainer } from "../../styles/container";
import { getEntitiesByOrganisation } from "../../organisation/state";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import loadable from "../../util/hoc/loadable";
import { MaintainerPayload } from "../actions";

interface StateProps {
  maintainers: ReadonlyArray<MaintainerPayload> | APIResponsePayload;
}

interface Props {
  header: ReactFragment;
}

class MaintainerList extends React.Component<Props & StateProps> {
  public static defaultProps = {
    header: <h1>Maintainer listing</h1>,
  };

  public static columns: Array<Column<MaintainerPayload>> = [
    {Header: "Id", accessor: "id", maxWidth: 50},
    {
      Header: "Name",
      accessor: ({id, firstName, lastName}) => <Link to={`/maintainers/${id}`}>{firstName} {lastName}</Link>,
      id: "name",
      resizable: true,
    },
    {Header: "Email", accessor: "email", resizable: true},
    {Header: "Phone", accessor: "phone", resizable: true},
  ];

  public render() {
    const maintainers = this.props.maintainers as MaintainerPayload[];
    return (
      <>
        {this.props.header}
        {maintainers.length === 0 ?
          <div className={emptyContainer}>No maintainers found</div>
        :
          <Table
            columns={MaintainerList.columns}
            data={maintainers}
          />
        }
      </>
    );
  }
}

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state) => ({
  maintainers: getEntitiesByOrganisation(state, "maintainers"),
});

export default connect(mapStateToProps)(loadable(MaintainerList));
