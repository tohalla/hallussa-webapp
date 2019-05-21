import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { FieldProps } from "formik";
import { Omit } from "../../../misc";
import Select, { SelectProps } from "./Select";

export default (props: Omit<SelectProps, "options"> & Partial<FieldProps>) => {
  const {t, i18n} = useTranslation();

  useEffect(() => {
    if (props.form && props.field && typeof props.field.value === "string") {
      props.form.setFieldValue(props.field.name, {
        label: t(`language.${props.field.value}`),
        value: props.field.value,
      });
    }
  }, [props.field && props.field.value]);

  const languages = [];
  for (const lang of i18n.languages) {
    if (i18n.exists(`language.${lang}`)) {
      languages.push(({value: lang, label: t(`language.${lang}`)}));
    }
  }

  return <Select {...props} options={languages} />;
};
