import React from "react";
import { useTranslation } from "react-i18next";

export default () => {
  const {t} = useTranslation();

  return (
    <div>
      <h1>{t("organisation.accounts.title")}</h1>
      <h2>{t("organisation.logins.title")}</h2>
    </div>
  );
};
