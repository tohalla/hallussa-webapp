import React from "react";
import { useTranslation } from "react-i18next";
import { RouteComponentProps } from "react-router";

import { padded } from "../../style/container";
import MaintainerForm from "../component/MaintainerForm";

export default (props: RouteComponentProps) => {
  const {t} = useTranslation();
  return (
    <div className={padded}>
      <MaintainerForm
        header={<h1>{t("maintainer.create.title")}</h1>}
        submitText={t("maintainer.create.form.submit")}
        {...props}
      />
    </div>
  );
};
