import classnames from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";

import { RouteComponentProps } from "react-router";
import { padded, viewContentContainer } from "../../style/container";
import OrganisationForm from "../component/OrganisationForm";

export default (props: RouteComponentProps) => {
  const {t} = useTranslation();
  return (
    <div className={classnames(viewContentContainer, padded)}>
      <OrganisationForm
        header={<h1>{t("organisation.create.title")}</h1>}
        {...props}
      />
    </div>
  );
};
