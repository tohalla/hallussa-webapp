import classnames from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

import DoubleClickButton from "../../component/button/DoubleClickButton";
import Restricted from "../../component/Restricted";
import { closeTab } from "../../component/tabbed/actions";
import { contentHorizontalSpacing, rowContainer } from "../../style/container";
import { alertIndication } from "../../style/inline";
import { AppliancePayload, deleteAppliance } from "../actions";

interface Props extends Pick<RouteComponentProps<{appliance: string}>, "match" | "history">, DispatchProps {
  appliance: AppliancePayload;
}

interface DispatchProps {
  deleteAppliance: typeof deleteAppliance;
  closeTab: typeof closeTab;
}

const Actions = (props: Props) => {
  const {t} = useTranslation();

  const handleDeleteAppliance = async () => {
    if (props.match.params.appliance) {
      props.history.push("/appliances"); // go back to root
    }
    await props.deleteAppliance(props.appliance);
    props.closeTab("appliances", {key: String(props.appliance.id)});
  };

  return (
    <div className={classnames(rowContainer, contentHorizontalSpacing)}>
      <Restricted requirements={{userRole: {allowDeleteAppliance: true}}}>
        <DoubleClickButton
          plain={true}
          secondaryClassName={alertIndication}
          onClick={handleDeleteAppliance}
        >
          {t("appliance.action.delete")}
        </DoubleClickButton>
      </Restricted>
      <Restricted requirements={{userRole: {allowUpdateAppliance: true}}}>
        <Link to={`/appliances/${props.appliance.id}/edit`}>
          {t("appliance.action.edit")}
        </Link>
      </Restricted>
    </div>
  );
};

export default connect(
  undefined,
  {deleteAppliance, closeTab}
)(Actions);
