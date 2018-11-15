import React, { ChangeEvent, Component, FormEvent } from "react";
import { Link } from "react-router-dom";

import Form from "../components/Form";
import Input from "../components/Input";
import { baseUrl } from "../config";
import { small } from "../emotion-styles/src/inline";
import { authenticate } from "./auth";

type Inputs = "email"
  | "firstName"
  | "lastName"
  | "password"
  | "repeatPassword";

class RegistrationForm extends Component<{}, { [input in Inputs]?: string }> {
  public state = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    repeatPassword: "",
  };

  public handleSubmit = async (event: FormEvent) => {
    // TODO
  }

  public handleInputChange = (input: Inputs) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ [input]: event.target.value });
  }

  public render() {
    const { email, password, firstName, lastName, repeatPassword } = this.state;
    return (
      <Form
        onSubmit={this.handleSubmit}
        secondary={<Link className={small} to="/">I already have account</Link>}
        submitText="Register"
      >
        <Input
          name="email"
          onChange={this.handleInputChange("email")}
          value={email}
          placeholder="Email address"
        />
        <>
          <Input
            name="first-name"
            onChange={this.handleInputChange("firstName")}
            value={firstName}
            placeholder="First name"
          />
          <Input
            name="last-name"
            onChange={this.handleInputChange("lastName")}
            value={lastName}
            placeholder="Last name"
          />
        </>
        <Input
          name="password"
          onChange={this.handleInputChange("password")}
          type="password"
          placeholder="Password"
          value={password}
        />
        <Input
          name="re-enter-password"
          onChange={this.handleInputChange("repeatPassword")}
          type="password"
          placeholder="Re-enter password"
          value={repeatPassword}
        />
      </Form>
    );
  }
}

export default RegistrationForm;
