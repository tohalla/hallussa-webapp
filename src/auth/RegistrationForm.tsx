import { dissoc } from "ramda";
import React, { Component } from "react";
import { Link } from "react-router-dom";

import Form, { FormInput, FormState } from "../components/Form";
import { baseUrl } from "../config";
import { small } from "../emotion-styles/src/inline";
import { validateEmail } from "../util/validationFunctions";
import { register } from "./auth";

type Inputs = "email" | "firstName" | "lastName" | "password" | "retypePassword";

class RegistrationForm extends Component {
  public static inputs: ReadonlyArray<FormInput<Inputs> | [FormInput<Inputs>, FormInput<Inputs>]> = [
    {key: "email", props: {autoFocus: true, placeholder: "Email address"}, validate: {required: true}},
    [
      {key: "firstName", props: {}, validate: {required: true}},
      {key: "lastName", props: {}, validate: {required: true}},
    ],
    {key: "password", props: {type: "password"}, validate: {required: true, minLength: 6}},
    {key: "retypePassword", props: {placeholder: "Re-enter password", type: "password"}, validate: {required: true}},
  ];

  public handleSubmit = async (state: FormState<Inputs>) => {
    await register(
      dissoc("errors", state)
    );

    window.location.href = baseUrl; // refresh page to log in
  }

  // returns state given as parameter after validation (errors modified)
  public validate = (state: FormState<Inputs>) => {
    const {email, retypePassword, password} = state;
    const errors = {...state.errors};
    if (!validateEmail(email)) {
      errors.email = "Invalid email address.";
    }
    if (retypePassword !== password) {
      errors.retypePassword = "Passwords do not match.";
    }
    return errors;
  }

  public render() {
    return (
      <Form
        inputs={RegistrationForm.inputs}
        onSubmit={this.handleSubmit}
        secondary={<Link className={small} to="/">I already have account</Link>}
        submitText="Register"
        validate={this.validate}
      />
    );
  }
}

export default RegistrationForm;
