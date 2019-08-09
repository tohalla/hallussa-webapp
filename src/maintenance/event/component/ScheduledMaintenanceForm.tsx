import React from "react";
import { connect, MapStateToProps } from "react-redux";

import { useTranslation } from "react-i18next";
import { AppliancePayload } from "../../../appliance/actions";
import DateInput from "../../../component/input/DateInput";
import { ReduxState } from "../../../store/store";
import Loadable from "../../../util/hoc/Loadable";

interface StateProps {
  //
}

interface DispatchProps {
  //
}

interface Props {
  appliance: AppliancePayload;
}

const ScheduledMaintenanceForm = ({
  appliance,
  ...props
}: Props & StateProps & DispatchProps) => {
  const {t} = useTranslation();

  return (
    <>
      <DateInput onDayChange={console.log}/>
    </>
  );
};

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state) => ({
});

export default connect(mapStateToProps, {})(
  Loadable(ScheduledMaintenanceForm)
);
