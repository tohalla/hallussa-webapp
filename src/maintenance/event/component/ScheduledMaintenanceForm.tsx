import React from "react";

import { AppliancePayload } from "../../../appliance/actions";
import DateInput from "../../../component/input/DateInput";

interface Props {
  appliance: AppliancePayload;
}

const ScheduledMaintenanceForm = ({
  appliance,
}: Props) => {
  return (
    <>
      <DateInput onDayChange={console.log}/>
    </>
  );
};

export default ScheduledMaintenanceForm;
