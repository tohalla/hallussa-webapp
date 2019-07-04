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
import { AppliancePayload, deleteAppliance } from "../actions";

interface Props extends Pick<RouteComponentProps<{appliance: string}>, "match" | "history"> {
  appliance: AppliancePayload;
}

interface DispatchProps {
  deleteAppliance: typeof deleteAppliance;
  closeTab: typeof closeTab;
}

const Actions = (props: Props & DispatchProps) => {
  const {t} = useTranslation();

  const handleDeleteAppliance = async () => {
    if (props.match.params.appliance) {
      props.history.push("/appliances"); // go back to root
    }
    await props.deleteAppliance(props.appliance);
    props.closeTab("appliances", {key: String(props.appliance.id)});
  };

  return (
    <Restricted
      comparator={anyPropEquals}
      requirements={{userRole: {allowDeleteAppliance: true, allowUpdateAppliance: true}}}
    >
      <Dropdown>
        <Restricted requirements={{userRole: {allowDeleteAppliance: true}}}>
          <DoubleClickButton
            className={dropdownMenuItem}
            plain={true}
            secondaryClassName={alertIndication}
            onClick={handleDeleteAppliance}
          >
            {t("appliance.action.delete")}
          </DoubleClickButton>
        </Restricted>
        <Restricted requirements={{userRole: {allowUpdateAppliance: true}}}>
          <Link className={dropdownMenuItem} to={`/appliances/${props.appliance.id}/edit`}>
            {t("appliance.action.edit")}
          </Link>
        </Restricted>
      </Dropdown>
    </Restricted>
  );
};

export default connect<{}, DispatchProps, Props, ReduxState>(
  undefined,
  {deleteAppliance, closeTab}
)(Actions);
