import changeCase from "change-case";
import { assoc, forEachObjIndexed, isEmpty } from "ramda";
import React, { ChangeEvent, Component, FormEvent, RefObject } from "react";
import { Link } from "react-router-dom";

import Form from "../components/Form";
import Input from "../components/Input";
import { small } from "../emotion-styles/src/inline";
import { validateEmail } from "../util/validationFunctions";
import { register } from "./auth";

type Inputs = "email"
  | "firstName"
  | "lastName"
  | "password"
  | "retypePassword";

type State = {
  errors: {
    [input in Inputs]?: string | boolean
  };
} & {[input in Inputs]: string};

class RegistrationForm extends Component<{}, State > {
  public state: Readonly<State> = {
    email: "",
    errors: {},
    firstName: "",
    lastName: "",
    password: "",
    retypePassword: "",
  };

  public componentDidMount() {
    this.setState(this.validate());
  }

  public handleSubmit = async (event: FormEvent) => register(this.state);

  public handleInputChange = (input: Inputs) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newState = assoc(input, event.target.value, this.state);
    this.setState(this.validate(newState));
  }

  // returns state given as parameter after validation (errors modified)
  public validate = (state: Readonly<State> = this.state): State => {
    const newState = {...state};
    const {retypePassword, password} = state;

    newState.errors = {}; // clear old errors

    if (validateEmail) {
      newState.errors.email = "Invalid email address.";
    }

    if (password.length < 6) {
      newState.errors.password = "Minimum length for password is 6 charachters.";
    }

    if (retypePassword !== password) {
      newState.errors.retypePassword = "Passwords do not match.";
    }

    // all inputs are required, so set error to true if not already set
    forEachObjIndexed((value, key) => {
      if (key !== "errors" && (value as string).length === 0 && typeof newState.errors[key] === "undefined") {
        newState.errors[key] = true;
      }
    }, newState);

    return newState;
  }

  public renderInput = (key: Inputs, type: "text" | "password" = "text", placeholder?: string) => (
    <Input
      error={this.state.errors[key]}
      name={changeCase.paramCase(key)}
      onChange={this.handleInputChange(key)}
      placeholder={placeholder || changeCase.titleCase(key)}
      required={true}
      type={type}
      value={this.state[key]}
    />
  )

  public render() {
    return (
      <Form
        isValid={isEmpty(this.state.errors)}
        onSubmit={this.handleSubmit}
        secondary={<Link className={small} to="/">I already have account</Link>}
        submitText="Register"
      >
        {this.renderInput("email", "text", "Email Address")}
        <>
          {this.renderInput("firstName")}
          {this.renderInput("lastName")}
        </>
        {this.renderInput("password", "password")}
        {this.renderInput("retypePassword", "password", "Re-enter password")}
      </Form>
    );
  }
}

export default RegistrationForm;
