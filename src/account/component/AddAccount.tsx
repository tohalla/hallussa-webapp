import { Field, Form, Formik, FormikConfig } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import * as yup from "yup";

import Button from "../../component/button/Button";
import Input from "../../component/input/Input";
import { OrganisationPayload } from "../../organisation/actions";
import { ReduxState } from "../../store/store";
import { rowContainer } from "../../style/container";
import { addAccount } from "../actions";

interface DispatchProps {
  addAccount: (organisation: number, payload: {email: string}) => any;
}

interface Props {
  organisation: OrganisationPayload;
}

const AddAccount = ({organisation, ...props}: Props & DispatchProps) => {
  const handleSubmit: FormikConfig<any>["onSubmit"] = async (state) => {
    await props.addAccount(organisation.id, state);
  };

  const {t} = useTranslation();
  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
  });

  return (
    <Formik
      initialValues={{email: ""}}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({isValid, dirty, isSubmitting, errors, touched}) => (
        <Form className={rowContainer}>
          <Field
            as={Input}
            label={t("organisation.account.field.email")}
            error={errors.email}
            touched={touched.email}
            wide={true}
            type="email"
            name="email"
          />
          <Button disabled={!dirty || isSubmitting || !isValid} type="submit">
            {t("organisation.account.addAccount")}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default connect<{}, DispatchProps, Props, ReduxState>(
  undefined, {addAccount}
)(AddAccount);
