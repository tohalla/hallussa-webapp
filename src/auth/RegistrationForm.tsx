import { dissoc } from "ramda";
import React, { ChangeEventHandler, Component, useState } from "react";
import { Link } from "react-router-dom";

import { Trans, useTranslation } from "react-i18next";
import Form, { FormInput, FormState } from "../components/Form";
import { baseUrl } from "../config";
import { inputRow } from "../styles/form";
import { small } from "../styles/inline";
import { isValidEmail } from "../util/validationFunctions";
import { register } from "./auth";

type Inputs = "email" | "firstName" | "lastName" | "password" | "retypePassword" | "tos";

export default () => {
  const [tos, setTOS] = useState();
  const [error, setError] = useState();
  const {t} = useTranslation();

  const handleSubmit = async (state: FormState<Inputs>) => {
    try {
      await register(dissoc("errors", state));
      window.location.href = baseUrl; // refresh page to log in
    } catch (error) {
      setError(error);
    }
  };

  // custom validation logic
  const validate = (state: FormState<Inputs>) => {
    const {email, retypePassword, password} = state;
    const errors = {...state.errors};
    if (!isValidEmail(email)) {
      errors.email = t<string>("account.registration.form.error.invalidEmail");
    }
    if (retypePassword !== password) {
      errors.retypePassword = t<string>("account.registration.form.error.passwordsDontMatch");
    }
    return errors;
  };

  const handleTOSToggle: ChangeEventHandler<HTMLInputElement> = () =>
    setTOS(!tos);

  return (
    <Form
      inputs={[
        {
          key: "email",
          props: {autoFocus: true, placeholder: t("account.field.email")},
          validate: {required: true},
        },
        [
          {key: "firstName", props: {placeholder: t("account.field.firstName")}, validate: {required: true}},
          {key: "lastName", props: {placeholder: t("account.field.lastName")}, validate: {required: true}},
        ],
        {
          key: "password",
          props: {type: "password", placeholder: t("account.field.password")},
          validate: {required: true, minLength: 6},
        },
        {
          key: "retypePassword",
          props: {placeholder: t("account.field.retypePassword"), type: "password"},
          validate: {required: true},
        },
      ] as ReadonlyArray<FormInput<Inputs> | [FormInput<Inputs>, FormInput<Inputs>]>}
      onSubmit={handleSubmit}
      secondary={<Link className={small} to="/">{t("account.registration.authenticate")}</Link>}
      submitText={t("account.registration.form.submit")}
      validate={validate}
      isValid={tos}
      error={error}
    >
      <div className={inputRow}>
        <label>
          <input
            type="checkbox"
            checked={tos}
            onChange={handleTOSToggle}
          />
          <Trans i18nKey="account.registration.form.tosLabel">
            a <a href="/terms-of-service.html" target="_blank">terms</a>
          </Trans>
        </label>
      </div>
    </Form>
  );
};
