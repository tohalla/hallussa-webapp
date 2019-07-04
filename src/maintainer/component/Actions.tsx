import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

import DoubleClickButton from "../../component/button/DoubleClickButton";
import Dropdown from "../../component/Dropdown";
import Restricted from "../../component/Restricted";
import { closeTab } from "../../component/tabbed/actions";
import { ReduxState } from "../../store/store";
import { dropdownMenuItem } from "../../style/dropdown";
import { alertIndication } from "../../style/inline";
import { anyPropEquals } from "../../util/utilityFunctions";
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
    <Restricted
      comparator={anyPropEquals}
      requirements={{userRole: {allowDeleteMaintainer: true, allowUpdateMaintainer: true}}}
    >
      <Dropdown>
        <Restricted requirements={{userRole: {allowDeleteMaintainer: true}}}>
          <DoubleClickButton
            className={dropdownMenuItem}
            plain={true}
            secondaryClassName={alertIndication}
            onClick={handeDeleteMaintainer}
          >
            {t("maintainer.action.delete")}
          </DoubleClickButton>
        </Restricted>
        <Restricted requirements={{userRole: {allowUpdateMaintainer: true}}}>
          <Link className={dropdownMenuItem} to={`/maintainers/${props.maintainer.id}/edit`}>
            {t("maintainer.action.edit")}
          </Link>
        </Restricted>
      </Dropdown>
    </Restricted>
  );
};

export default connect<{}, DispatchProps, Props, ReduxState>(
  undefined,
  {deleteMaintainer, closeTab}
)(Actions);
