import classnames from "classnames";
import { ErrorMessage, Field, Form, Formik, FormikConfig } from "formik";
import React from "react";
import * as yup from "yup";

import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Button from "../component/button/Button";
import Input from "../component/input/Input";
import { baseUrl } from "../config";
import { contentVerticalSpacing } from "../style/container";
import { actionsRow, form, inputRow } from "../style/form";
import { error as errorStyle, small } from "../style/inline";
import { register } from "./auth";

export default () => {
  const {t} = useTranslation();

  const handleSubmit: FormikConfig<any>["onSubmit"] = async (state, {setStatus}) => {
    try {
      await register(state);
      window.location.href = baseUrl;
    } catch (error) {
      setStatus({error});
    }
  };

  const validationSchema = yup.object().shape({
    acceptTOS: yup.bool().oneOf([true]),
    email: yup.string().email(t("account.registration.form.error.invalidEmail")).required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    password: yup.string().required().min(6),
    retypePassword: yup
      .string().required()
      .oneOf([yup.ref("password")], t("account.registration.form.error.passwordsDontMatch")),
  });

  const initialValues = {email: "", firstName: "", lastName: "", password: "", retypePassword: "", acceptTOS: false};

  return (
    <>
      <h1>{t("account.registration.title")}</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({isValid, touched, errors, isSubmitting, dirty, status: {error} = {}}) => (
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
            <div className={inputRow}>
              <Field
                label={t("account.field.firstName")}
                as={Input}
                row={false}
                error={errors.firstName}
                touched={touched.firstName}
                type="text"
                name="firstName"
              />
              <Field
                label={t("account.field.lastName")}
                as={Input}
                row={false}
                error={errors.lastName}
                touched={touched.lastName}
                type="text"
                name="lastName"
              />
            </div>
            <Field
              label={t("account.field.password")}
              as={Input}
              error={errors.password}
              touched={touched.password}
              type="password"
              name="password"
            />
            <Field
              label={t("account.field.retypePassword")}
              as={Input}
              error={errors.retypePassword}
              touched={touched.retypePassword}
              type="password"
              name="retypePassword"
            />
            <ErrorMessage component="div" className={errorStyle} name={"retypePassword"} />
            <Field
              label={
                <Trans i18nKey="account.registration.form.tosLabel">
                  a <a href="/terms-of-service.html" target="_blank">terms</a>
                </Trans>
              }
              as={Input}
              error={errors.acceptTOS}
              touched={touched.acceptTOS}
              type="checkbox"
              name="acceptTOS"
            />
            {error && <div className={errorStyle}>{error}</div>}
            <div className={actionsRow}>
              <Button disabled={!dirty || isSubmitting || !isValid} type="submit">
                {t("account.registration.form.submit")}
              </Button>
              <Link className={small} to="/">{t("account.registration.authenticate")}</Link>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
