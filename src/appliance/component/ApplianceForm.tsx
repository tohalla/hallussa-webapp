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
import { actionsRow, form } from "../../style/form";
import Loadable from "../../util/hoc/Loadable";
import { AppliancePayload, createAppliance, updateAppliance } from "../actions";

interface StateProps {
  organisation?: OrganisationPayload | APIResponsePayload;
}

interface DispatchProps {
  createAppliance: (organisation: number, appliance: AppliancePayload) => any;
  updateAppliance: (appliance: AppliancePayload) => any;
}

interface Props extends RouteComponentProps {
  initialState?: AppliancePayload;
  onSubmit?: (state: AppliancePayload) => any;
  organisation?: OrganisationPayload;
  submitText?: string;
  header?: ReactFragment;
}

const ApplianceForm = ({
  initialState,
  organisation,
  onSubmit,
  history,
  submitText,
  header,
  ...props
}: StateProps & Props & DispatchProps) => {
  const handleSubmit: FormikConfig<any>["onSubmit"] = async (state) => {
    if (!organisation) {
      return;
    }
    if (initialState) {
      await props.updateAppliance({...initialState, ...state});
    } else {
      const appliance = await props.createAppliance(organisation.id, state);
      if (appliance) {
        history.push(`/appliances/${appliance.id}`);
      }
    }
    if (typeof onSubmit === "function") {
      onSubmit(state);
    }
  };

  const {t} = useTranslation();
  const validationSchema = yup.object().shape({
    description: yup.string(),
    location: yup.string(),
    name: yup.string().max(64).required(),
  });

  return (
    <>
      {header}
      <Formik
        initialValues={initialState || {name: "", description: "", location: ""}}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({isValid, isSubmitting, dirty, errors, touched}) => (
          <Form className={classnames(form, contentVerticalSpacing)}>
            <Field
              autoFocus={true}
              label={t("appliance.field.name")}
              as={Input}
              error={errors.name}
              touched={touched.name}
              type="text"
              name="name"
            />
            <Field
              label={t("appliance.field.description")}
              as={Input}
              error={errors.description}
              touched={touched.description}
              type="textarea"
              name="description"
            />
            <Field
              label={t("appliance.field.location")}
              as={Input}
              error={errors.location}
              touched={touched.location}
              type="text"
              name="location"
            />
            <div className={actionsRow}>
              <Button disabled={!dirty || !isValid || isSubmitting} type="submit">
                {submitText || t("appliance.create.form.submit")}
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
  createAppliance,
  updateAppliance,
};

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state) => ({
  organisation: getOrganisation(state),
});

export default connect<StateProps, DispatchProps, Props, ReduxState>(
  mapStateToProps, mapDispatchToProps
)(Loadable<StateProps, {organisation: OrganisationPayload}>(ApplianceForm));
