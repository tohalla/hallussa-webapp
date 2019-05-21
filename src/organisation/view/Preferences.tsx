import classnames from "classnames";
import { Field, Form, Formik, FormikConfig } from "formik";
import { equals } from "ramda";
import React from "react";
import { useTranslation } from "react-i18next";

import { connect } from "react-redux";
import Button from "../../component/button/Button";
import SelectLanguage from "../../component/input/SelectLanguage";
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

  return (
    <>
      <h1>{t("organisation.preferences.title")}</h1>
      <Formik
        initialValues={{language: organisation.language}}
        onSubmit={handleSubmit}
      >
        {({isSubmitting, initialValues, values, status: {error} = {}}) => (
          <Form className={classnames(form, contentVerticalSpacing)}>
            <Field
              label={t("organisation.preferences.field.language")}
              component={SelectLanguage}
              name="language"
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
