import classnames from "classnames";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { AppliancePayload } from "../../../appliance/actions";
import Button from "../../../component/button/Button";
import Restricted from "../../../component/Restricted";
import { contentHorizontalSpacing, rowContainer } from "../../../style/container";
import ScheduledMaintenanceForm from "./ScheduledMaintenanceForm";

interface Props {
  appliance: AppliancePayload;
}

export default ({appliance}: Props) => {
  const [activeForm, setForm] = useState();
  const {t} = useTranslation();

  return (
    <Restricted userRole={{allowManageMaintenanceTask: true}}>
      <h3>{t("maintenanceEvent.create.title")}</h3>
      {
        activeForm === "scheduled" ?
          <ScheduledMaintenanceForm appliance={appliance}/>
        :
          <div className={classnames(rowContainer, contentHorizontalSpacing)}>
            <Button onClick={setForm.bind(undefined, "scheduled")} plain={true}>
              {t("maintenanceEvent.create.scheduled.title")}
            </Button>
            <Button onClick={setForm.bind(undefined, "repetitive")} plain={true}>
              {t("maintenanceEvent.create.repetitive.title")}
            </Button>
          </div>
      }
    </Restricted>
  );
};
