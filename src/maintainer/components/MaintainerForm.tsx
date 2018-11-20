import { dissoc } from "ramda";
import React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import Form, { FormInput, FormState } from "../components/Form";
import { OrganisationPayload } from "../organisation/actions";
import { getOrganisation } from "../organisation/state";
import { APIResponsePayload } from "../store/middleware/api/actions";
import { ReduxState } from "../store/store";
import loadable from "../util/hoc/loadable";
import { isValidEmail, isValidPhone } from "../util/validationFunctions";
import { createMaintainer, MaintainerPayload } from "./actions";

interface StateProps {
  organisation?: OrganisationPayload | APIResponsePayload;
}

interface DispatchProps {
  createMaintainer: (organisation: number, appliance: MaintainerPayload) => any;
}

interface Props extends RouteComponentProps, DispatchProps, StateProps {
  onCancel: () => any;
  appliance?: MaintainerPayload;
}

type Inputs = "email" | "firstName" | "lastName" | "phone";

class MaintainerForm extends React.Component<Props> {
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
    const appliance = await this.props.createMaintainer(organisation, dissoc("errors", state));
    if (appliance) {
      this.props.history.push(`/${appliance.id}`);
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
    return (
      <Form
        inputs={MaintainerForm.inputs}
        secondary={<Link to={"/"}>Cancel</Link>}
        onSubmit={this.handleSubmit}
        validate={this.validate}
      />
    );
  }
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, Props> = {createMaintainer};

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state) => ({
  organisation: getOrganisation(state),
});

export default connect<StateProps, DispatchProps, Props, ReduxState>(
  mapStateToProps, mapDispatchToProps
)(loadable(MaintainerForm));
