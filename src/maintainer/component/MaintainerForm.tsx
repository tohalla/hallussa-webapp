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
import SelectLanguage from "../../component/input/SelectLanguage";
import { OrganisationPayload } from "../../organisation/actions";
import { getOrganisation } from "../../organisation/state";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import { contentVerticalSpacing } from "../../style/container";
import { actionsRow, form, inputRow } from "../../style/form";
import Loadable from "../../util/hoc/Loadable";
import { createMaintainer, MaintainerPayload, updateMaintainer } from "../actions";

interface StateProps {
  organisation?: OrganisationPayload | APIResponsePayload;
}

interface DispatchProps {
  createMaintainer: (organisation: number, maintainer: MaintainerPayload) => any;
  updateMaintainer: (maintainer: MaintainerPayload) => any;
}

interface Props extends RouteComponentProps {
  initialState?: MaintainerPayload;
  onSubmit?: (state: MaintainerPayload) => any;
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
}: StateProps & Props & DispatchProps & {organisation: OrganisationPayload}) => {
  const handleSubmit: FormikConfig<any>["onSubmit"] = async (state) => {
    if (!organisation) {
      return;
    }
    if (initialState) {
      await props.updateMaintainer({...initialState, ...state, language: state.language.value});
    } else {
      const maintainer = await props.createMaintainer(organisation.id, {...state, language: state.language.value});
      if (maintainer) {
        history.push(`/maintainers/${maintainer.id}`);
      }
    }
    if (typeof onSubmit === "function") {
      onSubmit(state);
    }
  };

  const {t} = useTranslation();
  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    firstName: yup.string().max(64).required(),
    language: yup.object().shape({
      value: yup.string(),
    }).required(),
    lastName: yup.string().max(64).required(),
    phone: yup.string().matches(/^[+]{0,1}[\d \s\(\)-]{3,16}$/),
  });

  return (
    <>
      {header}
      <Formik
        initialValues={initialState || {
          email: "",
          firstName: "",
          language: organisation.language,
          lastName: "",
          phone: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({isValid, isSubmitting, dirty, errors, touched, setFieldValue}) => (
          <Form className={classnames(form, contentVerticalSpacing)}>
            <Field
              autoFocus={true}
              label={t("maintainer.field.email")}
              as={Input}
              error={errors.email}
              touched={touched.email}
              type="text"
              name="email"
            />
            <div className={inputRow}>
              <Field
                row={false}
                label={t("maintainer.field.firstName")}
                as={Input}
                error={errors.firstName}
                touched={touched.firstName}
                type="text"
                name="firstName"
              />
              <Field
                row={false}
                label={t("maintainer.field.lastName")}
                as={Input}
                error={errors.lastName}
                touched={touched.lastName}
                type="text"
                name="lastName"
              />
            </div>
            <Field
              label={t("maintainer.field.phone")}
              as={Input}
              error={errors.phone}
              touched={touched.phone}
              type="tel"
              name="phone"
            />
            <Field
              label={t("maintainer.field.language")}
              as={SelectLanguage}
              setFieldValue={setFieldValue}
              error={errors.language}
              touched={touched.language}
              name="language"
            />
            <div className={actionsRow}>
              <Button disabled={!dirty || isSubmitting || !isValid} type="submit">
                {submitText || t("maintainer.create.form.submit")}
              </Button>
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
)(Loadable<StateProps, {organisation: OrganisationPayload}>(MaintainerForm));
