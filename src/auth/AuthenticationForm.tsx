import { pick } from "ramda";
import React, { ChangeEvent, Component, FormEvent, RefObject } from "react";
import { Link } from "react-router-dom";

import Form, { FormInput, FormState } from "../components/Form";
import { baseUrl } from "../config";
import { small } from "../emotion-styles/src/inline";
import { authenticate } from "./auth";

type Inputs = "email" | "password";

class AuthenticationForm extends Component<{}, { [input in Inputs]?: string }> {
  public static inputs: ReadonlyArray<FormInput<Inputs> | [FormInput<Inputs>, FormInput<Inputs>]> = [
    {key: "email", props: {autoFocus: true}, validate: {required: true}},
    {key: "password", props: {type: "password"}, validate: {required: true}},
  ];

  public state = {
    email: "",
    password: "",
  };

  public handleSubmit = async (state: FormState<Inputs>) => {
    if (await authenticate(pick(["email", "password"], state))) {
      window.location.href = baseUrl;
    } else {
      // TODO: authentication error
    }
  }

  public render() {
    const { email, password } = this.state;
    return (
      <Form
        inputs={AuthenticationForm.inputs}
        onSubmit={this.handleSubmit}
        secondary={<Link className={small} to="/register">Create a new account</Link>}
        submitText="sign in"
      />
    );
  }
}

export default AuthenticationForm;
