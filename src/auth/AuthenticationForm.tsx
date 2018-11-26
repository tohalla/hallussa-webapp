import { pick } from "ramda";
import React, { ChangeEvent, Component, FormEvent, RefObject } from "react";
import { Link } from "react-router-dom";

import Form, { FormInput, FormState } from "../components/Form";
import { baseUrl } from "../config";
import { small } from "../emotion-styles/src/inline";
import { authenticate } from "./auth";

type Inputs = "email" | "password";

class AuthenticationForm extends Component<{}, { error?: string }> {
  public static inputs: ReadonlyArray<FormInput<Inputs> | [FormInput<Inputs>, FormInput<Inputs>]> = [
    {key: "email", props: {type: "email", autoFocus: true}, validate: {required: true}},
    {key: "password", props: {type: "password"}, validate: {required: true}},
  ];

  public state = {
    error: undefined,
  };

  public handleSubmit = async (state: FormState<Inputs>) => {
    try {
      await authenticate(pick(["email", "password"], state));
      window.location.href = baseUrl;
    } catch (error) {
      this.setState({error});
    }
  }

  public render() {
    return (
      <Form
        error={this.state.error}
        inputs={AuthenticationForm.inputs}
        onSubmit={this.handleSubmit}
        secondary={<Link className={small} to="/register">Create a new account</Link>}
        submitText="Sign In"
      />
    );
  }
}

export default AuthenticationForm;
