import { assoc, dissoc, forEachObjIndexed, isEmpty, map } from "ramda";
import React, { ChangeEvent, Component, FormEvent, ReactFragment } from "react";
import { Link } from "react-router-dom";

import Form from "../components/Form";
import { FormInput, getFormInput } from "../components/util";
import { small } from "../emotion-styles/src/inline";
import { validateEmail } from "../util/validationFunctions";
import { register } from "./auth";

type Inputs = "email" | "firstName" | "lastName" | "password" | "retypePassword";

const inputs: ReadonlyArray<FormInput<Inputs> | [FormInput<Inputs>, FormInput<Inputs>]> = [
  {key: "email", props: {autoFocus: true, placeholder: "Email address"}},
  [
    {key: "firstName", props: {}},
    {key: "lastName", props: {}},
  ],
  {key: "password", props: {type: "password"}},
  {key: "retypePassword", props: {placeholder: "Re-enter password", type: "password"}},
];

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

  public renderInput: (p: any) => ReactFragment;

  constructor(props: object) {
    super(props);
    this.renderInput = getFormInput(this);
  }

  public componentDidMount() {
    this.setState(this.validate());
  }

  public handleSubmit = async (event: FormEvent) => register(
    dissoc("errors", this.state)
  )

  public handleInputChange = (input: Inputs) => (event: ChangeEvent<HTMLInputElement>) => {
    const newState = assoc(input, event.target.value, this.state);
    this.setState(this.validate(newState));
  }

  // returns state given as parameter after validation (errors modified)
  public validate = (state: Readonly<State> = this.state): State => {
    const newState = {...state};
    const {email, retypePassword, password} = state;

    newState.errors = {}; // clear old errors

    if (validateEmail(email)) {
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

  public render() {
    return (
      <Form
        isValid={isEmpty(this.state.errors)}
        onSubmit={this.handleSubmit}
        secondary={<Link className={small} to="/">I already have account</Link>}
        submitText="Register"
      >
        {map<any, ReactFragment>(this.renderInput, inputs)}
      </Form>
    );
  }
}

export default RegistrationForm;
