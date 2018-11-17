import { assoc, assocPath } from "ramda";
import React, { ChangeEvent, Component, FormEvent, RefObject } from "react";
import { Link } from "react-router-dom";

import Form from "../components/Form";
import Input from "../components/Input";
import { small } from "../emotion-styles/src/inline";
import { register } from "./auth";

type Inputs = "email"
  | "firstName"
  | "lastName"
  | "password"
  | "retypePassword";

type State = {
  errors: {
    retypePassword?: string
  };
} & {[input in Inputs]: string};

class RegistrationForm extends Component<{}, State > {
  public state: State = {
    email: "",
    errors: {},
    firstName: "",
    lastName: "",
    password: "",
    retypePassword: "",
  };

  public retypePasswordRef: RefObject<Input>;

  constructor(props: {}) {
    super(props);
    this.retypePasswordRef = React.createRef();
  }

  public handleSubmit = async (event: FormEvent) => register(this.state);

  public handleInputChange = (input: Inputs) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    this.setState(assoc(input, event.target.value));
  }

  public validate = () => {
    const retypePasswordInput = this.retypePasswordRef.current as Input;
    const {retypePassword, password} = this.state;

    if (retypePasswordInput.visited && retypePassword !== password) {
      this.setState(assocPath(["errors", "retypePassword"], "Passwords do not match"));
    }
  }

  public render() {
    const {
      errors,
      email,
      password,
      firstName,
      lastName,
      retypePassword,
    } = this.state;
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
          error={errors.retypePassword}
          name="re-enter-password"
          onBlur={this.validate}
          onChange={this.handleInputChange("retypePassword")}
          type="password"
          placeholder="Re-enter password"
          ref={this.retypePasswordRef}
          value={retypePassword}
        />
      </Form>
    );
  }
}

export default RegistrationForm;
