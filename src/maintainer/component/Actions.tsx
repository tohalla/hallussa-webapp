import classnames from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

import DoubleClickButton from "../../component/button/DoubleClickButton";
import Restricted from "../../component/Restricted";
import { closeTab } from "../../component/tabbed/actions";
import { ReduxState } from "../../store/store";
import { contentHorizontalSpacing, rowContainer } from "../../style/container";
import { alertIndication } from "../../style/inline";
import { deleteMaintainer, MaintainerPayload } from "../actions";

interface Props extends Pick<RouteComponentProps<{maintainer: string}>, "match" | "history"> {
  maintainer: MaintainerPayload;
}

interface DispatchProps {
  deleteMaintainer: typeof deleteMaintainer;
  closeTab: typeof closeTab;
}

const Actions = (props: Props & DispatchProps) => {
  const {t} = useTranslation();

  const handeDeleteMaintainer = async () => {
    if (props.match.params.maintainer) {
      props.history.push("/maintainers"); // go back to root
    }
    await props.deleteMaintainer(props.maintainer);
    props.closeTab("maintainers", {key: String(props.maintainer.id)});
  };

  return (
    <div className={classnames(rowContainer, contentHorizontalSpacing)}>
      <Restricted requirements={{userRole: {allowDeleteMaintainer: true}}}>
        <DoubleClickButton
          plain={true}
          secondaryClassName={alertIndication}
          onClick={handeDeleteMaintainer}
        >
          {t("maintainer.action.delete")}
        </DoubleClickButton>
      </Restricted>
      <Restricted requirements={{userRole: {allowUpdateMaintainer: true}}}>
        <Link to={`/maintainers/${props.maintainer.id}/edit`}>
          {t("maintainer.action.edit")}
        </Link>
      </Restricted>
    </div>
  );
};

export default connect<{}, DispatchProps, Props, ReduxState>(
  undefined,
  {deleteMaintainer, closeTab}
)(Actions);
