import React from "react";
import { useTranslation } from "react-i18next";

import { RouteComponentProps } from "react-router";
import CancelButton from "../../component/button/CancelButton";
import OrganisationForm from "../component/OrganisationForm";

export default (props: RouteComponentProps) => {
  const {t} = useTranslation();
  return (
    <OrganisationForm
      header={<h1>{t("organisation.create.title")}</h1>}
      secondary={<CancelButton history={props.history} />}
      {...props}
    />
  );
};
