import { Field, Form, Formik, FormikConfig } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { connect, MapDispatchToProps } from "react-redux";
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
  const handleSubmit: FormikConfig<any>["onSubmit"] = async (state, {setSubmitting}) => {
    await props.addAccount(organisation.id, state);
    setSubmitting(false);
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
      isInitialValid={false}
    >
      {({isValid, isSubmitting}) => (
        <Form className={rowContainer}>
          <Field
            component={Input}
            label={t("organisation.account.field.email")}
            wide={true}
            type="email"
            name="email"
          />
          <Button disabled={isSubmitting || !isValid} type="submit">{t("organisation.account.addAccount")}</Button>
        </Form>
      )}
    </Formik>
  );
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, Props> = { addAccount };

export default connect<{}, DispatchProps, Props, ReduxState>(
  undefined,
  mapDispatchToProps
)(AddAccount);
