import React, { ChangeEvent, Component, FormEvent, RefObject } from "react";
import { Link } from "react-router-dom";

import Form from "../components/Form";
import Input from "../components/Input";
import { baseUrl } from "../config";
import { small } from "../emotion-styles/src/inline";
import { authenticate } from "./auth";

type Inputs = "email" | "password";

class AuthenticationForm extends Component<{}, { [input in Inputs]?: string }> {
  public state = {
    email: "",
    password: "",
  };

  public handleSubmit = async (event: FormEvent) => {
    if (await authenticate(this.state)) {
      window.location.href = baseUrl;
    } else {
      // TODO: authentication error
    }
  }

  public handleInputChange = (input: Inputs) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ [input]: event.target.value });
  }

  public render() {
    const { email, password } = this.state;
    return (
      <Form
        onSubmit={this.handleSubmit}
        secondary={<Link className={small} to="/register">Create a new account</Link>}
        submitText="sign in"
      >
        <Input
          autoFocus={true}
          name="email"
          onChange={this.handleInputChange("email")}
          value={email}
          placeholder="Email address"
        />
        <Input
          name="password"
          onChange={this.handleInputChange("password")}
          type="password"
          placeholder="Password"
          value={password}
        />
      </Form>
    );
  }
}

export default AuthenticationForm;
