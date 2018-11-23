import { dissoc } from "ramda";
import React, { ReactFragment } from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import Form, { FormInput, FormProps, FormState } from "../../components/Form";
import { OrganisationPayload } from "../../organisation/actions";
import { getOrganisation } from "../../organisation/state";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import loadable from "../../util/hoc/loadable";
import { isValidEmail, isValidPhone } from "../../util/validationFunctions";
import { createMaintainer, MaintainerPayload, updateMaintainer } from "../actions";

interface StateProps {
  organisation?: OrganisationPayload | APIResponsePayload;
}

interface DispatchProps {
  createMaintainer: (organisation: number, maintainer: MaintainerPayload) => any;
  updateMaintainer: (organisation: number, maintainer: MaintainerPayload) => any;
}

type Props = Partial<FormProps<Inputs>> & RouteComponentProps;

type Inputs = "email" | "firstName" | "lastName" | "phone";

class MaintainerForm extends React.Component<Props & StateProps & DispatchProps> {
  public static defaultProps = {
    submitText: "Create Maintainer",
  };

  public static inputs: ReadonlyArray<FormInput<Inputs> | [FormInput<Inputs>, FormInput<Inputs>]> = [
    {key: "email", props: {autoFocus: true, placeholder: "Email address"}, validate: {required: true}},
    [
      {key: "firstName", props: {}, validate: {required: true}},
      {key: "lastName", props: {}, validate: {required: true}},
    ],
    {key: "phone", validate: {required: true, minLength: 6, maxLength: 15}},
  ];

  public handleSubmit = async (state: FormState<Inputs>) => {
    const {id: organisation} = this.props.organisation as OrganisationPayload;
    const {state: maintainer, onSubmit} = this.props;
    if (maintainer) {
      await this.props.updateMaintainer(organisation, {...maintainer, ...dissoc("errors", state)});
    } else {
      const newMaintainer = await this.props.createMaintainer(organisation, dissoc("errors", state));
      if (newMaintainer) {
        this.props.history.push(`/${newMaintainer.id}`);
      }
    }
    if (typeof onSubmit === "function") {
      onSubmit(state);
    }
  }

  // custom validation logic
  public validate = (state: FormState<Inputs>) => {
    const {email, phone} = state;
    const errors = {...state.errors};
    if (!isValidEmail(email)) {
      errors.email = "Invalid email address.";
    }
    if (!isValidPhone(phone)) {
      errors.phone = "Ivanlid phone number. Phone numbers may only contain numbers and specific characters (-+()).";
    }
    return errors;
  }

  public render() {
    const {onSubmit, ...props} = this.props;
    return (
      <Form
        inputs={MaintainerForm.inputs}
        onSubmit={this.handleSubmit}
        {...props}
      />
    );
  }
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, Props> = {
  createMaintainer,
  updateMaintainer,
};

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state) => ({
  organisation: getOrganisation(state),
});

export default connect<StateProps, DispatchProps, Props, ReduxState>(
  mapStateToProps, mapDispatchToProps
)(loadable(MaintainerForm));
