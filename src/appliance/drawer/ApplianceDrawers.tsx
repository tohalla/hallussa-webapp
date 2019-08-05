import React, { memo } from "react";
import { useTranslation } from "react-i18next";

import Drawer from "../../component/drawer/Drawer";
import { AppliancePayload } from "../actions";
import MaintainerAssignment from "../component/MaintainerAssignment";
import ScheduledMaintenanceForm from "../component/ScheduledMaintenanceForm";

export default memo(({appliance}: {appliance: AppliancePayload}) => {
  const {t} = useTranslation();
  return (
    <>
      <Drawer label={t("appliance.drawer.maintainers.title")}>
        <MaintainerAssignment appliance={appliance} />
      </Drawer>
      <Drawer label={t("appliance.drawer.scheduledMaintenance.title")}>
        <ScheduledMaintenanceForm appliance={appliance} />
      </Drawer>
    </>
  );
});
