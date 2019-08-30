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
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import { contentVerticalSpacing } from "../../style/container";
import { actionsRow, form } from "../../style/form";
import { createOrganisation, OrganisationPayload, setActiveOrganisation, updateOrganisation } from "../actions";
import { getOrganisation } from "../state";

interface StateProps {
  activeOrganisation?: OrganisationPayload | APIResponsePayload;
}

interface DispatchProps {
  setActiveOrganisation: (organisation: number, fetchRelated: boolean) => any;
  createOrganisation(organisation: OrganisationPayload): any;
  updateOrganisation(organisation: OrganisationPayload): any;
}

interface Props extends RouteComponentProps {
  initialState?: OrganisationPayload;
  onSubmit?: (state: OrganisationPayload) => any;
  submitText?: string;
  header?: ReactFragment;
}

const OrganisationForm = ({
  activeOrganisation,
  history,
  initialState,
  onSubmit,
  submitText,
  header,
  ...props
}: DispatchProps & StateProps & Props) => {
  const handleSubmit: FormikConfig<any>["onSubmit"] = async (state) => {
    if (initialState) {
      await props.updateOrganisation({...initialState, ...state});
    } else {
      const newOrganisation = await props.createOrganisation(state);
      if (newOrganisation) {
        if (!activeOrganisation) {// set newly created organistaion active, if no previous organisations
          props.setActiveOrganisation(newOrganisation.id, false);
        }
      }
      history.push(`/organisations/${newOrganisation.id}`);
    }
    if (typeof onSubmit === "function") {
      onSubmit(state);
    }
  };

  const {t} = useTranslation();
  const validationSchema = yup.object().shape({
    language: yup.object().shape({
      value: yup.string(),
    }).required(),
    name: yup.string().max(64).required(),
    organisationIdentifier: yup.string().max(64).required(),
  });

  return (
    <>
      {header}
      <Formik
        initialValues={initialState || {name: "", organisationIdentifier: ""}}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({isValid, isSubmitting, dirty, errors, touched}) => (
          <Form className={classnames(form, contentVerticalSpacing)}>
            <Field
              autoFocus={true}
              label={t("organisation.field.name")}
              as={Input}
              error={errors.name}
              touched={touched.name}
              type="text"
              name="name"
            />
            <Field
              label={t("organisation.field.organisationIdentifier")}
              as={Input}
              error={errors.organisationIdentifier}
              touched={touched.organisationIdentifier}
              type="text"
              name="organisationIdentifier"
            />
            <div className={actionsRow}>
              <Button disabled={!dirty || isSubmitting || !isValid} type="submit">
                {submitText || t("organisation.create.form.submit")}
              </Button>
              <CancelButton />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state) => ({
  activeOrganisation: getOrganisation(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, Props> = {
  createOrganisation,
  setActiveOrganisation,
  updateOrganisation,
};

export default connect<{}, DispatchProps, Props, ReduxState>(
  mapStateToProps, mapDispatchToProps
)(OrganisationForm);
