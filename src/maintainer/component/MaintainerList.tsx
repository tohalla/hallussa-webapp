import React, { ReactFragment } from "react";
import { connect, MapStateToProps } from "react-redux";
import { Column } from "react-table";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Table from "../../component/Table";
import { getEntitiesByOrganisation } from "../../organisation/state";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import { emptyContainer } from "../../style/container";
import Loadable from "../../util/hoc/Loadable";
import { MaintainerPayload } from "../actions";

interface StateProps {
  maintainers: ReadonlyArray<MaintainerPayload> | APIResponsePayload;
}

interface Props {
  header?: ReactFragment;
}

const MaintainerList = (props: Props & StateProps) => {
  const {t} = useTranslation();
  const maintainers = props.maintainers as MaintainerPayload[];

  const columns: Column[] = [
    {Header: t("maintainer.field.id"), accessor: "id", id: "id", maxWidth: 50},
    {
      Header: t("maintainer.field.name"),
      accessor: ({id, firstName, lastName}) => <Link to={`/maintainers/${id}`}>{firstName} {lastName}</Link>,
      id: "name",
      resizable: true,
    },
    {Header: t("maintainer.field.email"), accessor: "email", id: "email", resizable: true},
    {Header: t("maintainer.field.phone"), accessor: "phone", id: "phone", resizable: true},
  ];

  return (
    <>
      {props.header}
      {maintainers.length === 0 ?
        <div className={emptyContainer}>{t("maintainer.listing.noMaintainers")}</div>
      :
        <Table
          columns={columns}
          data={maintainers}
        />
      }
    </>
  );
};

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state) => ({
  maintainers: getEntitiesByOrganisation(state, "maintainers"),
});

export default connect(mapStateToProps)(Loadable(MaintainerList));
