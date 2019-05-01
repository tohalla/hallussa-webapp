import React from "react";
import { useTranslation } from "react-i18next";

import { RouteComponentProps } from "react-router";
import { padded } from "../../style/container";
import ApplianceForm from "../component/ApplianceForm";

export default (props: RouteComponentProps) => {
  const {t} = useTranslation();
  return (
    <div className={padded}>
      <ApplianceForm
        header={<h1>{t("appliance.create.title")}</h1>}
        submitText={t("appliance.create.form.submit")}
        {...props}
      />
    </div>
  );
};
