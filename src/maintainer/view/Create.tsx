import React from "react";
import { useTranslation } from "react-i18next";
import { RouteComponentProps } from "react-router";

import CancelButton from "../../component/button/CancelButton";
import { padded } from "../../style/container";
import MaintainerForm from "../component/MaintainerForm";

export default (props: RouteComponentProps) => {
  const {t} = useTranslation();
  return (
    <div className={padded}>
      <MaintainerForm
        secondary={<CancelButton history={props.history} />}
        header={<h1>{t("maintainer.create.title")}</h1>}
        submitText={t("maintainer.create.form.submit")}
        {...props}
      />
    </div>
  );
};
