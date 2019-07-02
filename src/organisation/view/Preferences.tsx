import classnames from "classnames";
import { Field, Form, Formik, FormikConfig } from "formik";
import { equals, prop } from "ramda";
import React from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

import { connect } from "react-redux";
import Button from "../../component/button/Button";
import Input from "../../component/input/Input";
import SelectLanguage, { getLanguageOption } from "../../component/input/SelectLanguage";
import { ReduxState } from "../../store/store";
import { contentVerticalSpacing } from "../../style/container";
import { actionsRow, form } from "../../style/form";
import { OrganisationPayload, updateOrganisation } from "../actions";

interface Props {
  organisation: OrganisationPayload;
}

interface DispatchProps {
  updateOrganisation: typeof updateOrganisation;
}

const Preferences = ({organisation, ...props}: Props & DispatchProps) => {
  const {t} = useTranslation();

  const handleSubmit: FormikConfig<any>["onSubmit"] = async (state, {setSubmitting}) => {
    await props.updateOrganisation({...state, language: state.language.value, id: organisation.id});
    setSubmitting(false);
  };

  const validationSchema = yup.object().shape({
    allowResolvingEvents: yup.bool(),
    qrCodes: yup.bool(),
  });

  const initialValues = {
    language: organisation.language && getLanguageOption({t, language: organisation.language}),
    ...(organisation.preferences || {}),
  };

  return (
    <>
      <h1>{t("organisation.preferences.title")}</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({isSubmitting, values, errors, touched}) => (
          <Form className={classnames(form, contentVerticalSpacing)}>
            <Field
              label={t("organisation.preferences.field.language")}
              as={SelectLanguage}
              error={errors.language}
              touched={touched.language}
              name="language"
            />
            <Field
              label={t("organisation.preferences.field.qrCodes")}
              as={Input}
              type="checkbox"
              name="qrCodes"
            />
            <Field
              label={t("organisation.preferences.field.allowResolvingEvents")}
              as={Input}
              type="checkbox"
              name="allowResolvingEvents"
            />
            {!equals(values, initialValues) && <div className={actionsRow}>
              <Button disabled={isSubmitting} type="submit">
                {t("organisation.preferences.submit")}
              </Button>
            </div>}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default connect<any, DispatchProps, Props, ReduxState>(
  undefined, {updateOrganisation}
)(Preferences);
