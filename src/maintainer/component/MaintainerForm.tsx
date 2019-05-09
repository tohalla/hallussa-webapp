import classnames from "classnames";
import { Field, Form, Formik, FormikConfig } from "formik";
import React, { ReactFragment } from "react";
import { RouteComponentProps } from "react-router";
import * as yup from "yup";

import { useTranslation } from "react-i18next";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import Button from "../../component/button/Button";
import CancelButton from "../../component/button/CancelButton";
import Input from "../../component/input/Input";
import { OrganisationPayload } from "../../organisation/actions";
import { getOrganisation } from "../../organisation/state";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import { contentVerticalSpacing } from "../../style/container";
import { actionsRow, form, inputRow } from "../../style/form";
import Loadable from "../../util/hoc/Loadable";
import { createMaintainer, MaintainerPayload, updateMaintainer } from "../actions";

interface StateProps {
  organisation?: OrganisationPayload | APIResponsePayload;
}

interface DispatchProps {
  createMaintainer: (organisation: number, maintainer: MaintainerPayload) => any;
  updateMaintainer: (maintainer: MaintainerPayload) => any;
}

interface Props extends RouteComponentProps {
  initialState?: MaintainerPayload;
  onSubmit?: (state: MaintainerPayload) => any;
  organisation?: OrganisationPayload;
  submitText?: string;
  header?: ReactFragment;
}

const MaintainerForm = ({
  initialState,
  organisation,
  onSubmit,
  history,
  submitText,
  header,
  ...props
}: StateProps & Props & DispatchProps) => {
  const handleSubmit: FormikConfig<any>["onSubmit"] = async (state, {setSubmitting}) => {
    if (!organisation) {
      return;
    }
    setSubmitting(true);
    if (initialState) {
      await props.updateMaintainer({...initialState, ...state});
    } else {
      const maintainer = await props.createMaintainer(organisation.id, state);
      if (maintainer) {
        history.push(`/maintainers/${maintainer.id}`);
      }
    }
    if (typeof onSubmit === "function") {
      onSubmit(state);
    }
    setSubmitting(false);
  };

  const {t} = useTranslation();
  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    firstName: yup.string().max(64).required(),
    lastName: yup.string().max(64).required(),
    phone: yup.string().matches(/^[+]{0,1}[\d \s\(\)-]{3,16}$/),
  });

  return (
    <>
      {header}
      <Formik
        initialValues={initialState || {email: "", firstName: "", lastName: "", phone: ""}}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        isInitialValid={false}
      >
        {({isValid}) => (
          <Form className={classnames(form, contentVerticalSpacing)}>
            <Field autoFocus={true} label={t("maintainer.field.email")} component={Input} type="text" name="email" />
            <div className={inputRow}>
              <Field
                row={false}
                label={t("maintainer.field.firstName")}
                component={Input}
                type="text"
                name="firstName"
              />
              <Field row={false} label={t("maintainer.field.lastName")} component={Input} type="text" name="lastName" />
            </div>
            <Field label={t("maintainer.field.phone")} component={Input} type="tel" name="phone" />
            <div className={actionsRow}>
              <Button disabled={!isValid} type="submit">{submitText || t("maintainer.create.form.submit")}</Button>
              <CancelButton />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, Props> = {
  createMaintainer,
  updateMaintainer,
};

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state) => ({
  organisation: getOrganisation(state),
});

export default connect<StateProps, DispatchProps, Props, ReduxState>(
  mapStateToProps, mapDispatchToProps
)(Loadable<StateProps, {organisation?: OrganisationPayload}>(MaintainerForm));
