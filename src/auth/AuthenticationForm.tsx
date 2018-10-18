import React, { ChangeEvent, Component, FormEvent } from "react";

import Form from "../components/Form";
import Input from "../components/Input";
import { apiUrl } from "../config";
import { authenticate } from "./auth";

type Inputs = "email" | "password";

class AuthenticationForm extends Component<{}, { [input in Inputs]?: string }> {
  public state = {
    email: "",
    password: "",
  };

  public handleSubmit = async (event: FormEvent) => {
    authenticate(this.state);
  }

  public handleInputChange = (input: Inputs) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ [input]: event.target.value });
  }

  public render() {
    const { email, password } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} submitText="sign in">
        <Input
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
