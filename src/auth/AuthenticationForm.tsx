import { pick } from "ramda";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";
import Form, { FormState } from "../components/Form";
import { baseUrl } from "../config";
import { small } from "../styles/inline";
import { authenticate } from "./auth";

type Inputs = "email" | "password";

export default () => {
  const [error, setError] = useState();
  const {t} = useTranslation();

  const handleSubmit = async (state: FormState<Inputs>) => {
    try {
      await authenticate(pick(["email", "password"], state));
      window.location.href = baseUrl;
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Form
      error={error}
      inputs={[
        {
          key: "email",
          props: {type: "email", autoFocus: true, placeholder: t("account.field.email")},
          validate: {required: true},
        },
        {
          key: "password",
          props: {type: "password", placeholder: t("account.field.password")},
          validate: {required: true},
        },
      ]}
      onSubmit={handleSubmit}
      secondary={
        <Link className={small} to="/register">
          {t("account.authentication.createNewAccount")}
        </Link>
      }
      submitText={t("account.authentication.form.submit")}
    />
  );
};
