import React, { useState } from "react";

import { AppliancePayload } from "../../../appliance/actions";
import DateTimeInput from "../../../component/input/DateTimeInput";

interface Props {
  appliance: AppliancePayload;
}

const ScheduledMaintenanceForm = ({
  appliance,
}: Props) => {
  const [triggerAt, setTriggerAt] = useState();
  return (
    <>
      <DateTimeInput onChange={setTriggerAt} value={triggerAt}/>
    </>
  );
};

export default ScheduledMaintenanceForm;
