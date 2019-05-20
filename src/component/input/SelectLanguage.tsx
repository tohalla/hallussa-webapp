import React from "react";
import { useTranslation } from "react-i18next";

import { FieldProps } from "formik";
import { Omit } from "../../../misc";
import Select, { SelectProps } from "./Select";

export default (props: Omit<SelectProps, "options"> & Partial<FieldProps>) => {
  const {t, i18n} = useTranslation();

  const languages = [];
  for (const lang of i18n.languages) {
    if (i18n.exists(`language.${lang}`)) {
      languages.push(({value: lang, label: t(`language.${lang}`)}));
    }
  }

  return <Select {...props} options={languages} />;
};
