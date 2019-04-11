import { dissoc } from "ramda";
import React, { ChangeEventHandler, Component } from "react";
import { Link } from "react-router-dom";

import Form, { FormInput, FormState } from "../components/Form";
import { baseUrl } from "../config";
import { inputRow } from "../styles/form";
import { small } from "../styles/inline";
import { isValidEmail } from "../util/validationFunctions";
import { register } from "./auth";

type Inputs = "email" | "firstName" | "lastName" | "password" | "retypePassword" | "tos";

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

  public state = {tos: false, error: undefined};

  public handleSubmit = async (state: FormState<Inputs>) => {
    try {
      await register(dissoc("errors", state));
      window.location.href = baseUrl; // refresh page to log in
    } catch (error) {
      this.setState({error});
    }
  }

  // custom validation logic
  public validate = (state: FormState<Inputs>) => {
    const {email, retypePassword, password} = state;
    const errors = {...state.errors};
    if (!isValidEmail(email)) {
      errors.email = "Invalid email address.";
    }
    if (retypePassword !== password) {
      errors.retypePassword = "Passwords do not match.";
    }
    return errors;
  }

  public handleTOSToggle: ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({tos: !this.state.tos});
  }

  public render() {
    const {tos, error} = this.state;
    return (
      <Form
        inputs={RegistrationForm.inputs}
        onSubmit={this.handleSubmit}
        secondary={<Link className={small} to="/">I already have account</Link>}
        submitText="Register"
        validate={this.validate}
        isValid={tos}
        error={error}
      >
        <div className={inputRow}>
          <label>
            <input
              type="checkbox"
              checked={this.state.tos}
              onChange={this.handleTOSToggle}
            />
            I have read and accepted <a href="/terms-of-service.html" target="_blank">terms of service</a>.
          </label>
        </div>
      </Form>
    );
  }
}

export default RegistrationForm;
