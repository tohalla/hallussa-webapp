import classnames from "classnames";
import { Field, Form, Formik, FormikConfig } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import * as yup from "yup";

import Button from "../component/button/Button";
import Input from "../component/input/Input";
import { baseUrl } from "../config";
import { contentVerticalSpacing } from "../style/container";
import { actionsRow, form } from "../style/form";
import { error as errorStyle, small } from "../style/inline";
import { authenticate } from "./auth";

export default () => {
  const {t} = useTranslation();

  const handleSubmit: FormikConfig<any>["onSubmit"] = async (state, {setSubmitting, setStatus}) => {
    try {
      await authenticate(state);
      window.location.href = baseUrl;
    } catch (error) {
      setStatus({error});
      setSubmitting(false);
    }
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email(t("account.registration.form.error.invalidEmail")).required(),
    password: yup.string().required(),
  });

  return (
    <>
      <h1>{t("account.authentication.title")}</h1>
      <Formik
        initialValues={{email: "", password: ""}}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({isValid, dirty, isSubmitting, errors, touched, status: {error} = {}}) => (
          <Form className={classnames(form, contentVerticalSpacing)}>
            <Field
              autoFocus={true}
              label={t("account.field.email")}
              as={Input}
              error={errors.email}
              touched={touched.email}
              type="email"
              name="email"
            />
            <Field
              label={t("account.field.password")}
              as={Input}
              error={errors.password}
              touched={touched.password}
              type="password"
              name="password"
            />
            {error && <div className={errorStyle}>{error}</div>}
            <div className={actionsRow}>
              <Button disabled={!dirty || isSubmitting || !isValid} type="submit">
                {t("account.authentication.form.submit")}
              </Button>
              <Link className={small} to="/register">{t("account.authentication.createNewAccount")}</Link>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
