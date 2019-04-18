import { dissoc } from "ramda";
import React from "react";
import { RouteComponentProps } from "react-router";

import { useTranslation } from "react-i18next";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import Form, { FormProps, FormState } from "../../component/Form";
import { OrganisationPayload } from "../../organisation/actions";
import { getOrganisation } from "../../organisation/state";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import Loadable from "../../util/hoc/Loadable";
import { isValidEmail, isValidPhone } from "../../util/validationFunctions";
import { createMaintainer, MaintainerPayload, updateMaintainer } from "../actions";

interface StateProps {
  organisation?: OrganisationPayload | APIResponsePayload;
}

interface DispatchProps {
  createMaintainer: (organisation: number, maintainer: MaintainerPayload) => any;
  updateMaintainer: (maintainer: MaintainerPayload) => any;
}

type Props = Partial<FormProps<Inputs>> & RouteComponentProps;

type Inputs = "email" | "firstName" | "lastName" | "phone";

const MaintainerForm = ({onSubmit, ...props}: Props & StateProps & DispatchProps) => {
  const {t} = useTranslation();

  const handleSubmit = async (state: FormState<Inputs>) => {
    const {id: organisation} = props.organisation as OrganisationPayload;
    if (props.state) {
      await props.updateMaintainer({...props.state, ...dissoc("errors", state)});
    } else {
      const newMaintainer = await props.createMaintainer(organisation, dissoc("errors", state));
      if (newMaintainer) {
        props.history.push(`/maintainers/${newMaintainer.id}`);
      }
    }
    if (typeof onSubmit === "function") {
      onSubmit(state);
    }
  };

  // custom validation logic
  const validate = (state: FormState<Inputs>) => {
    const {email, phone} = state;
    const errors = {...state.errors};
    if (!isValidEmail(email)) {
      errors.email = t<string>("maintainer.form.error.invalidEmail");
    }
    if (!isValidPhone(phone)) {
      errors.phone = t<string>("maintainer.form.error.invalidPhone");
    }
    return errors;
  };

  return (
    <Form
      inputs={[
        {key: "email", props: {autoFocus: true, placeholder: t("maintainer.field.email")}, validate: {required: true}},
        [
          {key: "firstName", props: {placeholder: t("maintainer.field.firstName")}, validate: {required: true}},
          {key: "lastName", props: {placeholder: t("maintainer.field.lastName")}, validate: {required: true}},
        ],
        {
          key: "phone",
          props: {placeholder: t("maintainer.field.phone")},
          validate: {required: true, minLength: 6, maxLength: 15},
        },
      ]}
      onSubmit={handleSubmit}
      validate={validate}
      {...props}
    />
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
)(Loadable(MaintainerForm));
