import classnames from "classnames";
import { Field, Form, Formik, FormikConfig } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import * as yup from "yup";

import Button from "../../component/button/Button";
import Input from "../../component/input/Input";
import { callAPI } from "../../store/middleware/api/actions";
import { contentVerticalSpacing } from "../../style/container";
import { actionsRow, form } from "../../style/form";
import { error as errorStyle } from "../../style/inline";
import useToggle from "../../util/hook/useToggle";
import { AccountPayload } from "../actions";

interface Props {
  account: AccountPayload;
}

interface DispatchProps {
  callAPI: typeof callAPI;
}

const changePassword =  ({account, ...props}: Props & DispatchProps) => {
  const [visible, toggleVisible] = useToggle();
  const {t} = useTranslation();

  const handleSubmit: FormikConfig<any>["onSubmit"] = async (state, {setStatus, resetForm}) => {
    await props.callAPI({
      data: state,
      endpoint: `/accounts/${account.id}/password`,
      method: "put",
      onFailure: (error) => {
        setStatus({error});
      },
      onSuccess: () => {
        resetForm();
        toggleVisible();
      },
    });
  };

  const validationSchema = yup.object().shape({
    currentPassword: yup.string().required().min(6),
    password: yup.string().required().min(6),
    retypePassword: yup
      .string().required()
      .oneOf([yup.ref("password")], t("account.registration.form.error.passwordsDontMatch")),
  });

  return visible ? (
    <Formik
      initialValues={{currentPassword: "", password: "", retypePassword: ""}}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({isValid, errors, touched, isSubmitting, dirty, status: {error} = {}}) => (
        <Form className={classnames(form, contentVerticalSpacing)}>
          <Field
            label={t("account.field.currentPassword")}
            as={Input}
            error={errors.currentPassword}
            touched={touched.currentPassword}
            type="password"
            name="currentPassword"
          />
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
          {error && <div className={errorStyle}>{error}</div>}
          <div className={actionsRow}>
            <Button disabled={!dirty || isSubmitting || !isValid} type="submit">
              {t("account.action.changePassword")}
            </Button>
            <Button plain={true} onClick={toggleVisible}>
              {t("cancel")}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  ) : (
    <div>
      <Button plain={true} onClick={toggleVisible}>{t("account.action.changePassword")}</Button>
    </div>
  );
};

export default connect(
  undefined, {callAPI}
)(changePassword);
